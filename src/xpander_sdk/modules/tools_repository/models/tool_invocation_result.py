from typing import Any, Optional
from xpander_sdk.models.shared import XPanderSharedModel


class ToolInvocationResult(XPanderSharedModel):
    tool_id: str
    tool_call_id: Optional[str] = None
    task_id: Optional[str] = None
    payload: Optional[Any] = None
    status_code: Optional[int] = 200
    result: Optional[Any] = None
    is_success: Optional[bool] = False
    is_error: Optional[bool] = False
    is_local: Optional[bool] = False
