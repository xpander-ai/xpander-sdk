from enum import Enum
from typing import List, Optional
from pydantic import BaseModel


class Framework(str, Enum):
    """
    Enum representing supported frameworks within xpander.ai.

    Attributes:
        Agno (str): Agno framework identifier.
    """

    Agno = "agno"


class AgnoSettings(BaseModel):
    """
    Configuration settings specific to the Agno framework.

    Attributes:
        session_storage (Optional[bool]): If True, enables session-level storage. Default is True.
        user_memories (Optional[bool]): If True, enables memory of user interactions. Default is False.
        session_summaries (Optional[bool]): If True, enables generation of session summaries. Default is False.
        num_history_runs (Optional[int]): Number of historical runs to retain or consider. Default is 3.
        tool_call_limit (Optional[int]): Max tool calls per run.
        coordinate_mode (Optional[bool]): If True, The agent will be loaded as a Team. Default is False.
        pii_detection_enabled (Optional[bool]): If True, enables PII detection guardrail on agent input. Default is False.
        pii_detection_mask (Optional[bool]): If True, masks detected PII instead of blocking. Default is False.
        prompt_injection_detection_enabled (Optional[bool]): If True, enables prompt injection detection guardrail. Default is False.
        openai_moderation_enabled (Optional[bool]): If True, enables OpenAI content moderation guardrail. Default is False.
        openai_moderation_categories (Optional[List[str]]): List of specific OpenAI moderation categories to enforce. If None, all categories are checked.
    """

    session_storage: Optional[bool] = True
    user_memories: Optional[bool] = False
    session_summaries: Optional[bool] = False
    num_history_runs: Optional[int] = 3
    max_tool_calls_from_history: Optional[int] = 0
    tool_call_limit: Optional[int] = None
    coordinate_mode: Optional[bool] = False
    pii_detection_enabled: Optional[bool] = False
    pii_detection_mask: Optional[bool] = False
    prompt_injection_detection_enabled: Optional[bool] = False
    openai_moderation_enabled: Optional[bool] = False
    openai_moderation_categories: Optional[List[str]] = None
