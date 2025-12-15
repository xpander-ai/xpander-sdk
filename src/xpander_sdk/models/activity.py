from datetime import datetime
from enum import Enum
from typing import Any, List, Literal, Optional, Union

from xpander_sdk.models.events import ToolCallRequestReasoning
from xpander_sdk.models.shared import XPanderSharedModel
from xpander_sdk.models.user import User
from xpander_sdk.modules.tools_repository.models.mcp import MCPOAuthGetTokenResponse

class AgentActivityThreadMessageContent(XPanderSharedModel):
    text: Optional[str] = None
    files: Optional[List[str]] = []

class AgentActivityThreadMessage(XPanderSharedModel):
    id: str
    created_at: datetime
    role: Literal["user","agent"]
    content: AgentActivityThreadMessageContent

class AgentActivityThreadToolCall(XPanderSharedModel):
    id: str
    created_at: datetime
    tool_name: str
    payload: Any
    is_error: Optional[bool] = False
    reasoning: Optional[ToolCallRequestReasoning] = None
    result: Optional[Any] = None

class AgentActivityThreadReasoningType(str, Enum):
    Think = "think"
    Analyze = "analyze"

class AgentActivityThreadReasoning(XPanderSharedModel):
    id: str
    created_at: datetime
    type: AgentActivityThreadReasoningType
    title: str
    confidence: float
    thought: Optional[str] = None
    action: Optional[str] = None
    result: Optional[str] = None
    analysis: Optional[str] = None

class AgentActivityThreadSubAgentTrigger(XPanderSharedModel):
    id: str
    created_at: datetime
    agent_id: str
    query: Optional[str] = None
    files: Optional[List[str]] = []
    reasoning: ToolCallRequestReasoning

class AgentActivityThreadAuth(MCPOAuthGetTokenResponse):
    id: str
    created_at: datetime

AgentActivityThreadMessageType = Union[AgentActivityThreadMessage, AgentActivityThreadToolCall, AgentActivityThreadReasoning, AgentActivityThreadSubAgentTrigger, AgentActivityThreadAuth]
class AgentActivityThread(XPanderSharedModel):
    id: str
    created_at: datetime
    messages: List[AgentActivityThreadMessageType]
    user: Optional[User] = None

class AgentActivityThreadListItem(XPanderSharedModel):
    id: str
    created_at: datetime