from typing import TYPE_CHECKING, List, Union
from agno.agent import Agent as AgnoAgent
from loguru import logger
import json
from xpander_sdk.models.compactization import TaskCompactizationEvent, TaskCompactizationOutput, TaskCompactizationInput, TaskCompactizationRetryEvent
from xpander_sdk.models.deep_planning import DeepPlanningItem
from xpander_sdk.models.events import TaskUpdateEventType
from xpander_sdk.models.frameworks import Framework
from xpander_sdk.models.shared import Tokens
from xpander_sdk.modules.agents.agents_module import Agents
from xpander_sdk.modules.backend.backend_module import Backend
from xpander_sdk.modules.backend.utils.mcp_oauth import push_event
from xpander_sdk.modules.tasks.sub_modules.task import TaskUpdateEvent
from xpander_sdk.utils.event_loop import run_sync
from xpander_sdk.utils.generic import get_current_timestamp

if TYPE_CHECKING:
    from xpander_sdk.modules.tasks.sub_modules.task import Task

def run_task_compactization(message: str, task: "Task", uncompleted_tasks: List[DeepPlanningItem]) -> Union[str, TaskCompactizationOutput]:
    try:
        
        # report retry event
        try:
            run_sync(
                push_event(
                    task=task,
                    event=TaskCompactizationEvent(type="retry", data=TaskCompactizationRetryEvent(is_retry=True)),
                    event_type=TaskUpdateEventType.TaskCompactization
                )
            )
        except Exception as e:
            pass
        
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
                You are a system component that handles early/unapproved agent task exits.
                
                When an agent stops execution with uncompleted tasks, you analyze the state and generate a continuation prompt
                that will be sent DIRECTLY to that agent to resume its work.
                
                Your output becomes the agent's next input - it must guide the agent to:
                1. Continue from where it stopped (seamlessly, no restart)
                2. Complete ALL remaining uncompleted tasks
                3. Use correct tools (especially xpask_for_information for questions)
                4. NOT expose internal orchestration (xp* tools, task IDs) to the user
                
                You are a bridge between system orchestration and agent execution.
            """,
            role="""
                You are the **Compactization Agent** - a system component for handling early agent exits.
                
                **The Flow:**
                1. Agent A (e.g., researcher) starts task and creates plan
                2. Agent A executes but stops/exits early with uncompleted tasks
                3. System detects uncompleted tasks and triggers YOU
                4. You analyze Agent A's execution state and generate continuation guidance
                5. Your output goes DIRECTLY to Agent A as its next prompt
                6. Agent A resumes and completes remaining work
                
                **Your Mission:**
                Generate a prompt that Agent A will receive to continue its work. This prompt must:
                - Guide Agent A on what's been done and what remains
                - Correct any protocol violations (e.g., asking questions without tool)
                - Instruct Agent A to NOT expose internal xp* tools to the user
                - Make Agent A's continuation feel seamless to the user
                
                You are NOT talking to the user. You are talking to Agent A.
            """,
            instructions="""
            ## Your Role: Agent-to-Agent Handoff
            
            You are writing a message that will be sent TO the agent (Agent A) to continue its task.
            
            **Key Understanding:**
            - Your `new_task_prompt` = The message Agent A will receive
            - Agent A will see this message and continue working
            - The user will see Agent A's response, not your message directly
            - You must guide Agent A to work seamlessly without exposing internals
            
            ## Core Principles
            
            * **You are guiding Agent A**, not the user
            * **Agent A must complete ALL uncompleted tasks** - tell it what remains
            * **Stay factual** - Use "Unknown" for missing info
            * **Preserve exact state** - Keep IDs, names, paths, outputs unchanged in context
            * **Correct violations** - If Agent A asked questions without tool, tell it to use the tool
            * **Hide orchestration** - Instruct Agent A to NOT mention xp* tools, task IDs, or internals to user
            
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
            
            ## Continuation Prompt: Your Message TO Agent A
            
            Your `new_task_prompt` is what Agent A will read. Structure it as guidance TO the agent:
            
            1. **IF protocol violation:** "You asked questions without using xpask_for_information tool. Use the tool for questions."
            2. **Orient Agent A:** "You were working on [task]. You've completed [X, Y, Z]."
            3. **State what remains:** "You still need to complete: [list remaining work in plain language]."
            4. **Guide next steps:** "Continue by: [step-by-step what to do next]."
            5. **Hide internals instruction:** "Important: Do NOT mention xp* tools, task IDs, or internal workflow to the user. Present your work naturally."
            6. **Enforce protocol:** "Mark each task complete immediately after finishing using xpcomplete_agent_plan_item."
            7. **Natural tone:** "Continue your response to the user seamlessly, as if you never stopped."
            
            You are INSTRUCTING Agent A on how to continue, not writing the user-facing response yourself.
            
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
            - Write as instructions TO Agent A (you're guiding it, not doing its work)
            - Tell Agent A what it's done and what remains
            - Instruct Agent A to complete remaining tasks
            - Tell Agent A to use correct tools (xpask_for_information for questions)
            - Instruct Agent A to hide xp* tools and internals from user
            - Include technical details (task IDs, tool names) in task_context for Agent A's reference
            - Correct any protocol violations Agent A made
            """,
            expected_output="""
            Return a JSON object with exactly these two fields:

            - new_task_prompt (string): Instructions TO Agent A for continuing its task.
              
              This message will be sent directly to Agent A. Write it as guidance:
              
              IF PROTOCOL VIOLATION:
                "You asked questions without using xpask_for_information tool. Use the tool for questions after plan starts."
              
              Then:
              "You were working on [task name]. You've completed [work done in plain language].
              
              You still need to complete: [list remaining uncompleted work naturally].
              
              Continue by: [specific steps for Agent A to take].
              
              IMPORTANT: When responding to the user, do NOT mention xp* tools, task IDs, or internal workflow.
              Present your work naturally as if execution never stopped. The user should not see any interruption.
              
              Mark each task complete immediately after finishing using xpcomplete_agent_plan_item."

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
        
        # report compactization event
        try:
            run_sync(
                push_event(
                    task=task,
                    event=TaskCompactizationEvent(type="summarization", data=run_result.content),
                    event_type=TaskUpdateEventType.TaskCompactization
                )
            )
        except Exception as e:
            pass
        
        return run_result.content
    except Exception as e:
        logger.warning(f"Failed to run task compactization - {str(e)}")
        return message