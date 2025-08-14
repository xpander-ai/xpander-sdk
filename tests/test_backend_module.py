import os
import uuid
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

@pytest.mark.asyncio
async def test_async_report_external_task():
    """Test reporting an external task through the Backend module asynchronously."""
    backend = Backend()
    task_id = str(uuid.uuid4())
    
    # Test with minimal required parameters
    reported_task = await backend.areport_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Test external task input",
        result="Task completed successfully"
    )
    
    assert reported_task is not None
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


@pytest.mark.asyncio
async def test_async_report_external_task_with_full_params():
    """Test reporting an external task with all parameters."""
    from xpander_sdk.models.shared import Tokens
    
    backend = Backend()
    task_id = str(uuid.uuid4())
    
    # Create test tokens
    tokens = Tokens(
        completion_tokens=150,
        prompt_tokens=50,
        total_tokens=200
    )
    
    reported_task = await backend.areport_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Complex external task input with parameters",
        llm_response={"content": "AI response content", "model": "gpt-4"},
        tokens=tokens,
        is_success=True,
        result="Complex task completed with full context",
        duration=2.5,
        used_tools=["web_search", "calculator"]
    )
    
    assert reported_task is not None
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


@pytest.mark.asyncio
async def test_async_report_external_task_with_agent_instance():
    """Test reporting an external task using an Agent instance."""
    backend = Backend()
    agent = await Agents().aget(agent_id=XPANDER_AGENT_ID)
    task_id = str(uuid.uuid4())
    
    reported_task = await backend.areport_external_task(
        agent=agent,
        id=task_id,
        input="Task input with agent instance",
        result="Task completed via agent instance",
        is_success=True
    )
    
    assert reported_task is not None
    assert reported_task.agent_id == agent.id
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


@pytest.mark.asyncio
async def test_async_report_external_task_failure():
    """Test reporting a failed external task."""
    backend = Backend()
    task_id = str(uuid.uuid4())
    
    reported_task = await backend.areport_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Task that will fail",
        result="Task failed with error",
        is_success=False,
        duration=0.5
    )
    
    assert reported_task is not None
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


def test_sync_report_external_task():
    """Test reporting an external task synchronously."""
    backend = Backend()
    task_id = str(uuid.uuid4())
    
    reported_task = backend.report_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Synchronous external task input",
        result="Sync task completed successfully",
        duration=1.2
    )
    
    assert reported_task is not None
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


def test_sync_report_external_task_with_agent_instance():
    """Test reporting an external task synchronously with an Agent instance."""
    backend = Backend()
    agent = Agents().get(agent_id=XPANDER_AGENT_ID)
    task_id = str(uuid.uuid4())
    
    reported_task = backend.report_external_task(
        agent=agent,
        id=task_id,
        input="Sync task input with agent instance",
        result="Sync task completed via agent instance",
        used_tools=["file_reader"]
    )
    
    assert reported_task is not None
    assert reported_task.agent_id == agent.id
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


def test_sync_report_external_task_with_tools():
    """Test reporting an external task with multiple tools used."""
    backend = Backend()
    task_id = str(uuid.uuid4())
    
    reported_task = backend.report_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Task using multiple tools",
        result="Task completed using various tools",
        duration=3.7,
        used_tools=["web_search", "calculator", "file_reader", "email_sender"]
    )
    
    assert reported_task is not None
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')
