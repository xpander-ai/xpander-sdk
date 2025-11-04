import asyncio
import shlex
from os import getenv
from typing import Any, Callable, Dict, List, Optional

from loguru import logger

from xpander_sdk import Configuration
from xpander_sdk.models.shared import OutputFormat
from xpander_sdk.modules.agents.agents_module import Agents
from xpander_sdk.modules.agents.models.agent import AgentGraphItemType
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.modules.tools_repository.models.mcp import (
    MCPServerTransport,
    MCPServerType,
)
from xpander_sdk.modules.tools_repository.sub_modules.tool import Tool
from xpander_sdk.modules.tools_repository.utils.schemas import build_model_from_schema
from agno.agent import Agent as AgnoAgent
from agno.team import Team as AgnoTeam
from agno.guardrails import PIIDetectionGuardrail
from agno.guardrails import PromptInjectionGuardrail
from agno.guardrails import OpenAIModerationGuardrail

async def build_agent_args(
    xpander_agent: Agent,
    task: Optional[Task] = None,
    override: Optional[Dict[str, Any]] = None,
    tools: Optional[List[Callable]] = None,
) -> Dict[str, Any]:
    model = _load_llm_model(agent=xpander_agent, override=override)
    args: Dict[str, Any] = {
        "id": xpander_agent.id,
    }

    _configure_output(args=args, agent=xpander_agent, task=task)
    _configure_session_storage(args=args, agent=xpander_agent, task=task)
    _configure_user_memory(args=args, agent=xpander_agent, task=task)
    await _attach_async_dependencies(
        args=args, agent=xpander_agent, task=task, model=model
    )
    _configure_knowledge_bases(args=args, agent=xpander_agent)
    _configure_additional_context(args=args, agent=xpander_agent, task=task)
    # Configure pre-hooks (guardrails, etc.)
    _configure_pre_hooks(args=args, agent=xpander_agent)

    args["tools"] = await _resolve_agent_tools(agent=xpander_agent, task=task)

    if tools and len(tools) != 0:
        args["tools"].extend(tools)

    # team
    if xpander_agent.is_a_team:
        sub_agents = xpander_agent.graph.sub_agents

        # load sub agents
        sub_agents = await asyncio.gather(
            *[
                Agents(
                    configuration=Configuration(
                        api_key=xpander_agent.configuration.api_key,
                        organization_id=xpander_agent.configuration.organization_id,
                        base_url=xpander_agent.configuration.base_url
                    )
                ).aget(agent_id=sub_agent_id)
                for sub_agent_id in sub_agents
            ]
        )
        if sub_agents and len(sub_agents):
            base_state = xpander_agent.configuration.state.model_copy()
            for sub_agent in sub_agents:
                sub_agent.configuration.state.task = base_state.task
        # convert to members
        members = await asyncio.gather(
            *[
                build_agent_args(xpander_agent=sub_agent, override=override, task=task)
                for sub_agent in sub_agents
            ]
        )

        args.update(
            {
                "members": [
                    AgnoAgent(**member) if "id" in member else AgnoTeam(**member)
                    for member in members
                ],
                "add_member_tools_to_context": True,
                "share_member_interactions": True,
                "show_members_responses": True,
            }
        )

    args.update(
        {
            "name": xpander_agent.name,
            "model": model,
            "description": xpander_agent.instructions.description,
            "instructions": xpander_agent.instructions.instructions,
            "expected_output": (
                task.expected_output
                if task and task.expected_output
                else xpander_agent.expected_output
            ),
            "add_datetime_to_context": True,
        }
    )
    
    if xpander_agent.is_a_team and xpander_agent.expected_output and len(xpander_agent.expected_output) != 0:
        args["instructions"] += f"""\n
            <expected_output>
            {xpander_agent.expected_output}
            </expected_output>
        """

    if override:
        args.update(override)

    # append tools hooks
    async def on_tool_call_hook(
        function_name: str, function_call: Callable, arguments: Dict[str, Any]
    ):
        # preflight and monitoring + metrics
        try:
            matched_tool = (
                (
                    xpander_agent.tools.get_tool_by_id(tool_id=function_name)
                    or xpander_agent.tools.get_tool_by_name(tool_name=function_name)
                )
                if xpander_agent.tools and len(xpander_agent.tools.list) != 0
                else None
            )
            if not matched_tool and task:  # agent / mcp tool
                tool_instance = Tool(
                    configuration=xpander_agent.configuration,
                    id=function_name,
                    name=function_name,
                    method="GET",
                    path=f"/tools/{function_name}",
                    should_add_to_graph=False,
                    is_local=True,
                    is_synced=True,
                    description=function_name,
                )
                await tool_instance.agraph_preflight_check(
                    agent_id=xpander_agent.id,
                    configuration=tool_instance.configuration,
                    task_id=task.id,
                )
        except Exception:
            pass

        # Call the function
        if asyncio.iscoroutinefunction(function_call):
            result = await function_call(**arguments)
        else:
            result = function_call(**arguments)

        # Return the result
        return result

    if not "tool_hooks" in args:
        args["tool_hooks"] = []

    # disable hooks for NeMo due to issue with tool_hooks and NeMo
    if xpander_agent.using_nemo == False:
        args["tool_hooks"].append(on_tool_call_hook)

    # fix gpt-5 temp
    if args["model"] and args["model"].id and args["model"].id.startswith("gpt-5"):
        del args["model"].temperature
    
    return args


def _load_llm_model(agent: Agent, override: Optional[Dict[str, Any]]) -> Any:
    """
    Load and configure the appropriate LLM model based on the agent's provider configuration.

    This function supports multiple LLM providers including OpenAI, NVIDIA NIM, and Anthropic.
    It handles API key resolution with proper precedence based on the deployment environment
    (xpander.ai Cloud vs local deployment).

    Args:
        agent (Agent): The agent instance containing model configuration.
        override (Optional[Dict[str, Any]]): Optional override parameters that can
            include a pre-configured "model" to bypass the loading logic.

    Returns:
        Any: A configured LLM model instance (OpenAIChat, Nvidia, or Claude).

    Raises:
        NotImplementedError: If the specified provider is not supported.

    Supported Providers:
        - "openai": Uses OpenAIChat with fallback API key resolution
        - "nim": Uses NVIDIA NIM models via Nvidia class
        - "anthropic": Uses Claude models via Anthropic integration

    API Key Resolution Logic:
        - xpander.ai Cloud: Custom credentials take precedence, fallback to environment
        - Local deployment: Environment variables take precedence, fallback to custom
    """
    if override and "model" in override:
        return override["model"]

    provider = agent.model_provider.lower()

    is_xpander_cloud = getenv("IS_XPANDER_CLOUD", "false") == "true"
    has_custom_llm_key = (
        True if agent.llm_credentials and agent.llm_credentials.value else False
    )

    def get_llm_key(env_var_name: str) -> Optional[str]:
        """
        Resolve API key based on deployment environment and availability.

        Args:
            env_var_name (str): Name of the environment variable containing the API key.

        Returns:
            Optional[str]: The resolved API key or None if not available.
        """
        env_llm_key = getenv(env_var_name)

        # If no custom key available, use environment variable
        if not has_custom_llm_key:
            return env_llm_key

        # xpander.ai Cloud: prioritize custom credentials, fallback to environment
        if is_xpander_cloud:
            return agent.llm_credentials.value or env_llm_key
        else:
            # Local deployment: prioritize environment, fallback to custom
            return env_llm_key or agent.llm_credentials.value

    llm_args = {}
    if agent.llm_api_base and len(agent.llm_api_base) != 0:
        llm_args["base_url"] = agent.llm_api_base
    
    # OpenAI Provider - supports GPT models with dual API key fallback
    if provider == "openai":
        from agno.models.openai import OpenAIChat

        return OpenAIChat(
            id=agent.model_name,
            # Try xpander.ai-specific key first, fallback to standard OpenAI key
            api_key=get_llm_key("AGENTS_OPENAI_API_KEY")
            or get_llm_key("OPENAI_API_KEY"),
            temperature=0.0,
            **llm_args
        )
    # Fireworks AI Provider
    elif provider == "fireworks":
        from agno.models.fireworks import Fireworks

        return Fireworks(
            id=agent.model_name,
            # Try xpander.ai-specific key first, fallback to standard OpenAI key
            api_key=get_llm_key("FIREWORKS_API_KEY"),
            **llm_args
        )
    # NVIDIA NIM Provider - supports NVIDIA's inference microservices
    elif provider == "nim":
        from agno.models.nvidia import Nvidia
        
        return Nvidia(
            id=agent.model_name,
            api_key=get_llm_key("NVIDIA_API_KEY"),
            temperature=0.0,
            **llm_args
        )

    # Anthropic Provider - supports Claude models
    elif provider == "anthropic":
        from agno.models.anthropic import Claude

        return Claude(
            id=agent.model_name,
            api_key=get_llm_key("ANTHROPIC_API_KEY"),
            temperature=0.0,
        )

    raise NotImplementedError(
        f"Provider '{provider}' is not supported for agno agents."
    )


def _configure_output(args: Dict[str, Any], agent: Agent, task: Optional[Task]) -> None:
    if agent.output.use_json_mode:
        args["use_json_mode"] = True
        args["output_schema"] = agent.output.output_schema
    elif agent.output.is_markdown:
        args["markdown"] = True

    if task and task.output_format != agent.output_format:
        if task.output_format == OutputFormat.Json:
            args["use_json_mode"] = True
            args["markdown"] = False
            args["output_schema"] = build_model_from_schema(
                "StructuredOutput", task.output_schema
            )
        elif task.output_format == OutputFormat.Markdown:
            args["markdown"] = True
        else:
            args["markdown"] = False


def _configure_session_storage(
    args: Dict[str, Any], agent: Agent, task: Optional[Task]
) -> None:
    if not agent.agno_settings.session_storage:
        return

    args["add_history_to_context"] = True
    args["session_id"] = task.id if task else None
    args["user_id"] = (
        task.input.user.id if task and task.input and task.input.user else None
    )

    if agent.agno_settings.session_summaries:
        args["enable_session_summaries"] = True
    if agent.agno_settings.num_history_runs:
        args["num_history_runs"] = agent.agno_settings.num_history_runs
    if agent.agno_settings.max_tool_calls_from_history and agent.agno_settings.max_tool_calls_from_history >= 1:
        args["max_tool_calls_from_history"] = agent.agno_settings.max_tool_calls_from_history


def _configure_user_memory(
    args: Dict[str, Any], agent: Agent, task: Optional[Task]
) -> None:
    user = task.input.user if task and task.input and task.input.user else None
    if agent.agno_settings.user_memories and user and user.id:
        args["enable_user_memories"] = True
        args["enable_agentic_memory"] = True

    if user:  # add user details to the agent
        args["additional_context"] = f"User details: {user.model_dump_json()}"


async def _attach_async_dependencies(
    args: Dict[str, Any], agent: Agent, task: Optional[Task], model: Any
) -> None:
    user = task.input.user if task and task.input and task.input.user else None
    should_use_users_memory = True if agent.agno_settings.user_memories and user and user.id else False
    if agent.agno_settings.session_storage or should_use_users_memory:
        args["db"] = await agent.aget_db()

def _configure_knowledge_bases(args: Dict[str, Any], agent: Agent) -> None:
    if agent.knowledge_bases:
        args["knowledge_retriever"] = agent.knowledge_bases_retriever()
        args["search_knowledge"] = True


def _configure_additional_context(
    args: Dict[str, Any], agent: Agent, task: Optional[Task]
) -> None:
    if task and task.additional_context:
        existing = args.get("additional_context", "")
        args["additional_context"] = (
            f"{existing}\n{task.additional_context}"
            if existing
            else task.additional_context
        )

    if agent.agno_settings.tool_call_limit:
        args["tool_call_limit"] = agent.agno_settings.tool_call_limit


def _configure_pre_hooks(args: Dict[str, Any], agent: Agent) -> None:
    """
    Configure pre-hooks (guardrails) for the agent based on settings.
    
    Pre-hooks are executed before the agent processes input. This includes
    guardrails like PII detection, prompt injection detection, and content
    moderation that validate or transform input.
    
    Args:
        args (Dict[str, Any]): Agent configuration arguments to be updated.
        agent (Agent): The agent instance containing pre-hook settings.
    """
    # Add PII detection guardrail with optional masking
    if agent.agno_settings.pii_detection_enabled:
        if "pre_hooks" not in args:
            args["pre_hooks"] = []
        
        pii_guardrail = PIIDetectionGuardrail(
            mask_pii=agent.agno_settings.pii_detection_mask
        )
        args["pre_hooks"].append(pii_guardrail)
    
    # Add prompt injection detection guardrail
    if agent.agno_settings.prompt_injection_detection_enabled:
        if "pre_hooks" not in args:
            args["pre_hooks"] = []
        
        prompt_injection_guardrail = PromptInjectionGuardrail()
        args["pre_hooks"].append(prompt_injection_guardrail)
    
    # Add OpenAI moderation guardrail
    if agent.agno_settings.openai_moderation_enabled:
        if "pre_hooks" not in args:
            args["pre_hooks"] = []
        
        moderation_kwargs = {}
        if agent.agno_settings.openai_moderation_categories:
            moderation_kwargs["raise_for_categories"] = agent.agno_settings.openai_moderation_categories
        
        openai_moderation_guardrail = OpenAIModerationGuardrail(**moderation_kwargs)
        args["pre_hooks"].append(openai_moderation_guardrail)


async def _resolve_agent_tools(agent: Agent, task: Optional[Task] = None) -> List[Any]:
    mcp_servers = agent.mcp_servers
    
    # combine task mcps and agent mcps
    if task and task.mcp_servers:
        mcp_servers.extend(task.mcp_servers)
        
    if not mcp_servers:
        return agent.tools.functions

    # Import MCP only if mcp_servers is present
    from agno.tools.mcp import (
        MCPTools,
        StdioServerParameters,
        SSEClientParams,
        StreamableHTTPClientParams,
    )

    mcp_tools: List[MCPTools] = []
    is_xpander_cloud = getenv("IS_XPANDER_CLOUD", "false") == "true"

    for mcp in mcp_servers:
        transport = mcp.transport.value.lower()
        if mcp.type == MCPServerType.Local:

            # protection for serverless xpander
            is_aws_mcp = (
                True if mcp.command and "aws-api-mcp-server" in mcp.command else False
            )
            if is_aws_mcp and is_xpander_cloud:
                logger.warning(
                    f"skipping aws mcp on agent {agent.id} due to xpander serverless"
                )
                continue

            command_parts = shlex.split(mcp.command)
            mcp_tools.append(
                MCPTools(
                    transport=transport,
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
            params_cls = (
                SSEClientParams
                if mcp.transport == MCPServerTransport.SSE
                else StreamableHTTPClientParams
            )
            if mcp.api_key:
                if not mcp.headers:
                    mcp.headers = {}
                mcp.headers["Authorization"] = f"Bearer {mcp.api_key}"
            mcp_tools.append(
                MCPTools(
                    transport=transport,
                    server_params=params_cls(url=mcp.url, headers=mcp.headers),
                    include_tools=mcp.allowed_tools or None,
                )
            )

    return agent.tools.functions + await asyncio.gather(
        *[mcp.__aenter__() for mcp in mcp_tools]
    )
