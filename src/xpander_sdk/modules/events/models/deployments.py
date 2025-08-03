from datetime import datetime
from enum import Enum
from typing import Dict, Optional

from pydantic import BaseModel, Field

class DeploymentType(str, Enum):
    Gateway = "gateway"
    Controller = "controller"
    Worker = "worker"
    Redis = "redis"

class DeployedAsset(BaseModel):
    id: str = Field(...,description="The asset's unique identifier")
    name: str = Field(...,description="The asset's generated name")
    organization_id: str = Field(...,description="The asset's organization")
    type: DeploymentType = Field(...,description="The asset's type")
    created_at: datetime = Field(...,description="The asset's creation date")
    created_by: Optional[str] = Field(...,description="The asset's creator - used in local env workers")
    last_heartbeat: datetime = Field(...,description="The asset's creation date")
    configuration: Optional[Dict] = Field(default=None,description="The asset's configuration")
    dedicated_agent_id: Optional[str] = Field(...,description="The asset agent id if used as a dedicated asset")
    parent_asset_id: Optional[str] = Field(...,description="The asset parent id if used as a dedicated asset worker")
    is_busy: Optional[bool] = Field(False,description="The asset busyness indication")
    metadata: Optional[Dict] = Field(default=None,description="The asset's metadata")