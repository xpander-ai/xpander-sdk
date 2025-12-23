import asyncio
import json
import shlex
from os import getenv, environ
from typing import Any, Callable, Dict, List, Optional

from loguru import logger
from toon import encode as toon_encode
from xpander_sdk import Configuration
from xpander_sdk.models.shared import OutputFormat, ThinkMode
from xpander_sdk.modules.agents.agents_module import Agents
from xpander_sdk.modules.agents.models.agent import AgentGraphItemType, LLMReasoningEffort
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.backend.utils.mcp_oauth import authenticate_mcp_server
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.modules.tools_repository.models.mcp import (
    MCPOAuthGetTokenResponse,
    MCPOAuthResponseType,
    MCPServerAuthType,
    MCPServerTransport,
    MCPServerType,
)
from xpander_sdk.modules.tools_repository.models.tool_invocation_result import ToolInvocationResult
from xpander_sdk.modules.tools_repository.sub_modules.tool import Tool
from xpander_sdk.modules.tools_repository.utils.schemas import build_model_from_schema
from agno.agent import Agent as AgnoAgent
from agno.team import Team as AgnoTeam
from agno.memory import MemoryManager
from agno.guardrails import PIIDetectionGuardrail
from agno.guardrails import PromptInjectionGuardrail
from agno.guardrails import OpenAIModerationGuardrail

async def build_agent_args(
    xpander_agent: Agent,
    task: Optional[Task] = None,
    override: Optional[Dict[str, Any]] = None,
    tools: Optional[List[Callable]] = None,
    is_async: Optional[bool] = True,
    auth_events_callback: Optional[Callable] = None,
) -> Dict[str, Any]:
    model = _load_llm_model(agent=xpander_agent, override=override)
    args: Dict[str, Any] = {
        "id": xpander_agent.id,
        "store_events": True
    }
    
    _configure_output(args=args, agent=xpander_agent, task=task)
    _configure_session_storage(args=args, agent=xpander_agent, task=task)
    _configure_agentic_memory(args=args, agent=xpander_agent, task=task)
    _configure_tool_calls_compression(args=args, agent=xpander_agent)
    await _attach_async_dependencies(
        args=args, agent=xpander_agent, task=task, model=model, is_async=is_async
    )
    _configure_knowledge_bases(args=args, agent=xpander_agent)
    _configure_additional_context(args=args, agent=xpander_agent, task=task)
    # Configure pre-hooks (guardrails, etc.)
    _configure_pre_hooks(args=args, agent=xpander_agent, model=model)

    args["tools"] = await _resolve_agent_tools(agent=xpander_agent, task=task, auth_events_callback=auth_events_callback)

    
    if tools and len(tools) != 0:
        args["tools"].extend(tools)

    should_use_reasoning_tools = True if xpander_agent.agno_settings.reasoning_tools_enabled else False
    if task and task.think_mode:
        if task.think_mode == ThinkMode.Harder:
            should_use_reasoning_tools = True

    if not xpander_agent.is_a_team and should_use_reasoning_tools:
        from agno.tools.reasoning import ReasoningTools
        args["tools"].append(
            ReasoningTools(
                enable_think=True,
                enable_analyze=True,
                add_instructions=True,
                add_few_shot=True,
                instructions="use 'think' and 'analyze' ONLY when its not a simple task of 'hi', 'what can you do' and such low complexity tasks"
            )
        )
        
    # team
    if xpander_agent.is_a_team:
        sub_agents = xpander_agent.graph.sub_agents

        # load sub agents
        sub_agents = await asyncio.gather(
            *[
                Agents(
                    configuration=Configuration(
                        api_key=xpander_agent.configuration.api_key,
                        organization_id=xpander_agent.configuration.organization_id,
                        base_url=xpander_agent.configuration.base_url
                    )
                ).aget(agent_id=sub_agent_id)
                for sub_agent_id in sub_agents
            ]
        )
        if sub_agents and len(sub_agents):
            base_state = xpander_agent.configuration.state.model_copy()
            for sub_agent in sub_agents:
                sub_agent.configuration.state.task = base_state.task
        # convert to members
        members = await asyncio.gather(
            *[
                build_agent_args(xpander_agent=sub_agent, override=override, task=task, is_async=is_async, auth_events_callback=auth_events_callback)
                for sub_agent in sub_agents
            ]
        )

        args.update(
            {
                "members": [
                    AgnoAgent(**member) if "id" in member else AgnoTeam(**member)
                    for member in members
                ],
                "add_member_tools_to_context": True,
                "share_member_interactions": True,
                "show_members_responses": True,
            }
        )

    args.update(
        {
            "name": xpander_agent.name,
            "model": model,
            "description": xpander_agent.instructions.description,
            "instructions": xpander_agent.instructions.instructions,
            "expected_output": (
                task.expected_output
                if task and task.expected_output
                else xpander_agent.expected_output
            ),
            "add_datetime_to_context": True,
        }
    )
    
    if xpander_agent.is_a_team and xpander_agent.expected_output and len(xpander_agent.expected_output) != 0:
        args["instructions"] += f"""\n
            <expected_output>
            {xpander_agent.expected_output}
            </expected_output>
        """

    if override:
        args.update(override)

    # append tools hooks
    async def on_tool_call_hook(
        function_name: str, function_call: Callable, arguments: Dict[str, Any]
    ):
        # preflight and monitoring + metrics
        try:
            matched_tool = (
                (
                    xpander_agent.tools.get_tool_by_id(tool_id=function_name)
                    or xpander_agent.tools.get_tool_by_name(tool_name=function_name)
                )
                if xpander_agent.tools and len(xpander_agent.tools.list) != 0
                else None
            )
        except Exception:
            pass
        
        error = None
        try:
            # Call the function
            if asyncio.iscoroutinefunction(function_call):
                result = await function_call(**arguments)
            else:
                result = function_call(**arguments)
            
        except Exception as e:
            error = str(e)
            raise
        finally:
            try:
                if not matched_tool and task:  # agent / mcp tool
                    tool_instance = Tool(
                        configuration=xpander_agent.configuration,
                        id=function_name,
                        name=function_name,
                        method="GET",
                        path=f"/tools/{function_name}",
                        should_add_to_graph=False,
                        is_local=True,
                        is_synced=True,
                        description=function_name,
                    )
                    parsed_result = None
                    try:
                        parsed_result = dict(result)
                    except Exception:
                        parsed_result = result
                        
                    await tool_instance.agraph_preflight_check(
                        agent_id=xpander_agent.id,
                        configuration=tool_instance.configuration,
                        task_id=task.id,
                        payload={"input": arguments, "output": error or parsed_result} if isinstance(arguments, dict) else None
                    )
            except Exception:
                pass

        # try toon optimization if compression enabled
        if xpander_agent and xpander_agent and xpander_agent.agno_settings and xpander_agent.agno_settings.tool_calls_compression and xpander_agent.agno_settings.tool_calls_compression.enabled and not function_name.startswith("xp"):
            try:
                if isinstance(result, ToolInvocationResult):
                    json_result = json.loads(result.result) if isinstance(result.result, str) else result.result
                    result.result = toon_encode(json_result)
                elif hasattr(result, "content"):
                    json_result = json.loads(result.content)
                    result.content = toon_encode(json_result)
            except Exception:
                pass
    
        
        # Return the result
        return result

    if not "tool_hooks" in args:
        args["tool_hooks"] = []

    # disable hooks for NeMo due to issue with tool_hooks and NeMo
    if xpander_agent.using_nemo == False:
        args["tool_hooks"].append(on_tool_call_hook)

    # fix gpt-5 temp
    if args["model"] and args["model"].id and args["model"].id.startswith("gpt-5"):
        del args["model"].temperature
    
    # configure deep planning guidance
    _configure_deep_planning_guidance(args=args, agent=xpander_agent, task=task)
    return args

def _configure_deep_planning_guidance(args: Dict[str, Any], agent: Agent, task: Optional[Task]) -> None:
    if args and agent and task and agent.deep_planning and task.deep_planning.enabled == True:
        task.reload() # reload the task - get latest version
        # add instructions guidance
        if not "instructions" in args:
            args["instructions"] = ""
        
        args["instructions"] += """\n
            <important_planning_instructions>
            ## **Deep Planning Tools - Essential for Multi-Step Tasks**

            **ABSOLUTE RULE - READ THIS FIRST**:
            
            IF YOU ARE ABOUT TO WRITE A QUESTION TO THE USER, STOP AND CHECK:
            - Did I call xpstart_execution_plan? 
              - YES → Use xpask_for_information tool (DO NOT write the question in your response)
              - NO → You can ask directly
            
            SIMPLE RULE:
            - BEFORE calling xpstart_execution_plan: You CAN ask questions directly in your response
            - AFTER calling xpstart_execution_plan: You are FORBIDDEN from writing questions - use xpask_for_information tool
            
            Once execution has started, writing things like "Before I proceed, I need to know..." or "I need clarification on..."
            or "Please choose one of the following..." in your response text is STRICTLY PROHIBITED and will cause execution failures.
            
            MANDATORY CHECK BEFORE ASKING: Have I started the plan? YES = use tool | NO = can ask directly

            When handling complex tasks with multiple steps, use these planning tools to track progress systematically.

            ### **Core Workflow**
            1. **CREATE** plan at the start (`xpcreate_agent_plan`)
            2. **START** plan execution (`xpstart_execution_plan`) - MANDATORY to enable enforcement
            3. **CHECK** plan before each action (`xpget_agent_plan`) - note the FULL UUID of the task you'll work on
            4. **DO THE WORK** for one task
            5. **COMPLETE** task IMMEDIATELY - call `xpcomplete_agent_plan_items` with the FULL UUID RIGHT AFTER finishing work (DO NOT DELAY!)
            6. **ASK** user for info if needed (`xpask_for_information`) - MANDATORY if you need input or want to pause
            7. Repeat steps 3-6 until all tasks are done
            
            **UUID REQUIREMENT**: All task IDs are full UUIDs (e.g., '35f56b8e-1427-4a5e-a1c0-57a4f7ec8e92'). You MUST use the exact complete UUID string from the plan when marking tasks complete.
            
            **CRITICAL RULES - ABSOLUTE REQUIREMENTS**: 
            - Mark each task complete THE MOMENT you finish it - not later, not at the end, RIGHT AWAY!
            - **CHECK BEFORE ASKING**: Did you call xpstart_execution_plan?
              - If YES: Use xpask_for_information tool ONLY (never write questions in response)
              - If NO: Can ask directly
            - **AFTER plan starts: Writing questions in your response is FORBIDDEN** - violates execution protocol
            - If you called xpstart_execution_plan and then write "I need clarification" or "Before I proceed" or "Please choose", you are VIOLATING THE PROTOCOL
            - AFTER xpstart_execution_plan: The ONLY way to ask users questions is through `xpask_for_information` tool - ZERO EXCEPTIONS!

            ---

            ### **Tool Reference**

            #### **1. xpcreate_agent_plan** - Create Initial Plan
            **When to use**: At the very start of any multi-step task, ONLY if no plan exists yet
            **Note**: After creating a plan, you MUST call `xpstart_execution_plan` to begin enforcement

            **How to use**:
            - Pass an array of task objects (NOT strings)
            - Each task must have a `title` field with short, explanatory description
            - Example format:
            ```json
            {
            "body_params": {
                "tasks": [
                {"title": "Research API requirements"},
                {"title": "Design data schema"},
                {"title": "Implement endpoints"},
                {"title": "Write tests"},
                {"title": "Deploy to staging"}
                ]
            }
            }
            ```
            **Important**: 
            - Include ALL steps needed from start to finish
            - Each title should be clear and actionable (3-6 words)
            - Do NOT pass plain strings like `["Task 1", "Task 2"]` - must be objects!

            ---

            #### **2. xpget_agent_plan** - View Current Plan
            **When to use**: Before deciding what to do next; to check progress

            **Returns**: 
            - All tasks with their IDs, titles, and completion status
            - Use this to know what's done and what remains

            **No parameters needed** - just call the tool

            ---

            #### **3. xpcomplete_agent_plan_items** - Mark Task(s) Complete
            **When to use**: **IMMEDIATELY** after finishing one or more tasks (NOT before, NOT later, RIGHT NOW!)

            **How to use**:
            ```json
            // Single task
            {
            "body_params": {
                "ids": ["35f56b8e-1427-4a5e-a1c0-57a4f7ec8e92"]
            }
            }
            
            // Multiple tasks (when finishing related tasks together)
            {
            "body_params": {
                "ids": ["35f56b8e-1427-4a5e-a1c0-57a4f7ec8e92", "8a3c4f12-9b7e-4d2a-b5c8-1f6e9a0d3b4c", "f2b9d1c7-3e8a-4b6f-9d2c-5a7e1f4b8c3d"]
            }
            }
            ```
            **🚨 CRITICAL - NON-NEGOTIABLE RULES**: 
            - IDs must be the FULL UUID strings (e.g., '35f56b8e-1427-4a5e-a1c0-57a4f7ec8e92') from the plan's 'id' field
            - Get these exact UUID strings from xpget_agent_plan before calling this tool
            - Call THIS TOOL the INSTANT you finish task(s)
            - Can mark single or multiple tasks complete in one call
            - Use multiple FULL UUIDs when finishing related tasks at the same time
            - DO NOT use shortened IDs, abbreviations, or partial UUIDs - must be complete UUID strings
            - DO NOT postpone marking completion
            - DO NOT be lazy - mark it complete RIGHT AFTER the work is done
            - This is MANDATORY for progress tracking and continuation
            - If you finish a task and don't mark it complete immediately, you are doing it WRONG
            
            **Pattern**: Finish work → Get task UUID from plan → IMMEDIATELY call xpcomplete_agent_plan_items with FULL UUID → Move to next task

            ---

            #### **4. xpadd_new_agent_plan_item** - Add Discovered Task
            **When to use**: When you discover additional work needed during execution

            **How to use**:
            ```json
            {
            "body_params": {
                "title": "Validate input schemas",
                "completed": false
            }
            }
            ```
            ---

            #### **5. xpupdate_agent_plan_item** - Modify Existing Task
            **When to use**: When task details change or need clarification

            **How to use**:
            ```json
            {
            "body_params": {
                "id": "task-uuid",
                "title": "Updated description",
                "completed": true
            }
            }
            ```
            (All fields optional except `id`)

            ---

            #### **6. xpdelete_agent_plan_item** - Remove Task
            **When to use**: When a task becomes unnecessary or redundant

            **How to use**:
            ```json
            {
            "body_params": {
                "id": "task-uuid"
            }
            }
            ```
            ---

            #### **7. xpstart_execution_plan** - Start Plan Execution
            **When to use**: Immediately after creating a plan with `xpcreate_agent_plan`
            **CRITICAL**: Must be called to enable enforcement mode before executing tasks

            **How to use**:
            ```json
            {
            "body_params": {}
            }
            ```
            **No parameters needed** - just call after plan creation

            **What it does**:
            - Marks plan as "started" 
            - Enables enforcement mode if `enforce` flag is true
            - Allows plan execution to proceed

            ---

            #### **8. xpask_for_information** - Ask User a Question
            **When to use**: **MANDATORY AFTER PLAN STARTS** when you need ANY of the following:
            - Information from the user
            - Clarification on requirements
            - Approval before proceeding
            - To pause execution for user input
            
            **PREREQUISITE**: Plan must be started (running) first
            
            **CRITICAL RULE**: Once the plan has started, if you need user input or want to pause, you MUST use this tool.
            DO NOT just respond with questions in your regular output after plan starts - that breaks execution flow!
            
            **NOTE**: BEFORE starting the plan (before xpstart_execution_plan), you CAN ask questions directly if needed.

            **How to use**:
            ```json
            {
            "body_params": {
                "question": "What is the customer email address?"
            }
            }
            ```

            **What it does**:
            - Properly pauses plan enforcement and sets `question_raised` flag
            - Delivers question to the user through the correct channel
            - Manages execution state for proper continuation
            - Allows resuming execution after user responds
            
            **Why this matters**: Using this tool ensures execution can be properly continued with full context.
            Just responding with a question will NOT pause execution correctly!

            ---

            ### **Best Practices**

            ✅ **DO:**
            - Create comprehensive plans with ALL necessary steps
            - **START** the plan with `xpstart_execution_plan` after creating it
            - Use descriptive, actionable task titles
            - Check plan before each action to stay oriented
            - **Always use FULL UUID strings when marking tasks complete** (e.g., '35f56b8e-1427-4a5e-a1c0-57a4f7ec8e92')
            - **Get the exact UUID from xpget_agent_plan** - copy the full 'id' field value
            - **Mark tasks complete THE INSTANT you finish them - NO DELAYS, NO EXCEPTIONS**
            - **Can mark multiple tasks at once if finished together** (e.g., related tasks done simultaneously)
            - **ALWAYS use `xpask_for_information` when you need user input or want to pause**
            - Call plan tools **sequentially** (one at a time, never in parallel)
            - Follow the pattern: DO WORK → GET UUID → MARK COMPLETE WITH FULL UUID → NEXT TASK

            ❌ **DON'T - THESE ARE FORBIDDEN:**
            - Mark tasks complete before they're actually done
            - **Use shortened, partial, or abbreviated task IDs** - MUST use complete UUID strings!
            - **Use made-up or guessed UUIDs** - MUST get exact UUID from xpget_agent_plan!
            - **Be lazy and wait to mark tasks complete later** (FORBIDDEN!)
            - **Postpone marking completion to batch at the end** (WRONG! Mark immediately when done!)
            - **AFTER plan starts: NEVER write questions in your response text** ("Before I proceed...", "I need clarification...", etc.)
            - **AFTER plan starts: NEVER respond with questions - ONLY use xpask_for_information tool** (ABSOLUTE RULE!)
            - Pass plain string arrays - must be objects with `title` field
            - Call plan tools in parallel with each other
            - Skip checking the plan between major steps
            - Postpone marking completion "until later" - there is no later, only NOW
            
            **REMEMBER**: Once execution started, any text like "I need to know", "Before I proceed", "I need clarification" means you MUST call xpask_for_information instead!
            **EXCEPTION**: Before starting the plan, you CAN ask questions directly if needed for planning.

            ---

            ### **Example Complete Workflow**

            ```
            1. User: "Build a REST API for user management"

            2. Call: xpcreate_agent_plan
            tasks: [
                {"title": "Design user schema"},
                {"title": "Create database migration"},
                {"title": "Implement CRUD endpoints"},
                {"title": "Add authentication"},
                {"title": "Write integration tests"}
            ]

            3. Call: xpstart_execution_plan
            → Plan now started, enforcement enabled (if enforce=true)

            4. Call: xpget_agent_plan
            → See: Task 1 (ID: 35f56b8e-1427-4a5e-a1c0-57a4f7ec8e92) - Design user schema - Not complete

            5. [Realize need user input] Call: xpask_for_information
            question: "Which database should we use - PostgreSQL or MySQL?"
            → question_raised=true, waiting for response

            6. [After user responds, DO THE WORK: Design schema]

            7. ⚠️ IMMEDIATELY Call: xpcomplete_agent_plan_items
            ids: ["35f56b8e-1427-4a5e-a1c0-57a4f7ec8e92"]
            → MARKED COMPLETE RIGHT AFTER FINISHING - NOT DELAYED! Used FULL UUID from plan!

            8. Call: xpget_agent_plan
            → See: Task 1 ✓ complete, Task 2 (ID: 8a3c4f12-9b7e-4d2a-b5c8-1f6e9a0d3b4c) - Create database migration - Not complete

            9. [DO THE WORK: Create migration file]

            10. ⚠️ IMMEDIATELY Call: xpcomplete_agent_plan_items
            ids: ["8a3c4f12-9b7e-4d2a-b5c8-1f6e9a0d3b4c"]
            → MARKED COMPLETE RIGHT AWAY! Used FULL UUID from plan!
            
            // Alternative: If tasks 3 and 4 are done together, can batch complete:
            11a. [DO THE WORK: Implement endpoints AND add auth together]
            11b. ⚠️ IMMEDIATELY Call: xpcomplete_agent_plan_items
            ids: ["f2b9d1c7-3e8a-4b6f-9d2c-5a7e1f4b8c3d", "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"]
            → Both marked complete at once! Used FULL UUIDs from plan!

            12. [Continue this pattern: GET PLAN → DO WORK → MARK COMPLETE IMMEDIATELY → REPEAT]
            ```
            
            ### **WRONG WAY - ANTI-PATTERN (DO NOT DO THIS)**
            
            ```
            ❌ WRONG:
            1. Call: xpcreate_agent_plan
            2. Call: xpstart_execution_plan  ← PLAN IS NOW STARTED!
            3. Respond: "Before I proceed, I need clarification on..."  ← WRONG! FORBIDDEN!
            
            ✅ CORRECT:
            1. Call: xpcreate_agent_plan
            2. Call: xpstart_execution_plan  ← PLAN IS NOW STARTED!
            3. Call: xpask_for_information with question  ← CORRECT! Use the tool!
            ```
            
            **KEY POINT**: Once you call `xpstart_execution_plan`, the execution mode changes.
            You CANNOT write questions in your response anymore. You MUST use the tool.
            
            **Golden Rule**: FINISH TASK → MARK COMPLETE INSTANTLY → MOVE TO NEXT TASK. No delays, no batching, no "I'll do it later"!
            </important_planning_instructions>
        """
        
        # add the expected output guidance
        if not "expected_output" in args:
            args["expected_output"] = ""
        args["expected_output"] += "\nAll planned tasks completed and marked as done."
        
        # add the plan to additional_context
        if not "additional_context" in args:
            args["additional_context"] = ""
        
        plan_str = task.deep_planning.model_dump_json() if task.deep_planning and task.deep_planning.enabled and len(task.deep_planning.tasks) != 0 else "No execution plan, please generate"
        args["additional_context"] += f" \n Current execution plan: {plan_str}"

def _load_llm_model(agent: Agent, override: Optional[Dict[str, Any]]) -> Any:
    """
    Load and configure the appropriate LLM model based on the agent's provider configuration.

    This function supports multiple LLM providers including OpenAI, NVIDIA NIM, and Anthropic.
    It handles API key resolution with proper precedence based on the deployment environment
    (xpander.ai Cloud vs local deployment).

    Args:
        agent (Agent): The agent instance containing model configuration.
        override (Optional[Dict[str, Any]]): Optional override parameters that can
            include a pre-configured "model" to bypass the loading logic.

    Returns:
        Any: A configured LLM model instance (OpenAIChat, Nvidia, or Claude).

    Raises:
        NotImplementedError: If the specified provider is not supported.

    Supported Providers:
        - "openai": Uses OpenAIChat with fallback API key resolution
        - "nim": Uses NVIDIA NIM models via Nvidia class
        - "anthropic": Uses Claude models via Anthropic integration

    API Key Resolution Logic:
        - xpander.ai Cloud: Custom credentials take precedence, fallback to environment
        - Local deployment: Environment variables take precedence, fallback to custom
    """
    if override and "model" in override:
        return override["model"]
    
    provider = agent.model_provider.lower()

    is_xpander_cloud = getenv("IS_XPANDER_CLOUD", "false") == "true"
    has_custom_llm_key = (
        True if agent.llm_credentials and agent.llm_credentials.value else False
    )

    def get_llm_key(env_var_name: str) -> Optional[str]:
        """
        Resolve API key based on deployment environment and availability.

        Args:
            env_var_name (str): Name of the environment variable containing the API key.

        Returns:
            Optional[str]: The resolved API key or None if not available.
        """
        env_llm_key = getenv(env_var_name)

        # If no custom key available, use environment variable
        if not has_custom_llm_key:
            return env_llm_key

        # xpander.ai Cloud: prioritize custom credentials, fallback to environment
        if is_xpander_cloud:
            return agent.llm_credentials.value or env_llm_key
        else:
            # Local deployment: prioritize environment, fallback to custom
            return env_llm_key or agent.llm_credentials.value

    llm_args = {}
    
    if agent.llm_reasoning_effort and agent.llm_reasoning_effort != LLMReasoningEffort.Medium and agent.model_name and "gpt-5" in agent.model_name.lower():
        llm_args = { "reasoning_effort": agent.llm_reasoning_effort.value }
    
    if agent.llm_api_base and len(agent.llm_api_base) != 0:
        llm_args["base_url"] = agent.llm_api_base
    
    # OpenAI Provider - supports GPT models with dual API key fallback
    if provider == "openai":
        from agno.models.openai import OpenAIChat

        return OpenAIChat(
            id=agent.model_name,
            # Try xpander.ai-specific key first, fallback to standard OpenAI key
            api_key=get_llm_key("AGENTS_OPENAI_API_KEY")
            or get_llm_key("OPENAI_API_KEY"),
            temperature=0.0,
            **llm_args
        )
    # Helicone
    elif provider == "helicone":
        from agno.models.openai.like import OpenAILike

        return OpenAILike(
            id=agent.model_name,
            # Try xpander.ai-specific key first, fallback to standard OpenAI key
            api_key=get_llm_key("HELICONE_API_KEY"),
            base_url="https://ai-gateway.helicone.ai/v1",
            **llm_args
        )
    # Nebius
    elif provider == "nebius":
        from agno.models.nebius import Nebius

        return Nebius(
            id=agent.model_name,
            # Try xpander.ai-specific key first, fallback to standard OpenAI key
            api_key=get_llm_key("NEBIUS_API_KEY"),
            **llm_args
        )
    # OpenRouter
    elif provider == "open_router":
        from agno.models.openrouter import OpenRouter

        return OpenRouter(
            id=agent.model_name,
            # Try xpander.ai-specific key first, fallback to standard OpenAI key
            api_key=get_llm_key("OPENROUTER_API_KEY"),
            **llm_args
        )
    # Google AI Studio - supports gemini models
    elif provider == "google_ai_studio":
        from agno.models.google import Gemini

        return Gemini(
            id=agent.model_name,
            # Try xpander.ai-specific key first, fallback to standard OpenAI key
            api_key=get_llm_key("GOOGLE_API_KEY"),
            **llm_args
        )
    # Fireworks AI Provider
    elif provider == "fireworks":
        from agno.models.fireworks import Fireworks

        return Fireworks(
            id=agent.model_name,
            # Try xpander.ai-specific key first, fallback to standard OpenAI key
            api_key=get_llm_key("FIREWORKS_API_KEY"),
            **llm_args
        )
    # NVIDIA NIM Provider - supports NVIDIA's inference microservices
    elif provider == "nim":
        from agno.models.nvidia import Nvidia
        
        return Nvidia(
            id=agent.model_name,
            api_key=get_llm_key("NVIDIA_API_KEY"),
            temperature=0.0,
            **llm_args
        )
    # Amazon Bedrock Provider
    elif provider == "amazon_bedrock":
        from agno.models.aws.bedrock import AwsBedrock
        environ["AWS_BEARER_TOKEN_BEDROCK"] = get_llm_key("AWS_BEARER_TOKEN_BEDROCK") # set to env
        return AwsBedrock(
            id=agent.model_name,
            temperature=0.0,
            **llm_args
        )

    # Anthropic Provider - supports Claude models
    elif provider == "anthropic":
        from agno.models.anthropic import Claude

        return Claude(
            id=agent.model_name,
            api_key=get_llm_key("ANTHROPIC_API_KEY"),
            temperature=0.0,
        )

    raise NotImplementedError(
        f"Provider '{provider}' is not supported for agno agents."
    )


def _configure_output(args: Dict[str, Any], agent: Agent, task: Optional[Task]) -> None:
    if agent.output.use_json_mode:
        args["use_json_mode"] = True
        args["output_schema"] = agent.output.output_schema
    elif agent.output.is_markdown:
        args["markdown"] = True

    if task and task.output_format != agent.output_format:
        if task.output_format == OutputFormat.Json:
            args["use_json_mode"] = True
            args["markdown"] = False
            args["output_schema"] = build_model_from_schema(
                "StructuredOutput", task.output_schema
            )
        elif task.output_format == OutputFormat.Markdown:
            args["markdown"] = True
        else:
            args["markdown"] = False


def _configure_session_storage(
    args: Dict[str, Any], agent: Agent, task: Optional[Task]
) -> None:
    if not agent.agno_settings.session_storage:
        return

    args["add_history_to_context"] = True
    args["session_id"] = task.id if task else None
    args["user_id"] = (
        task.input.user.id if task and task.input and task.input.user else None
    )

    if agent.agno_settings.session_summaries:
        args["enable_session_summaries"] = True
    if agent.agno_settings.num_history_runs:
        args["num_history_runs"] = agent.agno_settings.num_history_runs
    if agent.agno_settings.max_tool_calls_from_history and agent.agno_settings.max_tool_calls_from_history >= 1:
        args["max_tool_calls_from_history"] = agent.agno_settings.max_tool_calls_from_history


def _configure_tool_calls_compression(
    args: Dict[str, Any], agent: Agent
) -> None:
    if agent.agno_settings.tool_calls_compression and agent.agno_settings.tool_calls_compression.enabled:
        from agno.compression.manager import CompressionManager
        args["compression_manager"] = CompressionManager(
            compress_tool_results=True,
            compress_tool_results_limit=agent.agno_settings.tool_calls_compression.threshold,
            compress_tool_call_instructions="never compress ids, keep them full. "+(agent.agno_settings.tool_calls_compression.instructions if agent.agno_settings.tool_calls_compression.instructions else ""),
        )

def _configure_agentic_memory(
    args: Dict[str, Any], agent: Agent, task: Optional[Task]
) -> None:
    user = task.input.user if task and task.input and task.input.user else None
    user_memories_enabled = True if agent.agno_settings.user_memories and user and user.id else False
    agent_memories_enabled = True if agent.agno_settings.agent_memories else False
    
    if user_memories_enabled:
        args["enable_user_memories"] = True
        args["memory_manager"] = MemoryManager(delete_memories=True,clear_memories=True)
        args["enable_agentic_memory"] = agent.agno_settings.agentic_memory
    
    if agent_memories_enabled:
        args["add_culture_to_context"] = True
        
        if agent.agno_settings.agentic_culture:
            args["enable_agentic_culture"] = True
        else:
            args["update_cultural_knowledge"] = True
                

    if user:  # add user details to the agent
        args["additional_context"] = f"User details: {user.model_dump_json()}"


async def _attach_async_dependencies(
    args: Dict[str, Any], agent: Agent, task: Optional[Task], model: Any, is_async: Optional[bool] = True
) -> None:
    user = task.input.user if task and task.input and task.input.user else None
    should_use_db = True if (agent.agno_settings.user_memories and user and user.id) or agent.agno_settings.agent_memories else False
    if agent.agno_settings.session_storage or should_use_db:
        args["db"] = await agent.aget_db(async_db=is_async)

def _configure_knowledge_bases(args: Dict[str, Any], agent: Agent) -> None:
    if agent.knowledge_bases:
        args["knowledge_retriever"] = agent.knowledge_bases_retriever()
        args["search_knowledge"] = True


def _configure_additional_context(
    args: Dict[str, Any], agent: Agent, task: Optional[Task]
) -> None:
    if task and task.additional_context:
        existing = args.get("additional_context", "")
        args["additional_context"] = (
            f"{existing}\n{task.additional_context}"
            if existing
            else task.additional_context
        )

    if agent.agno_settings.tool_call_limit:
        args["tool_call_limit"] = agent.agno_settings.tool_call_limit


def _configure_pre_hooks(args: Dict[str, Any], agent: Agent, model: Any) -> None:
    """
    Configure pre-hooks (guardrails) for the agent based on settings.
    
    Pre-hooks are executed before the agent processes input. This includes
    guardrails like PII detection, prompt injection detection, and content
    moderation that validate or transform input.
    
    Args:
        args (Dict[str, Any]): Agent configuration arguments to be updated.
        agent (Agent): The agent instance containing pre-hook settings.
    """
    # Add PII detection guardrail with optional masking
    if agent.agno_settings.pii_detection_enabled:
        if "pre_hooks" not in args:
            args["pre_hooks"] = []
        
        pii_guardrail = PIIDetectionGuardrail(
            mask_pii=agent.agno_settings.pii_detection_mask
        )
        args["pre_hooks"].append(pii_guardrail)
    
    # Add prompt injection detection guardrail
    if agent.agno_settings.prompt_injection_detection_enabled:
        if "pre_hooks" not in args:
            args["pre_hooks"] = []
        
        prompt_injection_guardrail = PromptInjectionGuardrail()
        args["pre_hooks"].append(prompt_injection_guardrail)
    
    # Add OpenAI moderation guardrail
    if agent.agno_settings.openai_moderation_enabled:
        if "pre_hooks" not in args:
            args["pre_hooks"] = []
        
        moderation_kwargs = {}
        try:
            if model and model.provider == "OpenAI":
                moderation_kwargs["api_key"] = model.api_key
        except:
            pass
        
        if agent.agno_settings.openai_moderation_categories:
            moderation_kwargs["raise_for_categories"] = agent.agno_settings.openai_moderation_categories
        
        openai_moderation_guardrail = OpenAIModerationGuardrail(**moderation_kwargs)
        args["pre_hooks"].append(openai_moderation_guardrail)


async def _resolve_agent_tools(agent: Agent, task: Optional[Task] = None, auth_events_callback: Optional[Callable] = None) -> List[Any]:
    mcp_servers = agent.mcp_servers
    
    # combine task mcps and agent mcps
    if task and task.mcp_servers:
        mcp_servers.extend(task.mcp_servers)
        
    if not mcp_servers:
        return agent.tools.functions

    # Import MCP only if mcp_servers is present
    from agno.tools.mcp import (
        MCPTools,
        SSEClientParams,
        StreamableHTTPClientParams,
    )
    from mcp import StdioServerParameters

    mcp_tools: List[MCPTools] = []
    is_xpander_cloud = getenv("IS_XPANDER_CLOUD", "false") == "true"

    for mcp in mcp_servers:
        transport = mcp.transport.value.lower()
        if mcp.type == MCPServerType.Local:

            # protection for serverless xpander
            is_aws_mcp = (
                True if mcp.command and "aws-api-mcp-server" in mcp.command else False
            )
            if is_aws_mcp and is_xpander_cloud:
                logger.warning(
                    f"skipping aws mcp on agent {agent.id} due to xpander serverless"
                )
                continue

            command_parts = shlex.split(mcp.command)
            mcp_tools.append(
                MCPTools(
                    transport=transport,
                    server_params=StdioServerParameters(
                        command=command_parts[0],
                        args=command_parts[1:],
                        env=mcp.env_vars,
                    ),
                    include_tools=mcp.allowed_tools or None,
                    timeout_seconds=120,
                    tool_name_prefix="mcp_tool"
                )
            )
        elif mcp.url:
            params_cls = (
                SSEClientParams
                if mcp.transport == MCPServerTransport.SSE
                else StreamableHTTPClientParams
            )
            
            # handle mcp auth
            if mcp.auth_type == MCPServerAuthType.OAuth2:
                if not task:
                    raise ValueError("MCP server with OAuth authentication detected but task not sent")
                
                if not task.input.user or not task.input.user.id:
                    raise ValueError("MCP server with OAuth authentication detected but user id not set on the task (task.input.user.id)")
                
                auth_result: MCPOAuthGetTokenResponse = await authenticate_mcp_server(mcp_server=mcp,task=task,user_id=task.input.user.id, auth_events_callback=auth_events_callback)
                if not auth_result:
                    raise ValueError("MCP Server authentication failed")
                if auth_result.type != MCPOAuthResponseType.TOKEN_READY:
                    raise ValueError("MCP Server authentication timeout")
                mcp.api_key = auth_result.data.access_token
            
            if mcp.api_key:
                if not mcp.headers:
                    mcp.headers = {}
                mcp.headers["Authorization"] = f"Bearer {mcp.api_key}"
            mcp_tools.append(
                MCPTools(
                    transport=transport,
                    server_params=params_cls(url=mcp.url, headers=mcp.headers),
                    include_tools=mcp.allowed_tools or None,
                    timeout_seconds=120,
                    tool_name_prefix="mcp_tool"
                )
            )

    return agent.tools.functions + mcp_tools
