"""
Tasks list item model for the xpander.ai SDK.

This module defines the TasksListItem model, which represents summary information
about tasks as returned in list operations, with methods to load full task details.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.tasks.models.task import AgentExecutionStatus
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.utils.event_loop import run_sync

class TasksListItem(BaseModel):
    """
    Summary representation of a task in list operations.
    
    This model provides essential information about a task, suitable for
    display and interaction in list views, while enabling efficient retrieval
    of full task details when needed.
    
    Attributes:
        id (str): Unique identifier for this task execution.
        agent_id (str): ID of the agent responsible for executing the task.
        organization_id (str): ID of the organization that owns the agent.
        status (AgentExecutionStatus): Current execution status of the task.
        created_at (Optional[datetime]): Timestamp when the execution was created.
        updated_at (Optional[datetime]): Timestamp of the last update to this execution.
        source_node_type (Optional[str]): The type of the source node that triggered execution.
        result (Optional[str]): Final result of the execution, if available.
        
    Methods:
        aload: Asynchronously load the full task details.
        load: Synchronously load the full task details.
        
    Example:
        >>> tasks = Tasks()
        >>> task_list = tasks.list(agent_id="agent123")
        >>> for item in task_list:
        ...     print(f"Task: {item.id} - Status: {item.status}")
        ...     full_task = item.load()  # Load complete task details
    """
    
    id: str = Field(..., description="Unique identifier for this execution")
    agent_id: str = Field(..., description="ID of the agent being executed")
    organization_id: str = Field(..., description="ID of the organization that owns the agent")
    status: AgentExecutionStatus = Field(..., description="Current execution status")
    created_at: Optional[datetime] = Field(default=None, description="Timestamp when the execution was created")
    updated_at: Optional[datetime] = Field(default=None, description="Timestamp of the last update to this execution")
    source_node_type: Optional[str] = Field(default=None, description="Type of the source node that triggered this execution (if any)")
    result: Optional[str] = Field(default=None, description="Final result of the execution, if available")

    async def aload(self, configuration: Optional[Configuration] = None) -> Task:
        """
        Asynchronously load the complete Task object for this task.
        
        Retrieves full task details from the xpander.ai platform, including
        configuration, execution records, and results.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration to use
                for the request. If None, uses default configuration.
                
        Returns:
            Task: Complete task object with detailed configuration and history.
                
        Raises:
            ModuleException: If the task cannot be loaded or access is denied.
                
        Example:
            >>> task_item = task_list[0]
            >>> full_task = await task_item.aload()
            >>> print(f"Task result: {full_task.result}")
        """
        return await Task.aload(task_id=self.id, configuration=configuration)

    def load(self, configuration: Optional[Configuration] = None) -> Task:
        """
        Synchronously load the complete Task object for this task.
        
        This is the synchronous version of aload(). It internally calls the
        asynchronous method and waits for completion.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration to use
                for the request. If None, uses default configuration.
                
        Returns:
            Task: Complete task object with detailed configuration and history.
                
        Raises:
            ModuleException: If the task cannot be loaded or access is denied.
                
        Example:
            >>> task_item = task_list[0]
            >>> full_task = task_item.load()
            >>> print(f"Task result: {full_task.result}")
        """
        return run_sync(self.aload(configuration=configuration))
