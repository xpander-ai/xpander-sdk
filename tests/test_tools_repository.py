import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel
import pytest

from xpander_sdk import Agents, Agent
from xpander_sdk.modules.tools_repository.decorators.register_tool import register_tool
from xpander_sdk.modules.tools_repository.tools_repository_module import ToolsRepository

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)

XPANDER_AGENT_ID = os.getenv("XPANDER_AGENT_ID")
XPANDER_TASK_ID = os.getenv("XPANDER_TASK_ID")


@pytest.mark.asyncio
async def test_invoke_remote_tool():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    assert isinstance(agent.tools, ToolsRepository)

    tool = agent.tools.get_tool_by_id(
        tool_id="XpanderEmailServiceSendEmailWithHtmlOrTextContent"
    )
    assert tool is not None

    payload = {
        "body_params": {
            "subject": "Test email",
            "body_html": "Hello world",
            "to": ["moriel@xpander.ai"],
        },
        "path_params": {},
        "query_params": {},
    }
    tool_invocation_result = await tool.ainvoke(
        agent_id=XPANDER_AGENT_ID, payload=payload
    )

    assert tool_invocation_result.is_success == True


@pytest.mark.asyncio
async def test_local_tool():

    @register_tool
    async def greet(name: str, age: int):
        return f"hello {name} ({age})"

    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    assert isinstance(agent.tools, ToolsRepository)

    tool = agent.tools.get_tool_by_id(tool_id="greet")

    assert tool is not None

    name = "xpander.ai"
    age = 2
    invocation_result = await tool.ainvoke(
        agent_id=XPANDER_AGENT_ID, payload={"name": name, "age": age}
    )

    assert invocation_result.is_success == True
    assert invocation_result.result == await greet(name=name, age=age)


@pytest.mark.asyncio
async def test_local_tool_with_pydantic_model():

    class Formula(BaseModel):
        a: int
        b: int

    @register_tool
    async def add(formula: Formula):
        return formula.a + formula.b

    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    assert isinstance(agent.tools, ToolsRepository)

    tool = agent.tools.get_tool_by_id(tool_id="add")

    assert tool is not None

    a = 2
    b = 5
    invocation_result = await tool.ainvoke(
        agent_id=XPANDER_AGENT_ID, payload={"formula": {"a": a, "b": b}}
    )

    assert invocation_result.is_success == True
    assert invocation_result.result == await add(formula=Formula(a=a, b=b))


@pytest.mark.asyncio
async def test_invoke_remote_tool_by_agent_instance():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    assert isinstance(agent.tools, ToolsRepository)

    tool = agent.tools.get_tool_by_id(
        tool_id="XpanderEmailServiceSendEmailWithHtmlOrTextContent"
    )
    assert tool is not None

    payload = {
        "body_params": {
            "subject": "Test email",
            "body_html": "Hello world",
            "to": ["moriel@xpander.ai"],
        },
        "path_params": {},
        "query_params": {},
    }
    tool_invocation_result = await agent.ainvoke_tool(tool=tool, payload=payload)

    assert tool_invocation_result.is_success == True


@pytest.mark.asyncio
async def test_local_tool_synced_to_ags():

    @register_tool(add_to_graph=True)
    async def get_weather(city_name: str):
        return f"The weather in {city_name} is slightly cold today."

    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    assert isinstance(agent.tools, ToolsRepository)

    tool = agent.tools.get_tool_by_id(tool_id="get_weather")

    assert tool is not None

    # sleep, let's wait 3 seconds for the update to apply in the background
    await asyncio.sleep(3)

    # reload the agent
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    # ensure its part of the graph
    assert agent.graph.get_graph_item(attr="item_id", value=tool.id) is not None

    city_name = "New York"
    invocation_result = await tool.ainvoke(
        agent_id=XPANDER_AGENT_ID, payload={"city_name": city_name}
    )

    assert invocation_result.is_success == True
    assert invocation_result.result == await get_weather(city_name=city_name)


@pytest.mark.asyncio
async def test_return_list_of_functions():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    assert isinstance(agent.tools, ToolsRepository)

    assert isinstance(agent.tools.functions, list)
    assert len(agent.tools.functions) != 0


@pytest.mark.asyncio
async def test_return_list_of_functions_with_local_tools():

    @register_tool
    async def get_weather(city_name: str):
        return f"The weather in {city_name} is slightly cold today."

    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    assert isinstance(agent.tools, ToolsRepository)

    assert isinstance(agent.tools.functions, list)
    assert len(agent.tools.functions) != 0
