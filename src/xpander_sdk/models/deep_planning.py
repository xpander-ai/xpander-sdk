from typing import List, Optional
from .shared import XPanderSharedModel

class DeepPlanningItem(XPanderSharedModel):
    id: str
    title: str
    completed: Optional[bool] = False

class DeepPlanning(XPanderSharedModel):
    enabled: Optional[bool] = False
    tasks: Optional[List[DeepPlanningItem]] = []

class PlanFollowingStatus(XPanderSharedModel):
    can_finish: bool
    uncompleted_tasks: Optional[List[DeepPlanningItem]] = []