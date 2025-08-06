from asyncio import Task
from typing import Any, Optional


from xpander_sdk.models.shared import XPanderSharedModel


class State(XPanderSharedModel):
    task: Optional[Any] = None
    agent: Optional[Any] = None