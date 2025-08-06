import json
from uuid import uuid4
from enum import Enum
from typing import Dict, Optional
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

from xpander_sdk.modules.tasks.sub_modules.task import Task
from .deployments import DeployedAsset


class EventType(str, Enum):
    WorkerRegistration = "worker-registration"
    AgentExecution = "agent-execution"
    WorkerHeartbeat = "worker-heartbeat"
    WorkerFinished = "worker-finished"
    EnvironmentConflict = "worker-environment-conflict"


class EventMessageBase(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    event: EventType
    data: Optional[Dict] = None

    def model_dump_safe(self, **kwargs) -> dict:
        return json.loads(self.model_dump_json(**kwargs))

    model_config = ConfigDict(
        use_enum_values=True,
        ser_json_timedelta='iso8601',
        ser_json_bytes='utf8'
    )


class WorkerRegistrationEvent(EventMessageBase):
    event: EventType = EventType.WorkerRegistration
    data: DeployedAsset


class WorkerFinishedEvent(EventMessageBase):
    event: EventType = EventType.WorkerFinished
    data: Optional[dict] = {}


class WorkerHeartbeat(EventMessageBase):
    event: EventType = EventType.WorkerHeartbeat
    data: datetime = Field(default_factory=datetime.now)


class WorkerExecutionRequest(EventMessageBase):
    event: EventType = EventType.AgentExecution
    data: Task


class WorkerEnvironmentConflict(EventMessageBase):
    event: EventType = EventType.EnvironmentConflict
    error: str
