"""
Task models for agent execution in the xpander.ai SDK.

This module defines the various data models related to task execution, status,
and inputs for agents within the xpander.ai platform.
"""

from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, model_validator
from xpander_sdk.models.shared import ExecutionTokens, OutputFormat, Tokens, XPanderSharedModel
from xpander_sdk.models.user import User


class AgentExecutionStatus(str, Enum):
    """
    Enumeration of possible execution statuses for an agent task.
    
    Values:
        Pending: Task is pending execution.
        Executing: Task is currently executing.
        Paused: Task execution is paused.
        Error: Task encountered an error during execution.
        Failed: Task execution failed to complete successfully.
        Completed: Task execution completed successfully.
        Stopped: Task execution was stopped by the user.
        
    Example:
        >>> status = AgentExecutionStatus.Executing
        >>> print(status.value)  # "executing"
    """
    
    Pending = "pending"
    Executing = "executing"
    Paused = "paused"
    Error = "error"
    Failed = "failed"
    Completed = "completed"
    Stopped = "stopped"


class HumanInTheLoop(BaseModel):
    """
    Model representing human-in-the-loop approval records for tasks.
    
    Attributes:
        operation_id (str): Unique identifier of the operation requiring approval.
        approved_by (Optional[str]): User who approved the operation.
        rejected_by (Optional[str]): User who rejected the operation.
        title (Optional[str]): Title/subject of the approval request.
        description (Optional[str]): Detailed description of the approval.
        content (str): Content or action that requires approval.
    """
    
    operation_id: str
    approved_by: Optional[str] = None
    rejected_by: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    content: str


class AgentExecutionInput(BaseModel):
    """
    Model representing input to agent task execution.
    
    Attributes:
        text (Optional[str]): Textual input for the agent task.
        files (Optional[List[str]]): List of file URLs to provide as input.
        user (Optional[User]): User details associated with task execution.
        
    Validators:
        validate_at_least_one: Ensures that either text or files are provided.
        
    Example:
        >>> input = AgentExecutionInput(text="Process data", files=["http://file.url"])
        >>> print(f"Input text: {input.text}")
    """
    
    text: Optional[str] = ""
    files: Optional[List[str]] = []
    user: Optional[User] = None

    @model_validator(mode="after")
    def validate_at_least_one(cls, values):
        """
        Validate that at least one field is provided (text or files).
        
        Raises:
            ValueError: If neither text nor files are provided.
        """
        if not values.text and not values.files:
            raise ValueError(
                "Agent execution input should have either 'text' or 'files'. Please provide at least one."
            )
        return values


class PendingECARequest(BaseModel):
    """
    Model for pending ECA (External Credential Authorization) requests.
    
    Attributes:
        connector_name (str): Name of the connector requesting authorization.
        auth_url (str): URL to initiate the authorization process.
        
    Example:
        >>> request = PendingECARequest(
        ...     connector_name="Google Drive",
        ...     auth_url="https://auth.example.com"
        ... )
        >>> print(f"Connector: {request.connector_name}")
    """
    
    connector_name: str
    auth_url: str


class LocalTaskTest(BaseModel):
    """
    Model for testing tasks locally in the SDK.
    
    Attributes:
        input (AgentExecutionInput): The input for the task to be tested.
        agent_version (Optional[str]): Specific version of the agent for the test.
        output_format (Optional[OutputFormat]): Desired format of the output.
        output_schema (Optional[Dict]): Schema defining the structure of the output.
        
    Example:
        >>> test = LocalTaskTest(
        ...     input=AgentExecutionInput(text="Test input"),
        ...     agent_version="1.0"
        ... )
        >>> print(f"Agent Version: {test.agent_version}")
    """
    
    input: AgentExecutionInput
    agent_version: Optional[str] = None
    output_format: Optional[OutputFormat] = None
    output_schema: Optional[Dict] = None

class TaskReportRequest(XPanderSharedModel):
    id: Optional[str] = None
    input: Optional[str] = None
    llm_response: Optional[Any] = None
    tokens: Optional[Tokens] = None
    is_success: Optional[bool] = True
    result: Optional[str] = None
    duration: Optional[float] = 0
    used_tools: Optional[List[str]] = []

class ExecutionMetricsReport(XPanderSharedModel):
    execution_id: str
    source: str
    sub_executions: Optional[list[str]] = []
    memory_thread_id: str
    task: str
    triggered_by: Optional[str] = "N/A"
    skills: Optional[list[str]] = []
    status: str
    duration: float
    ai_model: str
    worker: Optional[str] = None
    ai_employee_id: Optional[str] = None
    api_calls_made: Optional[List[Any]] = None
    result: Optional[str]
    llm_tokens: Optional[ExecutionTokens] = ExecutionTokens()
