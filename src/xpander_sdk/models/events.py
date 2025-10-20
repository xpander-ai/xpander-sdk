from enum import Enum
from typing import Any, List, Optional

from pydantic import Field
from xpander_sdk.models.shared import XPanderSharedModel
from datetime import datetime

class TaskStatus(str, Enum):
    READY = "ready"
    RUNNING = "running"
    FAILED = "failed"
    DONE = "done"


class Task(XPanderSharedModel):
    id: str = Field(..., description="task id")
    title: str = Field(..., description="Short task title, max 120 chars")
    description: Optional[str] = Field(None, description="Optional short step description, max 120 chars")
    status: TaskStatus = Field(..., description="Task status")
    created_at: datetime = Field(..., description="Creation timestamp (ISO 8601)")
    started_at: Optional[datetime] = Field(None, description="Start timestamp (ISO 8601)")
    finished_at: Optional[datetime] = Field(None, description="Finish timestamp (ISO 8601)")
    error: Optional[str] = Field(None, description="Error message if failed")
    parent_id: Optional[str] = Field(None, description="Parent task id if related")


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
