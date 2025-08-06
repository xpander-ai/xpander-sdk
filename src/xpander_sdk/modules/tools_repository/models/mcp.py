from enum import Enum
from typing import Dict, List, Optional

from pydantic import BaseModel


class MCPServerType(str, Enum):
    Local = "local"
    Remote = "remote"
    
class MCPServerAuthType(str, Enum):
    APIKey = "api_key"
    CustomHeaders = "custom_headers"
    _None = "none"

class MCPServerTransport(str, Enum):
    STDIO = "stdio"
    SSE = "sse"
    HTTP_Transport = "streamable-http"

class MCPServerDetails(BaseModel):
    type: Optional[MCPServerType] = MCPServerType.Remote
    name: Optional[str] = None
    command: Optional[str] = None
    url: Optional[str] = None
    transport: Optional[MCPServerTransport] = MCPServerTransport.HTTP_Transport
    auth_type: Optional[MCPServerAuthType] = MCPServerAuthType._None
    api_key: Optional[str] = None
    headers: Optional[Dict] = {}
    env_vars: Optional[Dict] = {}
    allowed_tools: Optional[List[str]] = []