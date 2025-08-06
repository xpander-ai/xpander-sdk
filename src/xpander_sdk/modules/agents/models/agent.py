"""
Agent models and configuration classes for the xpander.ai SDK.

This module contains all data models and enums related to agent creation,
configuration, and management within the xpander.ai Backend-as-a-Service platform.
"""

from dataclasses import dataclass
from enum import Enum
from typing import Dict, List, Literal, Optional, Type
from pydantic import BaseModel, computed_field

from xpander_sdk.models.shared import OutputFormat, XPanderSharedModel
from xpander_sdk.modules.tools_repository.models.mcp import MCPServerDetails


class AgentDeploymentProvider(str, Enum):
    """
    Enumeration of supported deployment providers for agents.
    
    Values:
        XPander: Deploy on xpander.ai's managed infrastructure.
        Worker: Deploy on worker nodes.
        GpuCloud: Deploy on GPU cloud infrastructure.
        K8s: Deploy on Kubernetes clusters.
    """
    
    XPander = "xpander"
    Worker = "worker"
    GpuCloud = "gpuCloud"
    K8s = "k8s"


class AgentStatus(str, Enum):
    """
    Enumeration of possible agent statuses.

    Values:
        DRAFT: Agent is in a draft state and not yet active.
        ACTIVE: Agent is active and operational, ready to handle tasks.
        INACTIVE: Agent is inactive and not operational.
    """

    DRAFT = "DRAFT"
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"


class AgentInstructions(BaseModel):
    """
    Model for agent instructions and configuration.
    
    This model defines the instructions and goals that guide an agent's behavior,
    including role definitions, goals, and general guidance.
    
    Attributes:
        role (List[str]): List of role-specific instructions for the agent.
        goal (List[str]): List of goals the agent should achieve.
        general (str): General instructions or description for the agent.
    """
    
    role: List[str] = []
    goal: List[str] = []
    general: str = ""
    
    @computed_field
    @property
    def description(self) -> str:
        """
        Get the general description of the agent.
        
        Returns:
            str: The general instructions/description.
        """
        return self.general
    
    @computed_field
    @property
    def instructions(self) -> List[str]:
        """
        Get the role-specific instructions for the agent.
        
        Returns:
            List[str]: List of role instructions.
        """
        return self.role

    @computed_field
    @property
    def goal_str(self) -> str:
        """
        Get goals as a newline-separated string.
        
        Returns:
            str: Goals joined with newlines, or empty string if no goals.
        """
        return "\n".join(self.goal) if self.goal and isinstance(self.goal, list) else ""


class SourceNodeType(str, Enum):
    """
    Enumeration of source node types for agent graphs.
    
    Values:
        WORKBENCH: Workbench-based source node.
        SDK: SDK-based source node.
        TASK: Task-based source node.
        ASSISTANT: Assistant-based source node.
        WEBHOOK: Webhook-triggered source node.
        MCP: Model Context Protocol source node.
        A2A: Agent-to-Agent communication source node.
    """
    
    WORKBENCH = "workbench"
    SDK = "sdk"
    TASK = "task"
    ASSISTANT = "assistant"
    WEBHOOK = "webhook"
    MCP = "mcp"
    A2A = "a2a"


class AgentSourceNode(BaseModel):
    """
    Model for agent source nodes in the execution graph.
    
    Attributes:
        id (Optional[str]): Unique identifier for the source node.
        type (SourceNodeType): Type of the source node.
        targets (Optional[List[str]]): List of target node IDs.
        metadata (Optional[Dict]): Additional metadata for the source node.
    """
    
    id: Optional[str] = None
    type: SourceNodeType
    targets: Optional[list[str]] = None
    metadata: Optional[Dict] = {}


class AgentAccessScope(str, Enum):
    """
    Enumeration of agent access scopes.
    
    Values:
        Personal: Agent is accessible only to the creator.
        Organizational: Agent is accessible to the entire organization.
    """
    
    Personal = "personal"
    Organizational = "organizational"


class AgentGraphItemType(str, Enum):
    """
    Enumeration of agent graph item types.
    
    Values:
        SOURCE_NODE: Entry point for agent execution.
        AGENT: Standard agent node.
        TOOL: Tool or function node.
        HUMAN_IN_THE_LOOP: Human approval/interaction node.
        CUSTOM_AGENT: Custom agent implementation.
        STORAGE: Data storage node.
        CODING_AGENT: Specialized coding agent.
        MCP: Model Context Protocol node.
    """
    
    SOURCE_NODE = "source_node"
    AGENT = "agent"
    TOOL = "tool"
    HUMAN_IN_THE_LOOP = "human_in_the_loop"
    CUSTOM_AGENT = "custom_agent"
    STORAGE = "storage"
    CODING_AGENT = "coding_agent"
    MCP = "mcp"


class AgentGraphItemSubType(str, Enum):
    """
    Enumeration of agent graph item subtypes.
    
    Values:
        SDK: SDK-based implementation.
        TASK: Task-based implementation.
        ASSISTANT: Assistant-based implementation.
        WEBHOOK: Webhook-triggered implementation.
        OPERATION: Operation-based tool.
        CUSTOM_FUNCTION: Custom function tool.
        LOCAL_TOOL: Local tool implementation.
    """
    
    # Source node subtypes
    SDK = "sdk"
    TASK = "task"
    ASSISTANT = "assistant"
    WEBHOOK = "webhook"
    
    # Tool subtypes
    OPERATION = "operation"
    CUSTOM_FUNCTION = "custom_function"
    LOCAL_TOOL = "local_tool"


class AgentGraphItemAdvancedFilteringOption(BaseModel):
    """
    Model for advanced filtering options in agent graph items.
    
    Attributes:
        returnables (Optional[List[str]]): List of returnable fields.
        searchables (Optional[List[str]]): List of searchable fields.
        globally_enabled (Optional[bool]): Whether filtering is globally enabled.
    """
    
    returnables: Optional[List[str]] = None
    searchables: Optional[List[str]] = None
    globally_enabled: Optional[bool] = False


class AgentGraphItemSchema(BaseModel):
    """
    Model for defining input/output schemas for agent graph items.
    
    Attributes:
        input (Optional[dict]): Input schema definition.
        output (Optional[dict]): Output schema definition.
    """
    
    input: Optional[dict] = None
    output: Optional[dict] = None


class AgentHITLType(str, Enum):
    """
    Enumeration of Human-in-the-Loop integration types.
    
    Values:
        SLACK: Slack integration for human approval.
    """
    
    SLACK = "slack"


class AgentGraphItemHITLSettings(BaseModel):
    """
    Model for Human-in-the-Loop settings in agent graph items.
    
    Attributes:
        title (Optional[str]): Title for the HITL request.
        description (Optional[str]): Description of what requires approval.
        recipients (Optional[List[str]]): List of recipient IDs for approval requests.
        hitl_type (Optional[AgentHITLType]): Type of HITL integration.
        slack_app (Optional[str]): Slack app identifier for notifications.
        should_approve_with_current_user (Optional[bool]): Whether to auto-approve with current user.
    """
    
    title: Optional[str] = None
    description: Optional[str] = None
    recipients: Optional[List[str]] = None
    hitl_type: Optional[AgentHITLType] = None
    slack_app: Optional[str] = None
    should_approve_with_current_user: Optional[bool] = True


class AgentGraphItemA2ASettings(BaseModel):
    """
    Model for Agent-to-Agent communication settings.
    
    Attributes:
        url (Optional[str]): URL endpoint for A2A communication.
    """
    
    url: Optional[str] = None


class AgentGraphItemCodingAgentSettings(BaseModel):
    """
    Model for coding agent specific settings.
    
    Attributes:
        type (Optional[Literal["codex"]]): Type of coding agent, defaults to "codex".
    """
    
    type: Optional[Literal["codex"]] = "codex"


class AgentGraphItemSettings(BaseModel):
    """
    Comprehensive settings model for agent graph items.
    
    This model consolidates all possible settings for different types of
    agent graph items, including instructions, schemas, and specialized configurations.
    
    Attributes:
        instructions (Optional[str]): Specific instructions for this graph item.
        description (Optional[str]): Description of the graph item's purpose.
        schemas (Optional[AgentGraphItemSchema]): Input/output schemas.
        advanced_filtering_options (Optional[AgentGraphItemAdvancedFilteringOption]): Advanced filtering settings.
        hitl_options (Optional[AgentGraphItemHITLSettings]): Human-in-the-loop settings.
        a2a_options (Optional[AgentGraphItemA2ASettings]): Agent-to-agent communication settings.
        coding_agent_settings (Optional[AgentGraphItemCodingAgentSettings]): Coding agent specific settings.
        mcp_settings (Optional[MCPServerDetails]): Model Context Protocol settings.
    """
    
    instructions: Optional[str] = None
    description: Optional[str] = None
    schemas: Optional[AgentGraphItemSchema] = None
    advanced_filtering_options: Optional[AgentGraphItemAdvancedFilteringOption] = None
    hitl_options: Optional[AgentGraphItemHITLSettings] = None
    a2a_options: Optional[AgentGraphItemA2ASettings] = None
    coding_agent_settings: Optional[AgentGraphItemCodingAgentSettings] = None
    mcp_settings: Optional[MCPServerDetails] = None


class AgentGraphItemLLMSettings(BaseModel):
    """
    Model for LLM (Large Language Model) settings in agent graph items.
    
    Attributes:
        type (Literal["before", "after"]): When to apply LLM processing.
        provider (Optional[str]): LLM provider name, defaults to "openai".
        model (Optional[str]): Specific model name, defaults to "gpt-4.1".
        temperature (Optional[float]): Model temperature setting, defaults to 0.0.
    """
    
    type: Literal["before", "after"]
    provider: Optional[str] = "openai"
    model: Optional[str] = "gpt-4.1"
    temperature: Optional[float] = 0.0


class AgentGraphItem(BaseModel):
    """
    Model representing a single item in an agent's execution graph.
    
    This model defines a node in the agent's execution graph, including its
    configuration, connections, and processing settings.
    
    Attributes:
        id (Optional[str]): Unique identifier for the graph item.
        item_id (str): Reference ID for the underlying item.
        name (Optional[str]): Human-readable name for the graph item.
        type (AgentGraphItemType): Type of the graph item.
        sub_type (Optional[AgentGraphItemSubType]): Subtype for more specific categorization.
        targets (List[str]): List of target graph item IDs for execution flow.
        settings (Optional[AgentGraphItemSettings]): Configuration settings for the item.
        llm_settings (Optional[List[AgentGraphItemLLMSettings]]): LLM processing settings.
        is_first (Optional[bool]): Whether this is the first item in the execution graph.
    """
    
    id: Optional[str] = None
    item_id: str
    name: Optional[str] = None
    type: AgentGraphItemType
    sub_type: Optional[AgentGraphItemSubType] = None
    targets: List[str]
    settings: Optional[AgentGraphItemSettings] = None
    llm_settings: Optional[List[AgentGraphItemLLMSettings]] = []
    is_first: Optional[bool] = False


class AgentType(str, Enum):
    """
    Enumeration of agent types.

    Values:
        Manager: Agent that manages and coordinates other agents.
        Regular: Standard agent for individual task execution.
    """

    Manager = "manager"
    Regular = "regular"


@dataclass
class ConnectionURIResponse:
    """
    Data class for database connection URI responses.
    
    Attributes:
        uri (str): The database connection URI string.
    """
    
    uri: str


class DatabaseConnectionString(BaseModel):
    """
    Model for database connection string configuration.
    
    Attributes:
        id (str): Unique identifier for the connection.
        name (str): Human-readable name for the connection.
        organization_id (Optional[str]): Organization ID associated with the connection.
        connection_uri (Optional[ConnectionURIResponse]): Connection URI details.
    """
    
    id: str
    name: str
    organization_id: Optional[str] = None
    connection_uri: Optional[ConnectionURIResponse] = None


class AgentOutput(BaseModel):
    """
    Model for agent output configuration and formatting.
    
    Attributes:
        output_schema (Optional[Type[BaseModel]]): Pydantic model for structured output validation.
        is_markdown (Optional[bool]): Whether output should be formatted as Markdown.
        use_json_mode (Optional[bool]): Whether to use JSON mode for output formatting.
    """
    
    output_schema: Optional[Type[BaseModel]] = None
    is_markdown: Optional[bool] = False
    use_json_mode: Optional[bool] = False

class LLMCredentials(XPanderSharedModel):
    name: str
    description: Optional[str] = None
    value: str