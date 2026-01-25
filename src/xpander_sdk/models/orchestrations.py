"""Models for orchestration workflows and node definitions.

This module provides data models for building and managing orchestration workflows,
including various node types, execution strategies, and control flow conditions.
"""

from enum import Enum
from typing import Dict, List, Literal, Optional, Union
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

class OrchestrationConditionType(str, Enum):
    """Types of conditions for orchestration control flow.

    Attributes:
        Regex: Condition based on regular expression matching.
        Contains: Condition based on substring containment.
        Else: Fallback condition that always matches (executed when no other conditions match).
    """

    Regex = "regex"
    Contains = "contains"
    Else = "else"

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
        type: Type of condition (regex, contains, or else).
        term: The pattern or string to match against. Optional for 'else' type.
        group_id: Optional group ID for group-based classifier routing.
                 When set, routing matches by group ID instead of term matching.
    """

    type: OrchestrationConditionType
    term: Optional[str] = None
    group_id: Optional[str] = None

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

class OrchestrationPointerNode(XPanderSharedModel):
    """Node that references an external asset (agent, function, or orchestration).

    Attributes:
        asset_id: Unique identifier of the asset to execute.
        type: Type of asset being referenced.
        output_type: Expected output format. Defaults to Text.
        output_schema: JSON schema for structured output validation.
        instructions: Optional instructions for the pointer node (Action only).
        ignore_response: Should ignore the node result and proceed with previous result?.
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
    ignore_response: Optional[bool] = False

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

    This node can stop execution if the guardrail check fails.

    Attributes:
        instructions: Evaluation instructions for the LLM to assess the input.
        examples: Example inputs/outputs to guide the LLM behavior.
        settings: LLM configuration settings.
        stop_on_false: Whether to stop execution if the guardrail check fails. Defaults to True.
    """

    instructions: str
    examples: Optional[List[str]] = []
    settings: OrchestrationClassifierNodeLLMSettings
    stop_on_false: Optional[bool] = True

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
        next_node_ids: List of IDs of the next nodes to execute in the workflow (supports branching).
        name: Human-readable name for the node.
        description: Detailed description of the node's purpose.
        condition: Conditional logic for executing this node.
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
    next_node_ids: List[str] = Field(default_factory=list)
    name: Optional[str] = None
    description: Optional[str] = None
    condition: Optional[OrchestrationCondition] = None
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
