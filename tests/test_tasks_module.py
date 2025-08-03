import os
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
