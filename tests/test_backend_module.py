import os
from pathlib import Path

import pytest
from dotenv import load_dotenv

from xpander_sdk.modules.backend.backend_module import Backend
from xpander_sdk.modules.agents.agents_module import Agents
from xpander_sdk.modules.agents.sub_modules.agent import Agent

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)

XPANDER_AGENT_ID = os.getenv("XPANDER_AGENT_ID")

@pytest.mark.asyncio
async def test_async_get_args_with_agent_id_in_env():
    args = await Backend().aget_args()
    assert isinstance(args, dict)
    assert "model" in args
    assert "agent_id" in args
    assert args["agent_id"] == XPANDER_AGENT_ID

@pytest.mark.asyncio
async def test_async_get_args_with_agent_id():
    args = await Backend().aget_args(agent_id=XPANDER_AGENT_ID)
    assert isinstance(args, dict)
    assert "model" in args
    assert "agent_id" in args
    assert args["agent_id"] == XPANDER_AGENT_ID


@pytest.mark.asyncio
async def test_async_get_args_with_agent_instance():
    agent = await Agents().aget(agent_id=XPANDER_AGENT_ID)
    args = await Backend().aget_args(agent=agent)
    assert isinstance(args, dict)
    assert args["agent_id"] == agent.id


def test_sync_get_args_with_agent_id():
    args = Backend().get_args(agent_id=XPANDER_AGENT_ID)
    assert isinstance(args, dict)
    assert "model" in args
    assert "agent_id" in args


def test_sync_get_args_with_agent_instance():
    agent = Agents().get(agent_id=XPANDER_AGENT_ID)
    args = Backend().get_args(agent=agent)
    assert isinstance(args, dict)
    assert args["agent_id"] == agent.id


@pytest.mark.asyncio
async def test_async_get_args_invalid_input():
    with pytest.raises(ValueError, match="Either 'agent_id' or 'agent' must be provided."):
        await Backend().aget_args()
