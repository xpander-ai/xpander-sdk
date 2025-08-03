from enum import Enum
from typing import Any, Optional
from xpander_sdk.models.shared import XPanderSharedModel


class ToolCallRequest(XPanderSharedModel):
    request_id: str
    operation_id: str
    tool_call_id: Optional[str] = None
    graph_node_id: Optional[str] = None
    tool_name: Optional[str] = None
    payload: Optional[Any] = None


class ToolCallResult(ToolCallRequest):
    operation_id: str
    tool_call_id: Optional[str] = None
    tool_name: Optional[str] = None
    payload: Optional[Any] = None
    result: Optional[Any] = None
    is_error: Optional[bool] = False


class TaskUpdateEventType(str, Enum):
    TaskCreated = "task_created"
    TaskUpdated = "task_updated"
    TaskFinished = "task_finished"

    ToolCallRequest = "tool_call_request"
    ToolCallResult = "tool_call_result"

    SubAgentTrigger = "sub_agent_trigger"
