"""
Agno Framework Integration for Xpander SDK

This module provides seamless integration between xpander agents and the Agno framework.
"""

import asyncio
import shlex
from os import getenv
from typing import Any, List, Optional, TypedDict

from agno.models.anthropic import Claude as AnthropicClaude
from agno.models.openai import OpenAIChat
from agno.tools.mcp import (MCPTools, SSEClientParams, StdioServerParameters,
                            StreamableHTTPClientParams)

from ..models.configuration import Configuration


class AgnoBackendArgs(TypedDict, total=False):
    """Agno backend arguments dictionary."""
    model: Any
    tools: List[Any]
    description: str
    instructions: str
    goal: str
    expected_output: str
    use_json_mode: bool
    response_model: Any
    markdown: bool
    add_history_to_messages: bool
    enable_session_summaries: bool
    num_history_runs: int
    enable_user_memories: bool
    enable_agentic_memory: bool
    tool_call_limit: int
    retriever: Any
    search_knowledge: bool
    storage: Any
    memory: Any
    show_tool_calls: bool
    add_datetime_to_instructions: bool


class AgnoBackend:
    """Minimal adapter to add agno_backend_args to XPander Agent."""

    @staticmethod
    def load(
        agent_id: Optional[str] = None,
        configuration: Optional[Configuration] = None,
        version: Optional[int] = None,
    ):
        """Load xpander.ai agent with Agno backend args."""
        from ..modules.agents.sub_modules.agent import Agent

        agent = Agent.load(agent_id, configuration, version)
        # Bypass Pydantic validation to add the property
        object.__setattr__(agent, 'agno_backend_args',
                           AgnoBackend._get_agno_backend_args(agent))
        return agent

    @staticmethod
    async def aload(
        agent_id: Optional[str] = None,
        configuration: Optional[Configuration] = None,
        version: Optional[int] = None,
    ):
        """Async load xpander.ai agent with Agno backend args."""
        from ..modules.agents.sub_modules.agent import Agent

        agent = await Agent.aload(agent_id, configuration, version)
        # Bypass Pydantic validation to add the property
        object.__setattr__(agent, 'agno_backend_args',
                           AgnoBackend._get_agno_backend_args(agent))
        return agent

    @staticmethod
    def from_agent(agent):
        """Create extended agent from existing agent."""
        object.__setattr__(agent, 'agno_backend_args',
                           AgnoBackend._get_agno_backend_args(agent))
        return agent

    @staticmethod
    def _get_agno_backend_args(agent) -> AgnoBackendArgs:
        """Get agno backend arguments for Agent constructor with model already provided."""
        agno_args = {}

        # Model - get the agno model instance
        if agent.model_provider == 'anthropic':
            model_instance = AnthropicClaude(
                id=agent.model_name,
                api_key=getenv('ANTHROPIC_API_KEY')
            )
        else:
            model_instance = OpenAIChat(
                id=agent.model_name,
                api_key=getenv('OPENAI_API_KEY')
            )
        agno_args['model'] = model_instance

        # Tools configuration
        if hasattr(agent, 'tools') and agent.tools:
            agno_args['tools'] = agent.tools.functions

        # Prompts and instructions
        if hasattr(agent, 'instructions') and agent.instructions:
            if agent.instructions.description:
                agno_args['description'] = agent.instructions.description
            if agent.instructions.instructions:
                agno_args['instructions'] = agent.instructions.instructions
            if agent.instructions.goal_str:
                agno_args['goal'] = agent.instructions.goal_str

        if hasattr(agent, 'expected_output') and agent.expected_output:
            agno_args['expected_output'] = agent.expected_output

        # Output configuration
        if hasattr(agent, 'output'):
            if agent.output.use_json_mode:
                agno_args['use_json_mode'] = True
                agno_args['response_model'] = agent.output.output_schema
            elif agent.output.is_markdown:
                agno_args['markdown'] = agent.output.is_markdown

        # Agent settings
        if hasattr(agent, 'agno_settings'):
            # Session storage
            if agent.agno_settings.session_storage:
                agno_args['add_history_to_messages'] = True
                if agent.agno_settings.session_summaries:
                    agno_args['enable_session_summaries'] = agent.agno_settings.session_summaries
                if agent.agno_settings.num_history_runs:
                    agno_args['num_history_runs'] = agent.agno_settings.num_history_runs

            # User memories
            if agent.agno_settings.user_memories:
                agno_args['enable_user_memories'] = True
                agno_args['enable_agentic_memory'] = True

            # Tool call limit
            if agent.agno_settings.tool_call_limit:
                agno_args['tool_call_limit'] = agent.agno_settings.tool_call_limit

        # Knowledge bases
        if hasattr(agent, 'knowledge_bases') and len(agent.knowledge_bases) != 0:
            agno_args['retriever'] = agent.knowledge_bases_retriever()
            agno_args['search_knowledge'] = True

        # Session storage (sync)
        if hasattr(agent, 'agno_settings') and agent.agno_settings.session_storage:
            try:
                from xpander_sdk.utils.event_loop import run_sync
                agno_args['storage'] = run_sync(agent.aget_storage())
            except:
                pass  # Skip if storage not available

        # User memories (sync)
        user_memories_enabled = (
            hasattr(agent, 'agno_settings') and
            agent.agno_settings.user_memories
        )
        if user_memories_enabled:
            try:
                from xpander_sdk.utils.event_loop import run_sync
                agno_args['memory'] = run_sync(
                    agent.aget_memory_handler(model=model_instance))
            except:
                pass  # Skip if memory not available

        # MCP tools (sync initialization)
        if hasattr(agent, 'mcp_servers') and agent.mcp_servers:
            try:
                mcp_tools = AgnoBackend._configure_mcp_tools_sync(agent)
                if hasattr(agent, 'tools') and agent.tools:
                    agno_args['tools'] = agent.tools.functions + mcp_tools
                else:
                    agno_args['tools'] = mcp_tools
            except:
                pass  # Skip if MCP tools not available

        # Standard Agent configuration
        agno_args['show_tool_calls'] = True
        agno_args['add_datetime_to_instructions'] = True

        return agno_args

    @staticmethod
    def _configure_mcp_tools_sync(agent):
        """Configure MCP tools synchronously."""
        from xpander_sdk.utils.event_loop import run_sync
        return run_sync(AgnoBackend._configure_mcp_tools_async(agent))

    @staticmethod
    async def _configure_mcp_tools_async(agent):
        """Configure MCP tools from xpander backend MCP servers."""
        mcps: List[MCPTools] = []

        for mcp in agent.mcp_servers:
            if mcp.command:
                command_parts = shlex.split(mcp.command)
                mcps.append(
                    MCPTools(
                        server_params=StdioServerParameters(
                            command=command_parts[0],
                            args=command_parts[1:],
                            env=mcp.env_vars
                        ),
                        include_tools=mcp.allowed_tools if mcp.allowed_tools and len(
                            mcp.allowed_tools) != 0 else None,
                        timeout_seconds=60
                    )
                )
            elif mcp.url:
                is_sse = ('mcp' in mcp.url and 'xpander.ai' in mcp.url) or mcp.url.endswith(
                    '/sse')
                if is_sse:
                    mcps.append(
                        MCPTools(
                            transport='sse',
                            server_params=SSEClientParams(
                                url=mcp.url, headers=mcp.headers),
                            include_tools=mcp.allowed_tools if mcp.allowed_tools and len(
                                mcp.allowed_tools) != 0 else None
                        )
                    )
                else:
                    mcps.append(
                        MCPTools(
                            transport='streamable-http',
                            server_params=StreamableHTTPClientParams(
                                url=mcp.url, headers=mcp.headers),
                            include_tools=mcp.allowed_tools if mcp.allowed_tools and len(
                                mcp.allowed_tools) != 0 else None
                        )
                    )

        # Initialize MCP tools
        mcp_tools = await asyncio.gather(*[mcp.__aenter__() for mcp in mcps])
        return mcp_tools
