from typing import Any, List
from agents.tool import ToolContext as OpenAIAgentSDKToolContext, FunctionTool as OpenAIAgentSDKTool
import json
from xpander_sdk.modules.tools_repository.sub_modules.tool import Tool

def get_openai_agents_sdk_tools(agent: Any) -> List[OpenAIAgentSDKTool]:
    tools: List[OpenAIAgentSDKTool] = []
    agent_tools: List[Tool] = agent.tools.list
    for _tool in agent_tools:
        def make_tool(_tool_def: Tool):
            async def invoke(context: OpenAIAgentSDKToolContext, args: str):
                return await _tool_def.ainvoke(
                    task_id=agent.configuration.state.task.id
                        if agent.configuration.state.task
                        else None,
                    agent_id=agent.id,
                    agent_version=agent.version,
                    payload=json.loads(args),
                    configuration=_tool.configuration
                )
            return invoke
        
        tools.append(
            OpenAIAgentSDKTool(
                on_invoke_tool=make_tool(_tool),
                name=_tool.id,
                description=_tool.description,
                params_json_schema=_tool.parameters
            )
        )
    
    return tools