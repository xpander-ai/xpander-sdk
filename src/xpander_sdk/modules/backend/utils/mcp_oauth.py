import asyncio
from datetime import datetime, timezone
from typing import Callable, Optional
from loguru import logger
from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.models.events import TaskUpdateEventType
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.tasks.sub_modules.task import Task, TaskUpdateEvent
from xpander_sdk.modules.tools_repository.models.mcp import MCPOAuthGetTokenGenericResponse, MCPOAuthGetTokenResponse, MCPOAuthResponseType, MCPServerDetails
from xpander_sdk.modules.backend.events_registry import EventsRegistry

POLLING_INTERVAL = 1 # every 1s
MAX_WAIT_FOR_LOGIN = 600 # 10 mintutes

async def push_event(task: Task, event: TaskUpdateEvent, event_type: TaskUpdateEventType, auth_events_callback: Optional[Callable] = None):
    client = APIClient(configuration=task.configuration)
    
    evt = TaskUpdateEvent(
        task_id=task.id,
        organization_id=task.organization_id,
        time=datetime.now(timezone.utc).isoformat(),
        type=event_type,
        data=event
    )
    
    await client.make_request(
        path=APIRoute.PushExecutionEventToQueue.format(task_id=task.id),
        method="POST",
        payload=[evt.model_dump_safe()]
    )
    
    # Invoke both explicit callback and registered handlers
    # 1. Call explicit callback if provided
    if auth_events_callback:
        if asyncio.iscoroutinefunction(auth_events_callback):
            await auth_events_callback(task.configuration.state.agent, task, evt)
        else:
            auth_events_callback(task.configuration.state.agent, task, evt)
    
    # 2. Always invoke registered handlers from EventsRegistry
    registry = EventsRegistry()
    if registry.has_auth_handlers():
        await registry.invoke_auth_handlers(task.configuration.state.agent, task, evt)

async def get_token(mcp_server: MCPServerDetails, task: Task, user_id: str, return_result: Optional[bool] = False, generate_login_url: Optional[bool] = True) -> MCPOAuthGetTokenResponse:
    client = APIClient(configuration=task.configuration)
    result: MCPOAuthGetTokenResponse = await client.make_request(
        path=APIRoute.GetUserMCPAuthToken.format(agent_id=task.agent_id, user_id=user_id),
        method="POST",
        query={"generate_login_url": generate_login_url},
        payload=mcp_server.model_dump(),
        model=MCPOAuthGetTokenResponse
    )
    if result.type == MCPOAuthResponseType.TOKEN_READY or return_result:
        return result
    
    return None

async def authenticate_mcp_server(mcp_server: MCPServerDetails, task: Task, user_id: str, auth_events_callback: Optional[Callable] = None) -> MCPOAuthGetTokenResponse:
    try:
        logger.info(f"Authenticating MCP Server {mcp_server.url}")
        
        user_identifier = user_id if mcp_server.share_user_token_across_other_agents else f"{task.agent_id}_{user_id}"
        
        result: MCPOAuthGetTokenResponse = await get_token(mcp_server=mcp_server, task=task, user_id=user_identifier, return_result=True)
        
        if not result:
            raise Exception("Invalid response")
        
        if result.type == MCPOAuthResponseType.LOGIN_REQUIRED:
            logger.info(f"Initiating login for MCP Server {mcp_server.url}")
            # Notify user about login requirement
            await push_event(task=task, event=result, event_type=TaskUpdateEventType.AuthEvent, auth_events_callback=auth_events_callback)
            
            # Poll for token with timeout
            elapsed_time = 0
            while elapsed_time < MAX_WAIT_FOR_LOGIN:
                await asyncio.sleep(POLLING_INTERVAL)
                elapsed_time += POLLING_INTERVAL
                
                # Check for token
                token_result = await get_token(mcp_server=mcp_server, task=task, user_id=user_identifier, generate_login_url=False)
                if token_result and token_result.type == MCPOAuthResponseType.TOKEN_READY:
                    logger.info(f"Successful login for MCP Server {mcp_server.url}")
                    redacted_token_result = MCPOAuthGetTokenResponse(**token_result.model_dump_safe())
                    redacted_token_result.data.access_token = "REDACTED"
                    await push_event(task=task, event=redacted_token_result, event_type=TaskUpdateEventType.AuthEvent, auth_events_callback=auth_events_callback)
                    return token_result
            
            # Timeout reached
            raise TimeoutError(f"Authentication timeout for MCP Server {mcp_server.url} after {MAX_WAIT_FOR_LOGIN} seconds")
        
        if result.type == MCPOAuthResponseType.TOKEN_READY:
            logger.info(f"Token ready for MCP Server {mcp_server.url}")
            redacted_token_result = MCPOAuthGetTokenResponse(**result.model_dump_safe())
            redacted_token_result.data.access_token = "REDACTED"
            await push_event(task=task, event=redacted_token_result, event_type=TaskUpdateEventType.AuthEvent, auth_events_callback=auth_events_callback)
        
        return result
    except Exception as e:
        error = f"Failed to process MCP Auth - {str(e)}"
        logger.error(error)
        return MCPOAuthGetTokenResponse(
            type=MCPOAuthResponseType.TOKEN_ISSUE,
            data=MCPOAuthGetTokenGenericResponse(message=error)
        )