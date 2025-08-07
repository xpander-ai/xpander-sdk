import os
import uuid
from pathlib import Path
from dotenv import load_dotenv
import pytest

from xpander_sdk.models.events import TaskUpdateEventType
from xpander_sdk.modules.tasks.models.task import AgentExecutionStatus
from xpander_sdk.modules.tasks.models.tasks_list import TasksListItem
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.modules.tasks.tasks_module import Tasks

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)

XPANDER_AGENT_ID = os.getenv("XPANDER_AGENT_ID_WITH_TASKS")
XPANDER_TASK_ID = os.getenv("XPANDER_TASK_ID")


@pytest.mark.asyncio
async def test_list_tasks():
    tasks = Tasks()
    tasks_list = await tasks.alist(agent_id=XPANDER_AGENT_ID)
    assert isinstance(tasks_list, list)
    assert len(tasks_list) != 0
    assert isinstance(tasks_list[0], TasksListItem)


@pytest.mark.asyncio
async def test_load_task():
    tasks = Tasks()
    task = await tasks.aget(task_id=XPANDER_TASK_ID)

    assert isinstance(task, Task)
    assert task.id == XPANDER_TASK_ID


@pytest.mark.asyncio
async def test_load_task_from_list():
    tasks = Tasks()
    tasks_list = await tasks.alist(agent_id=XPANDER_AGENT_ID)
    assert isinstance(tasks_list, list)
    assert len(tasks_list) != 0

    task = await tasks_list[0].aload()
    assert isinstance(task, Task)
    assert task.id == tasks_list[0].id


@pytest.mark.asyncio
async def test_create_task():
    tasks = Tasks()
    prompt = "what can you do"
    created_task = await tasks.acreate(agent_id=XPANDER_AGENT_ID, prompt=prompt)
    assert isinstance(created_task, Task)
    assert created_task.agent_id == XPANDER_AGENT_ID
    assert created_task.input.text == prompt
    assert created_task.status == AgentExecutionStatus.Pending


@pytest.mark.asyncio
async def test_create_task_and_sync_with_history():
    tasks = Tasks()
    prompt = "hi"
    created_task = await tasks.acreate(agent_id=XPANDER_AGENT_ID, prompt=prompt)
    assert isinstance(created_task, Task)
    assert created_task.agent_id == XPANDER_AGENT_ID
    assert created_task.input.text == prompt
    assert created_task.status == AgentExecutionStatus.Pending

    tasks_list = await tasks.alist(agent_id=XPANDER_AGENT_ID)
    assert any(task.id == created_task.id for task in tasks_list)


@pytest.mark.asyncio
async def test_create_and_update_task():
    tasks = Tasks()
    prompt = "hi"
    created_task = await tasks.acreate(agent_id=XPANDER_AGENT_ID, prompt=prompt)
    assert isinstance(created_task, Task)
    assert created_task.agent_id == XPANDER_AGENT_ID
    assert created_task.input.text == prompt
    assert created_task.status == AgentExecutionStatus.Pending

    # update using tasks module
    updated_task = await tasks.aupdate(
        task_id=created_task.id, source="sdk", status=AgentExecutionStatus.Executing
    )
    assert updated_task.id == created_task.id
    assert updated_task.status == AgentExecutionStatus.Executing
    assert updated_task.source == "sdk"

    # stop task using tasks module
    stopped_task = await tasks.astop(task_id=updated_task.id)
    assert stopped_task.id == updated_task.id
    assert stopped_task.status == AgentExecutionStatus.Stopped

    # update using task instance
    updated_task.status = AgentExecutionStatus.Paused
    await updated_task.asave()
    assert updated_task.status == AgentExecutionStatus.Paused

    # stop task using task instance
    await updated_task.astop()
    assert updated_task.status == AgentExecutionStatus.Stopped


@pytest.mark.asyncio
async def test_create_task_with_events():
    tasks = Tasks()
    prompt = "what can you do"

    # Create task with events enabled
    created_task = await tasks.acreate(
        agent_id=XPANDER_AGENT_ID, prompt=prompt, events_streaming=True
    )

    assert isinstance(created_task, Task)
    assert created_task.events_streaming is True

    found_created_event = False

    async for event in created_task.aevents():
        print("Received:", event)

        # Ensure event is for this task
        assert event.task_id == created_task.id
        assert event.organization_id == created_task.organization_id

        if event.type == TaskUpdateEventType.TaskCreated:
            found_created_event = True
            break  # Test succeeds once we receive the 'created' event

    assert found_created_event, "Expected 'created' event not found in task stream"


@pytest.mark.asyncio
async def test_async_report_external_task():
    """Test reporting an external task through the Task class asynchronously."""
    task_id = str(uuid.uuid4())
    
    reported_task = await Task.areport_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Test external task input via Task class",
        result="Task completed successfully through Task.areport_external_task"
    )
    
    assert reported_task is not None
    assert isinstance(reported_task, Task)
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


@pytest.mark.asyncio
async def test_async_report_external_task_with_tokens():
    """Test reporting an external task with token usage."""
    from xpander_sdk.models.shared import Tokens
    
    task_id = str(uuid.uuid4())
    tokens = Tokens(
        completion_tokens=100,
        prompt_tokens=25,
        total_tokens=125
    )
    
    reported_task = await Task.areport_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Task with token tracking",
        llm_response={"content": "Response with token tracking", "model": "gpt-3.5-turbo"},
        tokens=tokens,
        is_success=True,
        result="Task completed with token usage tracked",
        duration=1.8,
        used_tools=["token_counter", "text_processor"]
    )
    
    assert reported_task is not None
    assert isinstance(reported_task, Task)
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


@pytest.mark.asyncio
async def test_async_report_external_task_failure():
    """Test reporting a failed external task."""
    task_id = str(uuid.uuid4())
    
    reported_task = await Task.areport_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Task that will fail",
        result="Task failed due to external error",
        is_success=False,
        duration=0.3
    )
    
    assert reported_task is not None
    assert isinstance(reported_task, Task)
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


def test_sync_report_external_task():
    """Test reporting an external task synchronously through the Task class."""
    task_id = str(uuid.uuid4())
    
    reported_task = Task.report_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Synchronous external task via Task class",
        result="Sync task completed successfully through Task.report_external_task",
        duration=2.1
    )
    
    assert reported_task is not None
    assert isinstance(reported_task, Task)
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


def test_sync_report_external_task_with_multiple_tools():
    """Test reporting an external task with multiple tools synchronously."""
    task_id = str(uuid.uuid4())
    
    reported_task = Task.report_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Task utilizing multiple external tools",
        result="Successfully completed task using multiple tools",
        duration=4.2,
        used_tools=["web_scraper", "data_analyzer", "report_generator", "email_notifier"]
    )
    
    assert reported_task is not None
    assert isinstance(reported_task, Task)
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')


def test_sync_report_external_task_with_llm_response():
    """Test reporting an external task with detailed LLM response."""
    task_id = str(uuid.uuid4())
    
    llm_response = {
        "content": "This is a detailed LLM response with structured data",
        "model": "gpt-4",
        "finish_reason": "stop",
        "usage": {
            "prompt_tokens": 45,
            "completion_tokens": 75,
            "total_tokens": 120
        }
    }
    
    reported_task = Task.report_external_task(
        agent_id=XPANDER_AGENT_ID,
        id=task_id,
        input="Task with comprehensive LLM response",
        llm_response=llm_response,
        result="Task completed with detailed LLM interaction",
        duration=3.5,
        is_success=True
    )
    
    assert reported_task is not None
    assert isinstance(reported_task, Task)
    assert reported_task.agent_id == XPANDER_AGENT_ID
    assert hasattr(reported_task, 'id')
    assert hasattr(reported_task, 'status')
