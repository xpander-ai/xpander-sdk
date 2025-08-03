from enum import Enum
from typing import Optional
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
        user_memories (Optional[bool]): If True, enables memory of user interactions. Default is True.
        session_summaries (Optional[bool]): If True, enables generation of session summaries. Default is True.
        num_history_runs (Optional[int]): Number of historical runs to retain or consider. Default is 3.
        tool_call_limit (Optional[int]): Max tool calls per run.
    """

    session_storage: Optional[bool] = True
    user_memories: Optional[bool] = True
    session_summaries: Optional[bool] = True
    num_history_runs: Optional[int] = 3
    tool_call_limit: Optional[int] = None
