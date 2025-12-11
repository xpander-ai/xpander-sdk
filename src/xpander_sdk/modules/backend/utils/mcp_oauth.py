import asyncio
from datetime import datetime, timezone
from loguru import logger
from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.models.events import TaskUpdateEventType
from xpander_sdk.modules.tasks.sub_modules.task import Task, TaskUpdateEvent
from xpander_sdk.modules.tools_repository.models.mcp import MCPOAuthGetTokenGenericResponse, MCPOAuthGetTokenResponse, MCPOAuthResponseType, MCPServerDetails

POLLING_INTERVAL = 1 # every 1s
MAX_WAIT_FOR_LOGIN = 600 # 10 mintutes

async def push_event(task: Task, event: TaskUpdateEvent):
    client = APIClient(configuration=task.configuration)
    await client.make_request(
        path=APIRoute.PushExecutionEventToQueue.format(task_id=task.id),
        method="POST",
        payload=[
            TaskUpdateEvent(
                task_id=task.id,
                organization_id=task.organization_id,
                time=datetime.now(timezone.utc).isoformat(),
                type=TaskUpdateEventType.AuthEvent,
                data=event
                ).model_dump_safe()
            ]
    )

async def get_token(mcp_server: MCPServerDetails, task: Task, user_id: str) -> MCPOAuthGetTokenResponse:
    client = APIClient(configuration=task.configuration)
    result: MCPOAuthGetTokenResponse = await client.make_request(
        path=APIRoute.GetUserMCPAuthToken.format(agent_id=task.agent_id, user_id=user_id),
        method="POST",
        payload=mcp_server.model_dump(),
        model=MCPOAuthGetTokenResponse
    )
    if result.type == MCPOAuthResponseType.TOKEN_READY:
        return result
    
    return None

async def authenticate_mcp_server(mcp_server: MCPServerDetails, task: Task, user_id: str) -> MCPOAuthGetTokenResponse:
    try:
        logger.info(f"Authenticating MCP Server {mcp_server.url}")
        
        user_identifier = user_id if mcp_server.share_user_token_across_other_agents else f"{task.agent_id}_{user_id}"
        
        client = APIClient(configuration=task.configuration)
        result: MCPOAuthGetTokenResponse = await client.make_request(
            path=APIRoute.GetUserMCPAuthToken.format(agent_id=task.agent_id, user_id=user_identifier),
            method="POST",
            payload=mcp_server.model_dump(),
            model=MCPOAuthGetTokenResponse
        )
        
        if not result:
            raise Exception("Invalid response")
        
        if result.type == MCPOAuthResponseType.LOGIN_REQUIRED:
            logger.info(f"Initiating login for MCP Server {mcp_server.url}")
            # Notify user about login requirement
            await push_event(task=task, event=result)
            
            # Poll for token with timeout
            elapsed_time = 0
            while elapsed_time < MAX_WAIT_FOR_LOGIN:
                await asyncio.sleep(POLLING_INTERVAL)
                elapsed_time += POLLING_INTERVAL
                
                # Check for token
                token_result = await get_token(mcp_server=mcp_server, task=task, user_id=user_identifier)
                if token_result and token_result.type == MCPOAuthResponseType.TOKEN_READY:
                    logger.info(f"Successful login for MCP Server {mcp_server.url}")
                    redacted_token_result = MCPOAuthGetTokenResponse(**token_result.model_dump_safe())
                    redacted_token_result.data.access_token = "REDACTED"
                    await push_event(task=task, event=redacted_token_result)
                    return token_result
            
            # Timeout reached
            raise TimeoutError(f"Authentication timeout for MCP Server {mcp_server.url} after {MAX_WAIT_FOR_LOGIN} seconds")
        
        if result.type == MCPOAuthResponseType.TOKEN_READY:
            logger.info(f"Token ready for MCP Server {mcp_server.url}")
            redacted_token_result = MCPOAuthGetTokenResponse(**result.model_dump_safe())
            redacted_token_result.data.access_token = "REDACTED"
            await push_event(task=task, event=redacted_token_result)
        
        return result
    except Exception as e:
        error = f"Failed to process MCP Auth - {str(e)}"
        logger.error(error)
        return MCPOAuthGetTokenResponse(
            type=MCPOAuthResponseType.TOKEN_ISSUE,
            data=MCPOAuthGetTokenGenericResponse(message=error)
        )