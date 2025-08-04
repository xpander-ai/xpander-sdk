import os
from pathlib import Path
from dotenv import load_dotenv
import pytest

from xpander_sdk import Agents, AgentsListItem, Agent
from xpander_sdk.modules.tools_repository.models.mcp import MCPServerDetails

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)

XPANDER_AGENT_ID = os.getenv("XPANDER_AGENT_ID")

@pytest.mark.asyncio
async def test_list_agents():
    agents = Agents()
    agents_list = await agents.alist()
    assert isinstance(agents_list, list)
    assert len(agents_list) != 0
    assert isinstance(agents_list[0], AgentsListItem)


@pytest.mark.asyncio
async def test_load_agent():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID


@pytest.mark.asyncio
async def test_load_agent_with_mcp_servers():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    
    assert len(agent.mcp_servers) != 0
    assert isinstance(agent.mcp_servers[0], MCPServerDetails)


@pytest.mark.asyncio
async def test_load_agent_from_list():
    agents = Agents()
    agents_list = await agents.alist()
    assert isinstance(agents_list, list)
    assert len(agents_list) != 0

    agent = await agents_list[0].aload()
    assert isinstance(agent, Agent)
    assert agent.id == agents_list[0].id


@pytest.mark.asyncio
async def test_get_agent_connection_string():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID

    connection_string = await agent.aget_connection_string()
    assert connection_string
    assert connection_string.connection_uri.uri is not None


@pytest.mark.asyncio
async def test_load_and_invoke_agent():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID

    prompt = "what can you do"
    task = await agent.acreate_task(prompt=prompt)
    assert task.agent_id == agent.id
    assert task.input.text == prompt

@pytest.mark.asyncio
async def test_get_user_sessions():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID

    sessions = await agent.aget_user_sessions(user_id="moriel@xpander.ai")
    assert len(sessions) != 0
