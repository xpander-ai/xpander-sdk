from typing import TYPE_CHECKING, List, Union
from agno.agent import Agent as AgnoAgent
from loguru import logger
import json
from xpander_sdk.models.compactization import TaskCompactizationOutput, TaskCompactizationInput
from xpander_sdk.models.deep_planning import DeepPlanningItem
from xpander_sdk.models.frameworks import Framework
from xpander_sdk.models.shared import Tokens
from xpander_sdk.modules.agents.agents_module import Agents
from xpander_sdk.modules.backend.backend_module import Backend

if TYPE_CHECKING:
    from xpander_sdk.modules.tasks.sub_modules.task import Task

def run_task_compactization(message: str, task: "Task", uncompleted_tasks: List[DeepPlanningItem]) -> Union[str, TaskCompactizationOutput]:
    try:
        # get agent to identify framework
        agent = Agents(configuration=task.configuration).get(agent_id=task.agent_id,version=task.agent_version)
        
        # non agno, let the same agent handle it
        if agent.framework != Framework.Agno:
            return "\n".join([
                "Task not finished, uncompleted tasks detected:",
                f"Uncompleted tasks: {[task.model_dump_json() for task in uncompleted_tasks]}",
                "You must complete tasks if fulfilled",
                f"User's original request: \"{message}\""
            ])
        
        # load backend args for consistency of model provider and settings
        agno_args = Backend(configuration=agent.configuration).get_args(agent_id=agent.id, agent_version=agent.version, task=task)
        
        if agent.model_provider == "openai":
            agno_args["model"].id = "gpt-5-mini"
        
        # create compacitzation agent
        compactization_agent = AgnoAgent(
            output_schema=TaskCompactizationOutput,
            name="Task Compactization Agent",
            model=agno_args.get("model"),
            description="""
                You analyze a running agent execution that has uncompleted tasks and produce a seamless continuation package.
                
                Your output enables the execution to resume exactly where it left off and complete ALL remaining tasks.
                
                You produce:
                1. A continuation prompt that picks up mid-execution (NOT a new task start)
                2. Comprehensive context that preserves all critical state, decisions, and artifacts
                
                CRITICAL: ALL uncompleted tasks provided to you MUST be addressed and marked as completed in your continuation plan.
            """,
            role="""
                You are a **Task Compactization Agent** specialized in maintaining execution continuity.
                
                Your mission: Convert a partially-executed agent run into a precise continuation package that allows the execution 
                to resume seamlessly and complete ALL uncompleted tasks without repetition or confusion.
                
                You are NOT starting a new task - you are continuing a running process that was interrupted.
                The next agent run will receive your continuation prompt as the next message in an ongoing conversation.
            """,
            instructions="""
            ## Core Principles
            
            * **This is a CONTINUATION, not a restart.** The next prompt continues an active execution mid-conversation.
            * **ALL uncompleted tasks MUST be completed.** Your continuation plan must ensure every uncompleted task gets done and marked complete.
            * **Stay factual.** Do not invent details. Use "Unknown" for missing information and list it under open questions.
            * **Preserve exact state.** Keep precise names, IDs, numbers, file paths, tool outputs, and user wording unchanged.
            * **Track completion accurately.** Never imply completion. Clearly distinguish what IS done from what REMAINS to be done.
            
            ## What You Must Capture
            
            * **Tool call history.** For each tool: name/id, purpose, inputs (high-level), outputs (high-level), errors. Include plan tools (xpcreate_agent_plan, xpcomplete_agent_plan_item, etc.).
            * **Artifacts and state.** All created files, IDs, URLs, variables, decisions, and configurations.
            * **What worked / what didn't.** Successes, failures, blockers, missing info, wrong assumptions.
            * **Task completion status.** For each uncompleted task: exact ID, title, and specific reason it's incomplete.
            * **PROTOCOL VIOLATIONS.** Check if agent asked questions in response text AFTER calling xpstart_execution_plan (violates protocol).
            
            ## Detecting Protocol Violations
            
            If the agent's last message contains questions to the user AFTER the plan was started (after xpstart_execution_plan was called):
            - This is a PROTOCOL VIOLATION
            - The agent should have used xpask_for_information tool instead
            
            When violation is detected, you MUST make it SUPER CLEAR in BOTH output fields:
            
            **In `new_task_prompt`:**
            - START with: "CRITICAL PROTOCOL VIOLATION DETECTED: You asked questions directly after starting the plan."
            - Explicitly state: "You MUST use xpask_for_information tool to ask questions once plan is running."
            - Include: "NEVER write questions in your response text after calling xpstart_execution_plan."
            - Then provide the continuation instructions
            
            **In `task_context`:**
            - Add a dedicated section at the TOP before section 1: "**PROTOCOL VIOLATION DETECTED**"
            - State clearly: "Agent asked questions in response text after calling xpstart_execution_plan. This violates execution protocol."
            - Remind: "Rule: After xpstart_execution_plan is called, questions MUST be asked using xpask_for_information tool, NOT written in response text."
            
            Signs of protocol violation in messages:
            - Phrases like "Before I proceed", "I need clarification", "Please choose", "Which option"
            - Questions written in response text after xpstart_execution_plan was called
            
            ## Continuation Prompt Requirements
            
            Your `new_task_prompt` must:
            1. **IF protocol violation detected:** START with "CRITICAL PROTOCOL VIOLATION DETECTED" warning (see above)
            2. Resume where execution stopped ("Continuing from where we left off...")
            3. NOT repeat completed work
            4. List ALL uncompleted tasks by ID and title
            5. Provide step-by-step actions to complete each task
            6. Explicitly instruct to mark each task complete using xpcomplete_agent_plan_item after finishing it
            7. Sound like the next message in an ongoing conversation, not a new task
            8. **IF protocol violation:** Emphasize the requirement to use xpask_for_information tool for any questions
            
            ## Task Context Requirements
            
            Your `task_context` must:
            1. **IF protocol violation detected:** Add "PROTOCOL VIOLATION DETECTED" section at the TOP before section 1
            2. Follow the exact 9-heading structure specified in the output schema (or 10 if violation detected)
            3. Be deterministic and parseable by downstream systems
            4. Focus on actionable continuation steps in section 9 (NEXT ACTIONS)
            5. Include task IDs for all uncompleted tasks
            6. Emphasize that ALL tasks must be completed and marked complete
            
            ## Critical Rules
            
            ❌ **NEVER:**
            - Suggest restarting or creating a new plan
            - Mark tasks as complete that aren't actually done
            - Invent details or speculate
            - Write a "fresh start" prompt
            
            ✅ **ALWAYS:**
            - Write continuation prompts that resume mid-execution
            - Include all uncompleted task IDs and titles
            - Provide specific actions to complete each task
            - Instruct to mark tasks complete using the plan tools
            - Preserve exact state, IDs, names, and wording
            - **Check for protocol violations** and correct them in your continuation prompt
            - If agent asked questions in text after plan started, instruct to use xpask_for_information tool instead
            """,
            expected_output="""
            Return a JSON object with exactly these two fields:

            - new_task_prompt (string): A continuation message that resumes the running execution mid-conversation.
              IF PROTOCOL VIOLATION DETECTED (agent asked questions after xpstart_execution_plan):
                - START WITH: "CRITICAL PROTOCOL VIOLATION DETECTED: You asked questions directly after starting the plan. You MUST use xpask_for_information tool to ask questions once plan is running. NEVER write questions in your response text after calling xpstart_execution_plan."
              Then: (1) list ALL uncompleted tasks with their IDs and titles, (2) give step-by-step actions to finish each,
              (3) explicitly instruct to mark each task complete using xpcomplete_agent_plan_item after finishing it, and
              (4) read like the next message in an ongoing conversation (NOT a fresh start).

            - task_context (string): Comprehensive context for continuation.
              IF PROTOCOL VIOLATION DETECTED:
                - Add section at TOP: "**PROTOCOL VIOLATION DETECTED**\nAgent asked questions in response text after calling xpstart_execution_plan. This violates execution protocol. Rule: After xpstart_execution_plan is called, questions MUST be asked using xpask_for_information tool, NOT written in response text.\n\n"
              Then follow the EXACT 9-section structure defined in TaskCompactizationOutput.task_context.
              Must be deterministic, actionable, and focused on completing ALL remaining tasks and marking them as completed.

            Important:
            - Do NOT invent details; write 'Unknown' when information is missing.
            - Preserve exact IDs, names, file paths, numbers, and user phrasing.
            - Final actions must include marking each remaining task as completed with the plan tools.
            - IF protocol violation: Make it SUPER CLEAR in both fields that tool must be used for questions.
            """
        )
        
        session = agent.get_session(session_id=task.id)
        
        # run compactization
        run_result = compactization_agent.run(
            input=TaskCompactizationInput(
                user_input=task.input,
                agent_instructions=agent.instructions,
                task_context_and_messages=json.dumps({"messages": [message.model_dump() for message in session.get_messages() if message.role != "system"]}),
                uncompleted_tasks=uncompleted_tasks
            )
        )
        
        # reset old session
        agent.delete_session(session_id=task.id)
        
        # report LLM Metrics
        task.tokens = Tokens(
            completion_tokens=run_result.metrics.output_tokens,
            prompt_tokens=run_result.metrics.input_tokens
        )
        
        task.report_metrics(configuration=task.configuration)
        
        return run_result.content
    except Exception as e:
        logger.warning(f"Failed to run task compactization - {str(e)}")
        return message