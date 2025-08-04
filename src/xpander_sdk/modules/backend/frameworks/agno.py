import asyncio
import shlex
from os import getenv
from typing import Any, Dict, List, Optional

from xpander_sdk.models.shared import OutputFormat
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.modules.tools_repository.utils.schemas import build_model_from_schema


async def build_agent_args(
    xpander_agent: Agent,
    task: Optional[Task] = None,
    override: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    model = _load_llm_model(xpander_agent, override)
    args: Dict[str, Any] = {}

    _configure_output(args, xpander_agent, task)
    _configure_session_storage(args, xpander_agent, task)
    _configure_user_memory(args, xpander_agent, task)
    await _attach_async_dependencies(args, xpander_agent, task, model)
    _configure_knowledge_bases(args, xpander_agent)
    _configure_additional_context(args, xpander_agent, task)

    args["tools"] = await _resolve_agent_tools(xpander_agent)

    args.update({
        "agent_id": xpander_agent.id,
        "model": model,
        "description": xpander_agent.instructions.description,
        "instructions": xpander_agent.instructions.instructions,
        "goal": xpander_agent.instructions.goal_str,
        "expected_output": task.expected_output if task and task.expected_output else xpander_agent.expected_output,
        "show_tool_calls": True,
        "add_datetime_to_instructions": True,
    })

    if override:
        args.update(override)

    return args


def _load_llm_model(agent: Agent, override: Optional[Dict[str, Any]]) -> Any:
    if override and "model" in override:
        return override["model"]

    provider = agent.model_provider.lower()

    if provider == "openai":
        from agno.models.openai import OpenAIChat
        return OpenAIChat(id=agent.model_name, api_key=getenv("AGENTS_OPENAI_API_KEY"))

    elif provider == "anthropic":
        from agno.models.anthropic import Claude
        return Claude(id=agent.model_name, api_key=getenv("ANTHROPIC_API_KEY"))

    raise NotImplementedError(f"Provider '{provider}' is not supported for agno agents.")


def _configure_output(args: Dict[str, Any], agent: Agent, task: Optional[Task]) -> None:
    if agent.output.use_json_mode:
        args["use_json_mode"] = True
        args["response_model"] = agent.output.output_schema
    elif agent.output.is_markdown:
        args["markdown"] = True

    if task and task.output_format != agent.output_format:
        if task.output_format == OutputFormat.Json:
            args["use_json_mode"] = True
            args["markdown"] = False
            args["response_model"] = build_model_from_schema("StructuredOutput", task.output_schema)
        elif task.output_format == OutputFormat.Markdown:
            args["markdown"] = True
        else:
            args["markdown"] = False


def _configure_session_storage(args: Dict[str, Any], agent: Agent, task: Optional[Task]) -> None:
    if not agent.agno_settings.session_storage:
        return

    args["add_history_to_messages"] = True
    args["session_id"] = task.id if task else None
    args["user_id"] = task.input.user.id if task and task.input and task.input.user else None

    if agent.agno_settings.session_summaries:
        args["enable_session_summaries"] = True
    if agent.agno_settings.num_history_runs:
        args["num_history_runs"] = agent.agno_settings.num_history_runs


def _configure_user_memory(args: Dict[str, Any], agent: Agent, task: Optional[Task]) -> None:
    user = task.input.user if task and task.input and task.input.user else None
    if agent.agno_settings.user_memories and user and user.id:
        args["enable_user_memories"] = True
        args["enable_agentic_memory"] = True
    
    if user: # add user details to the agent
        args["additional_context"] = f"User details: {user.model_dump_json()}"


async def _attach_async_dependencies(
    args: Dict[str, Any],
    agent: Agent,
    task: Optional[Task],
    model: Any
) -> None:
    awaitables = {}

    if agent.agno_settings.session_storage:
        awaitables["storage"] = agent.aget_storage()

    user = task.input.user if task and task.input and task.input.user else None
    if agent.agno_settings.user_memories and user and user.id:
        awaitables["memory"] = agent.aget_memory_handler(model=model)

    if awaitables:
        results = await asyncio.gather(*awaitables.values())
        for key, result in zip(awaitables.keys(), results):
            args[key] = result


def _configure_knowledge_bases(args: Dict[str, Any], agent: Agent) -> None:
    if agent.knowledge_bases:
        args["retriever"] = agent.knowledge_bases_retriever()
        args["search_knowledge"] = True


def _configure_additional_context(args: Dict[str, Any], agent: Agent, task: Optional[Task]) -> None:
    if task and task.additional_context:
        existing = args.get("additional_context", "")
        args["additional_context"] = f"{existing}\n{task.additional_context}" if existing else task.additional_context

    if agent.agno_settings.tool_call_limit:
        args["tool_call_limit"] = agent.agno_settings.tool_call_limit


async def _resolve_agent_tools(agent: Agent) -> List[Any]:
    if not agent.mcp_servers:
        return agent.tools.functions

    # Import MCP only if mcp_servers is present
    from agno.tools.mcp import (
        MCPTools,
        StdioServerParameters,
        SSEClientParams,
        StreamableHTTPClientParams,
    )

    mcp_tools: List[MCPTools] = []

    for mcp in agent.mcp_servers:
        if mcp.command:
            command_parts = shlex.split(mcp.command)
            mcp_tools.append(
                MCPTools(
                    server_params=StdioServerParameters(
                        command=command_parts[0],
                        args=command_parts[1:],
                        env=mcp.env_vars,
                    ),
                    include_tools=mcp.allowed_tools or None,
                    timeout_seconds=60,
                )
            )
        elif mcp.url:
            is_sse = ("mcp" in mcp.url and "xpander.ai" in mcp.url) or mcp.url.endswith("/sse")
            transport = "sse" if is_sse else "streamable-http"
            params_cls = SSEClientParams if is_sse else StreamableHTTPClientParams
            mcp_tools.append(
                MCPTools(
                    transport=transport,
                    server_params=params_cls(url=mcp.url, headers=mcp.headers),
                    include_tools=mcp.allowed_tools or None,
                )
            )

    return agent.tools.functions + await asyncio.gather(*[mcp.__aenter__() for mcp in mcp_tools])
