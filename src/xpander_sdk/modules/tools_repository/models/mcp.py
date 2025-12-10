from enum import Enum
from typing import Dict, List, Optional, Union

from pydantic import BaseModel

from xpander_sdk.models.shared import XPanderSharedModel


class MCPServerType(str, Enum):
    Local = "local"
    Remote = "remote"
    
class MCPServerAuthType(str, Enum):
    APIKey = "api_key"
    OAuth2 = "oauth2"
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
    client_id: Optional[str] = None
    client_secret: Optional[str] = None
    headers: Optional[Dict] = {}
    env_vars: Optional[Dict] = {}
    allowed_tools: Optional[List[str]] = []
    additional_scopes: Optional[List[str]] = []
    share_user_token_across_other_agents: Optional[bool] = True


class MCPOAuthResponseType(str, Enum):
    NOT_SUPPORTED = "not_supported"
    LOGIN_REQUIRED = "login_required"
    TOKEN_ISSUE = "token_issue"
    TOKEN_READY = "token_ready"


class MCPOAuthGetTokenGenericResponse(XPanderSharedModel):
    message: str


class MCPOAuthGetTokenLoginRequiredResponse(XPanderSharedModel):
    url: str
    server_url: str
    server_name: str


class MCPOAuthGetTokenTokenReadyResponse(XPanderSharedModel):
    access_token: str


class MCPOAuthGetTokenResponse(XPanderSharedModel):
    type: MCPOAuthResponseType
    data: Union[
        MCPOAuthGetTokenTokenReadyResponse,
        MCPOAuthGetTokenLoginRequiredResponse,
        MCPOAuthGetTokenGenericResponse,
    ]