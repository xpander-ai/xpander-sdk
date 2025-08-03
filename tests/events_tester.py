from pathlib import Path
from dotenv import load_dotenv

from xpander_sdk.models.shared import OutputFormat
from xpander_sdk.modules.events.decorators.on_task import on_task
from xpander_sdk.modules.tasks.models.task import AgentExecutionInput, LocalTaskTest
from xpander_sdk.modules.tasks.sub_modules.task import Task

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)

local_task = LocalTaskTest(
    input=AgentExecutionInput(text="what can you do?"),
    output_format=OutputFormat.Json,output_schema={"a":"B"}
)

# test with local task
@on_task(test_task=local_task)
async def handle_task(task: Task):
    task.result = "My result"
    return task