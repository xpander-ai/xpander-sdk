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

from xpander_sdk.modules.events.decorators.on_task import on_task
# Knowledge base imports
from xpander_sdk.modules.knowledge_bases.knowledge_bases_module import (
    KnowledgeBase, KnowledgeBases)
from xpander_sdk.modules.tools_repository.decorators.register_tool import \
    register_tool
from xpander_sdk.modules.tools_repository.models.mcp import (MCPServerAuthType,
                                                             MCPServerDetails,
                                                             MCPServerType)

# Adapter integrations - import module, not class
from . import adapters
# Configuration and shared models
from .models.configuration import Configuration
from .models.shared import OutputFormat
from .models.user import User
# Agent-related imports
from .modules.agents.agents_module import Agent, Agents, AgentsListItem
# Task-related imports
from .modules.tasks.tasks_module import (AgentExecutionStatus, Task, Tasks,
                                         TasksListItem)
from .modules.tools_repository.models.tool_invocation_result import \
    ToolInvocationResult
# Tools and repository imports
from .modules.tools_repository.tools_repository_module import (Tool,
                                                               ToolsRepository)
from .modules.tools_repository.utils.schemas import build_model_from_schema

__all__ = [
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
    # Adapter integrations
    "adapters"
]
