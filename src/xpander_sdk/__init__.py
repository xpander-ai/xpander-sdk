"""
xpander.ai SDK - Backend-as-a-Service for AI Agents.

This SDK provides comprehensive tools for building, deploying, and managing AI agents
with xpander.ai's Backend-as-a-Service infrastructure. It includes modules for agent
management, task execution, tools repository, knowledge bases, and event handling.

Main Components:
    - Agents: Create and manage AI agents
    - Tasks: Handle task execution and management
    - ToolsRepository: Manage agent tools and integrations
    - KnowledgeBases: Handle knowledge base operations
    - Events: Event-driven programming with decorators

For more information, visit: https://xpander.ai
"""

# Backend-related imports
from .modules.backend.backend_module import Backend

# Agent-related imports
from .modules.agents.agents_module import Agents, Agent, AgentsListItem

# Task-related imports
from .modules.tasks.tasks_module import Tasks, Task, TasksListItem, AgentExecutionStatus
from xpander_sdk.modules.events.decorators.on_task import on_task
from xpander_sdk.modules.events.decorators.on_boot import on_boot
from xpander_sdk.modules.events.decorators.on_shutdown import on_shutdown

# Tools and repository imports
from .modules.tools_repository.tools_repository_module import ToolsRepository, Tool
from .modules.tools_repository.models.tool_invocation_result import ToolInvocationResult
from .modules.tools_repository.utils.schemas import build_model_from_schema
from .models.user import User
from xpander_sdk.modules.tools_repository.decorators.register_tool import register_tool
from xpander_sdk.modules.tools_repository.models.mcp import (
    MCPServerDetails,
    MCPServerType,
    MCPServerAuthType,
)

# Knowledge base imports
from xpander_sdk.modules.knowledge_bases.knowledge_bases_module import (
    KnowledgeBase,
    KnowledgeBases,
)

# Configuration and shared models
from .models.configuration import Configuration
from .models.shared import OutputFormat, Tokens

__all__ = [
    # xpander.ai Backend
    "Backend",
    # Agent management
    "Agents",
    "Agent",
    "AgentsListItem",
    "AgentExecutionStatus",
    # Task management
    "Tasks",
    "Task",
    "TasksListItem",
    "on_task",
    "on_boot",
    "on_shutdown",
    # Tools and repository
    "ToolsRepository",
    "Tool",
    "ToolInvocationResult",
    "MCPServerDetails",
    "MCPServerType",
    "MCPServerAuthType",
    "register_tool",
    "build_model_from_schema",
    # Knowledge bases
    "KnowledgeBases",
    "KnowledgeBase",
    # Configuration and shared
    "Configuration",
    "OutputFormat",
    "User",
    "Tokens"
]
