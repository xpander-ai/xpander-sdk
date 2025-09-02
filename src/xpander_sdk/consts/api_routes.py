"""
API routes configuration for the xpander.ai SDK.

This module defines all API endpoint paths used by the xpander.ai SDK for
autonomous agent management, task operations, and knowledge base interactions.
"""

from enum import Enum


class APIRoute(str, Enum):
    """
    Enumeration of API endpoints for xpander.ai services.
    
    This class defines the paths for interacting with various APIs, including
    agents, tasks, and knowledge bases, standardizing route management across
the SDK.
    
    Attributes include paths for listing, retrieving, creating, updating,
and deleting resources.
    
    Example:
        >>> route = APIRoute.ListAgent
        >>> print(route)  # Outputs: /agents/list
    """
    
    # Agents Endpoints
    ListAgent = "/agents/list"
    GetAgent = "/agents/{agent_id}"
    SyncLocalTools = "/agents/{agent_id}/sync_local_tools"
    GetAgentConnectionString = "/agents/{agent_id}/db"
    InvokeTool = "/agents/{agent_id}/operations/{tool_id}"
    
    # Tasks Endpoints
    ListTasks = "/agent-execution/executions/history/{agent_id}"
    GetTask = "/agent-execution/{task_id}/status"
    TaskCrud = "/agent-execution/{agent_or_task_id}"
    UpdateTask = "/agent-execution/{task_id}/update"
    ReportExternalTask = "/agent-execution/{agent_id}/report_task"
    ReportExecutionMetrics = "/agents-metrics/{agent_id}/execution"
    
    # Knowledge Bases Endpoints
    ListKnowledgeBases = "/knowledge_bases"
    CreateKnowledgeBase = "/knowledge_bases/create"
    DeleteKnowledgeBase = "/knowledge_bases/{knowledge_base_id}/erase"
    ListKnowledgeBaseDocuments = "/knowledge_bases/{knowledge_base_id}/list"
    KnowledgeBaseDocumentsCrud = "/knowledge_bases/{knowledge_base_id}"
    GetKnowledgeBaseDetails = "/knowledge_bases/{knowledge_base_id}/details"

    def __str__(self) -> str:
        return str(self.value)

    def __repr__(self) -> str:
        return str(self.value)
