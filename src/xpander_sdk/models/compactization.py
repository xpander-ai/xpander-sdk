from typing import List, Literal, Union

from pydantic import Field
from xpander_sdk.models.deep_planning import DeepPlanningItem
from xpander_sdk.models.shared import XPanderSharedModel
from xpander_sdk.modules.agents.models.agent import AgentInstructions
from xpander_sdk.modules.tasks.models.task import AgentExecutionInput


class TaskCompactizationInput(XPanderSharedModel):
    user_input: AgentExecutionInput = Field(
        ...,
        description=(
            "Original user input that initiated the task, including text, optional file URLs, "
            "and optional user details."
        ),
    )
    agent_instructions: AgentInstructions = Field(
        ...,
        description="Agent instructions (role, goals, and general guidance) that were active during execution."
    )
    task_context_and_messages: str = Field(
        ...,
        description=(
            "Complete execution context including message history, tool calls, and session state. "
            "This contains all information about what was attempted and what was achieved."
        )
    )
    uncompleted_tasks: List["DeepPlanningItem"] = Field(
        default_factory=list,
        description=(
            "List of planned tasks that remain incomplete. Each task has an id, title, and completed status. "
            "ALL of these tasks MUST be completed and marked as completed=true in the continuation."
        )
    )

class TaskCompactizationRetryEvent(XPanderSharedModel):
    is_retry: bool

class TaskCompactizationOutput(XPanderSharedModel):
    new_task_prompt: str = Field(
        ...,
        min_length=1,
        description=(
            "A continuation prompt that seamlessly continues the running execution. "
            "This is NOT a new task - it's the next message in an ongoing conversation. "
            "The prompt must:\n"
            "1. Resume from where the execution left off (do NOT repeat completed work)\n"
            "2. Focus on completing ALL remaining uncompleted tasks\n"
            "3. Include specific instructions to mark each task as completed after finishing it\n"
            "4. Be written as if you're continuing mid-conversation, not starting fresh\n"
            "5. Reference the current state and what still needs to be done\n"
            "Example: 'Continuing from where we left off, we still need to complete tasks X, Y, and Z. "
            "Let's proceed with task X first, then mark it complete using the appropriate tool.'"
        ),
    )

    task_context: str = Field(
        ...,
        min_length=1,
        description=(
            "Comprehensive context for continuing the execution. This context will be injected "
            "into the agent's system prompt to maintain execution continuity.\n\n"
            "REQUIRED FORMAT (use these exact headings, in this order):\n"
            "1) ORIGINAL USER REQUEST\n"
            "- Verbatim user_input text and any file references.\n\n"
            "2) AGENT INSTRUCTIONS IN EFFECT\n"
            "- General description from agent instructions.\n"
            "- Role instructions (bullet list).\n"
            "- Goals (bullet list).\n"
            "- Any constraints or special requirements.\n\n"
            "3) EXECUTION SUMMARY\n"
            "- What actions were taken (facts only, no speculation).\n"
            "- What outputs were produced (facts only).\n\n"
            "4) CURRENT STATE AND ARTIFACTS\n"
            "- All created artifacts with their identifiers, paths, URLs, or references.\n"
            "- Current state of variables, decisions, configurations, and assumptions.\n"
            "- Active session or database state if relevant.\n\n"
            "5) MESSAGES AND KEY EVIDENCE\n"
            "- Compact chronological summary of the conversation flow.\n"
            "- Up to 5 verbatim quotes (max 25 words each) capturing critical details.\n\n"
            "6) TOOL CALLS AND OBSERVATIONS\n"
            "- For each tool call: tool name/id, purpose, key inputs, key outputs, errors.\n"
            "- Include plan tool calls (create/get/complete) if they occurred.\n"
            "- If no tools used: 'No tool calls were made.'\n\n"
            "7) COMPLETED VS UNCOMPLETED TASKS\n"
            "- Completed: List with task IDs and titles that are done.\n"
            "- Uncompleted: List each task ID, title, and specific reason it's incomplete.\n"
            "- CRITICAL: All uncompleted tasks MUST be finished in the continuation.\n\n"
            "8) OPEN QUESTIONS AND UNKNOWNS\n"
            "- Missing information needed to complete remaining tasks.\n"
            "- Blockers or dependencies preventing progress.\n"
            "- If none: 'No open questions.'\n\n"
            "9) NEXT ACTIONS TO COMPLETE ALL TASKS\n"
            "- Ordered list of specific actions to complete each uncompleted task.\n"
            "- Each action should reference the task ID it completes.\n"
            "- Final action must be to mark all tasks as completed using the plan tools.\n\n"
            "ACCURACY REQUIREMENTS:\n"
            "- Do NOT invent details. Use 'Unknown' if information is missing.\n"
            "- Preserve exact names, IDs, numbers, file paths, and user wording.\n"
            "- Task completion status must match reality - no implied completion.\n"
            "- Focus on actionable, specific continuation steps.\n"
        ),
    )


class TaskCompactizationEvent(XPanderSharedModel):
    type: Literal["retry", "summarization"]
    data: Union[
        TaskCompactizationOutput,
        TaskCompactizationRetryEvent
    ]