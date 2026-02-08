"""Models for orchestration workflows and node definitions.

This module provides data models for building and managing orchestration workflows,
including various node types, execution strategies, and control flow conditions.
"""

from enum import Enum
from typing import Any, Dict, List, Literal, Optional, Union
from uuid import uuid4

from pydantic import Field

from xpander_sdk.models.generic import (
    LLMCredentials,
    LLMCredentialsKeyType,
    LLMModelProvider,
)
from xpander_sdk.models.shared import OutputFormat
from xpander_sdk.models.notifications import NotificationDetails
from xpander_sdk.models.shared import XPanderSharedModel

class OrchestrationNodeType(str, Enum):
    """Types of nodes available in an orchestration workflow.

    Attributes:
        CustomFunction: Node that executes a custom function.
        Code: Node that executes arbitrary code.
        Agent: Node that invokes an AI agent.
        Orchestration: Node that references another orchestration.
        Classifier: Node that classifies inputs using LLM.
        Wait: Node that pauses execution until a condition is met.
        Action: Node that triggers an action (api).
        Guardrail: Node that enforces guardrails on inputs using LLM.
        Summarizer: Node that summarizes or extracts information from inputs using LLM.
    """

    CustomFunction = "custom_function"
    Code = "code"
    Agent = "agent"
    Orchestration = "orchestration"
    Classifier = "classifier"
    Wait = "wait"
    Action = "action"
    Guardrail = "guardrail"
    Summarizer = "summarizer"
    SendToEnd = "send_to_end"

class OrchestrationPointerNodeInstructionsMode(str, Enum):
    """Modes for instruction usage in pointer node.

    Attributes:
        Replace: Replaces the traget asset instructions.
        Append: Appends to the traget asset instructions.
    """

    Replace = "replace"
    Append = "append"

class OrchestrationConditionType(str, Enum):
    """Types of conditions for orchestration control flow.

    Attributes:
        Regex: Condition based on regular expression matching.
        Contains: Condition based on substring containment.
        Else: Fallback condition that always matches (executed when no other conditions match).
        Equal: Condition based on equality comparison (path == value).
        NotEqual: Condition based on inequality comparison (path != value).
        GreaterThan: Condition based on greater than comparison (path > value).
        LessThan: Condition based on less than comparison (path < value).
        GreaterThanOrEqual: Condition based on greater than or equal comparison (path >= value).
        LessThanOrEqual: Condition based on less than or equal comparison (path <= value).
        NotEmpty: Condition that checks if a path value is not empty/null.
    """

    Regex = "regex"
    Contains = "contains"
    Else = "else"
    # Classic comparison operators
    Equal = "equal"
    NotEqual = "not_equal"
    GreaterThan = "gt"
    LessThan = "lt"
    GreaterThanOrEqual = "gte"
    LessThanOrEqual = "lte"
    NotEmpty = "not_empty"

class OrchestrationWaitNodeType(str, Enum):
    """Types of wait nodes in orchestration workflows.

    Attributes:
        Webhook: Wait for an external webhook call.
        HITL: Wait for human-in-the-loop interaction.
    """

    Webhook = "webhook"
    HITL = "hitl"

class OrchestrationCondition(XPanderSharedModel):
    """Condition for controlling orchestration flow.

    Attributes:
        type: Type of condition (regex, contains, else, or comparison operators).
        term: The pattern or string to match against. Used for 'regex' and 'contains' types.
        group_id: Optional group ID for group-based classifier routing.
                 When set, routing matches by group ID instead of term matching.
        path: Path to extract value from input data (e.g., "input.client_id" or "client_id").
              Used for comparison operators (equal, not_equal, gt, lt, gte, lte, not_empty).
        value: Value to compare against. Used with comparison operators.
               Not required for 'not_empty' type.
    """

    type: OrchestrationConditionType
    term: Optional[str] = None
    group_id: Optional[str] = None
    path: Optional[str] = None
    value: Optional[Any] = None


class OrchestrationEdge(XPanderSharedModel):
    """Edge representing a conditional route from a node to a target.
    
    Edges enable node reuse by moving conditions from target nodes
    to the routing source. Multiple edges can point to the same target
    with different conditions, enabling complex routing patterns like:
    - A -> [term1: B->D], else D (D reused as both conditional and else target)
    - Diamond patterns with convergence
    - Parallel execution with conditional branches merging
    
    Attributes:
        target_node_id: ID of the target node to route to.
        condition: Optional condition for this route. None means unconditional.
    """
    
    target_node_id: str
    condition: Optional[OrchestrationCondition] = None

class DuplicationPreventionSettings(XPanderSharedModel):
    """Settings for preventing duplicate event processing in workflows.
    
    When enabled, this prevents the same event from triggering a workflow multiple times
    within a configured time window. Useful for webhooks from services like Stigg or Cal.com
    that may fire the same event multiple times.
    
    Attributes:
        enabled: Whether duplication prevention is active.
        ttl_minutes: Time window to consider events as duplicates (default: 10 minutes).
        selectors: List of dot-notation paths to extract unique ID components from input.
                   Multiple selectors are combined to form a composite key.
                   Examples:
                   - ["messageId"] - single field
                   - ["input.event_id", "input.user_id"] - composite key
                   - ["triggerEvent", "payload.uid"] - Cal.com style
    """
    
    enabled: Optional[bool] = False
    ttl_minutes: Optional[int] = 10
    selectors: List[str]  # Required - paths to extract unique identifier components


class OrchestrationRetryStrategy(XPanderSharedModel):
    """Strategy for retrying failed orchestration nodes.

    Attributes:
        enabled: Whether retry is enabled for this node.
        max_retries: Maximum number of retry attempts. Defaults to 3.
    """

    enabled: Optional[bool] = False
    max_retries: Optional[int] = 3

class OrchestrationIterativeStrategy(XPanderSharedModel):
    """Strategy for iteratively executing orchestration nodes.

    Attributes:
        enabled: Whether iterative execution is enabled.
        max_iterations: Maximum number of iterations. Defaults to 3.
        end_condition: Optional condition to stop iteration early.
    """

    enabled: Optional[bool] = False
    max_iterations: Optional[int] = 3
    end_condition: Optional[OrchestrationCondition] = None

class OrchestrationStopStrategy(XPanderSharedModel):
    """Strategy for stopping orchestration execution.

    Attributes:
        enabled: Whether the stop strategy is enabled.
        stop_on_failure: Whether to stop the entire orchestration on node failure.
        stop_on_condition: Optional condition that will stop execution if met.
    """

    enabled: Optional[bool] = False
    stop_on_failure: Optional[bool] = True
    stop_on_condition: Optional[OrchestrationCondition] = None

class OrchestrationClassifierNodeLLMSettings(XPanderSharedModel):
    """LLM configuration for classifier nodes.

    Attributes:
        model_provider: The LLM provider to use. Defaults to OpenAI.
        model_name: Specific model identifier. Defaults to "gpt-4.1-mini".
        llm_credentials_key: Key identifier for stored credentials.
        llm_credentials_key_type: Type of credential key storage. Defaults to XPander.
        llm_credentials: Direct credential object if not using stored credentials.
        llm_api_base: Alternative API Base for the LLM.
        llm_extra_headers: Extra headers to be set to LLM Requests.
    """

    model_provider: Optional[LLMModelProvider] = LLMModelProvider.OpenAI
    model_name: Optional[str] = "gpt-4.1-mini"
    llm_credentials_key: Optional[str] = None
    llm_credentials_key_type: Optional[LLMCredentialsKeyType] = (
        LLMCredentialsKeyType.XPander
    )
    llm_credentials: Optional[LLMCredentials] = None
    llm_api_base: Optional[str] = None
    llm_extra_headers: Optional[Dict[str,str]] = {}

class SchemaOverride(XPanderSharedModel):
    """Schema override for workflow action nodes.
    
    Allows setting permanent (fixed) values for tool input properties.
    Fields with permanentValue will be removed from the schema sent to the LLM
    and the permanent values will be applied to the payload before execution.
    
    Attributes:
        input: Input schema with permanentValue fields to override LLM-generated values.
    """
    input: Optional[Dict] = None


class OrchestrationPointerNode(XPanderSharedModel):
    """Node that references an external asset (agent, function, or orchestration).

    Attributes:
        asset_id: Unique identifier of the asset to execute.
        type: Type of asset being referenced.
        output_type: Expected output format. Defaults to Text.
        output_schema: JSON schema for structured output validation.
        instructions: Optional instructions for the pointer node (Action only).
        instructions_mode: Mode to use for pointer node, specifically for agent nodes.
        ignore_response: Should ignore the node result and proceed with previous result?.
        schema_override: Optional schema override with permanentValue fields for fixed values.
    """

    asset_id: str
    type: Literal[
        OrchestrationNodeType.Agent,
        OrchestrationNodeType.CustomFunction,
        OrchestrationNodeType.Orchestration,
        OrchestrationNodeType.Action,
    ]

    output_type: Optional[OutputFormat] = OutputFormat.Text
    output_schema: Optional[Dict] = None
    instructions: Optional[str] = None
    instructions_mode: Optional[OrchestrationPointerNodeInstructionsMode] = OrchestrationPointerNodeInstructionsMode.Append
    ignore_response: Optional[bool] = False
    schema_override: Optional[SchemaOverride] = None

class ClassificationGroup(XPanderSharedModel):
    """A classification group with evaluation criteria and data extraction settings.

    Attributes:
        id: Unique identifier for the group (UUID).
        name: Human-readable name for the group.
        evaluation_criteria: Instructions for when this group should match.
        auto_extract_relevant_data: Whether to automatically extract relevant data for this group.
        data_extraction_keys: Specific JSON paths/keys to extract from input (alternative to auto_extract).
    """

    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    evaluation_criteria: str
    auto_extract_relevant_data: Optional[bool] = False
    data_extraction_keys: Optional[List[str]] = None


class OrchestrationClassifierNode(XPanderSharedModel):
    """Node that uses LLM to classify inputs into groups.

    Attributes:
        groups: List of classification groups to evaluate against.
        output_type: Expected output format. Defaults to Text.
        output_schema: JSON schema for structured output validation.
        instructions: Classification or transformation instructions for the LLM.
        examples: Example inputs/outputs to guide the LLM behavior.
        settings: LLM configuration settings.
    """

    groups: List[ClassificationGroup]
    output_type: Optional[OutputFormat] = OutputFormat.Text
    output_schema: Optional[Dict] = None
    instructions: Optional[str] = None
    examples: Optional[List[str]] = []
    settings: OrchestrationClassifierNodeLLMSettings

class OrchestrationGuardrailNode(XPanderSharedModel):
    """Node that uses LLM to evaluate input and enforce guardrails.

    This node uses group-based classification similar to the Classifier node.
    It requires exactly 2 groups with IDs "pass" and "fail":
    - "pass" group: Criteria for when input should pass the guardrail
    - "fail" group: Criteria for when input should fail the guardrail

    Routing behavior:
    - If "pass" matches: Routes to downstream nodes connected via "pass" condition
    - If "fail" matches: Routes to downstream nodes connected via "fail" condition,
      or falls back to end nodes (end-summarizer/end-classifier) if no fail route exists

    Attributes:
        groups: List of 2 ClassificationGroup objects with IDs "pass" and "fail".
        examples: Example inputs/outputs to guide the LLM behavior.
        settings: LLM configuration settings.
    """

    groups: List[ClassificationGroup]
    examples: Optional[List[str]] = []
    settings: OrchestrationClassifierNodeLLMSettings

class OrchestrationSummarizerNode(XPanderSharedModel):
    """Node that processes large payloads and answers specific questions.

    This node uses an LLM to summarize or extract information from large inputs.

    Attributes:
        instructions: Summarization or question-answering instructions for the LLM.
        examples: Example inputs/outputs to guide the LLM behavior.
        settings: LLM configuration settings.
    """

    instructions: str
    examples: Optional[List[str]] = []
    settings: OrchestrationClassifierNodeLLMSettings

class OrchestrationCodeNode(XPanderSharedModel):
    """Node that executes arbitrary code.

    Attributes:
        code: The code string to execute.
    """

    code: str


class OrchestrationSendToEndNode(XPanderSharedModel):
    """Node that routes execution to end nodes or finishes the workflow.

    When triggered, this node will:
    1. Route to end nodes (end-summarizer, end-classifier) if they exist
    2. Finish workflow execution immediately if no end nodes exist

    Attributes:
        message: Optional message or reason for finishing the workflow.
    """

    message: Optional[str] = None

class OrchestrationWaitNode(XPanderSharedModel):
    """Node that pauses execution until an external event occurs.

    Attributes:
        type: Type of wait event (webhook or human-in-the-loop).
        definition: Notification configuration for triggering continuation.
    """

    type: Literal[OrchestrationWaitNodeType.Webhook, OrchestrationWaitNodeType.HITL]
    definition: NotificationDetails

class OrchestrationNode(XPanderSharedModel):
    """A node in an orchestration workflow.

    Represents a single execution unit in an orchestration with control flow,
    execution strategies, and a specific node type definition.

    Attributes:
        type: Type of the node (must match the definition type).
        id: Unique identifier for the node. Auto-generated if not provided.
        next_node_ids: List of IDs of the next nodes to execute (DEPRECATED - use edges).
        edges: List of edges defining conditional routes to target nodes.
        name: Human-readable name for the node.
        description: Detailed description of the node's purpose.
        condition: Conditional logic for executing this node (DEPRECATED - use edges on source).
        retry_strategy: Strategy for retrying failed executions.
        iterative_strategy: Strategy for iterative execution.
        stop_strategy: Strategy for stopping the workflow.
        definition: The actual node implementation (code, classifier, pointer, or wait).
        input_type: Expected input format. Defaults to Text.
        input_schema: JSON schema for structured input validation.
        input_instructions: Instructions to use for structured input.
        agentic_context_input_instructions: Instructions to use for agentic context injection.
        agentic_context_output_instructions: Instructions to use for agentic context update.
    """

    type: OrchestrationNodeType
    id: str = Field(default_factory=lambda: str(uuid4()))
    next_node_ids: List[str] = Field(default_factory=list)  # DEPRECATED - use edges
    edges: List[OrchestrationEdge] = Field(default_factory=list)  # NEW - edge-based routing
    name: Optional[str] = None
    description: Optional[str] = None
    condition: Optional[OrchestrationCondition] = None  # DEPRECATED - use edges on source node
    retry_strategy: Optional[OrchestrationRetryStrategy] = Field(
        default_factory=OrchestrationRetryStrategy
    )
    iterative_strategy: Optional[OrchestrationIterativeStrategy] = Field(
        default_factory=OrchestrationIterativeStrategy
    )
    stop_strategy: Optional[OrchestrationStopStrategy] = Field(
        default_factory=OrchestrationStopStrategy
    )
    definition: Union[
        OrchestrationCodeNode,
        OrchestrationClassifierNode,
        OrchestrationPointerNode,
        OrchestrationWaitNode,
        OrchestrationGuardrailNode,
        OrchestrationSummarizerNode,
        OrchestrationSendToEndNode,
    ]
    input_type: Optional[OutputFormat] = OutputFormat.Text
    input_schema: Optional[Dict] = None
    input_instructions: Optional[str] = None
    agentic_context_input_instructions: Optional[str] = None
    agentic_context_output_instructions: Optional[str] = None
    return_this: Optional[bool] = False
