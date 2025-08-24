import asyncio
from pathlib import Path
from dotenv import load_dotenv

from xpander_sdk.models.shared import OutputFormat
from xpander_sdk.modules.agents.agents_module import Agents
from xpander_sdk.modules.events.decorators.on_boot import on_boot
from xpander_sdk.modules.events.decorators.on_shutdown import on_shutdown
from xpander_sdk.modules.events.decorators.on_task import on_task
from xpander_sdk.modules.tasks.models.task import AgentExecutionInput, LocalTaskTest
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.modules.tools_repository.decorators.register_tool import register_tool

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)

local_task = LocalTaskTest(
    input=AgentExecutionInput(text="greet moriel (32) using a tool"),
    output_format=OutputFormat.Json,output_schema={"a":"B"}
)


@register_tool
async def greet(name: str, age: int):
    return f"hello {name} ({age})"

@on_boot
async def handle_boot():
    print("on boot!")
    await asyncio.sleep(3)

@on_shutdown
async def handle_shutdown():
    print("bye bye")

# test with local task
@on_task(test_task=local_task)
async def handle_task(task: Task):
    
    agents = Agents()
    agent = await agents.aget(agent_id=task.agent_id)
    
    tool = agent.tools.get_tool_by_id(tool_id="greet")
    
    invocation_result = await agent.ainvoke_tool(tool=tool,payload={"name": "Moriel", "age": 32},task_id=task.id)
    
    
    task.result = invocation_result.result
    
    return task