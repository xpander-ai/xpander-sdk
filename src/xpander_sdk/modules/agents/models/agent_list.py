"""
Agent list item model for the xpander.ai SDK.

This module contains the AgentsListItem model representing summary information
about agents returned in list operations, with methods to load full agent details.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.agents.models.agent import (
    AgentDeploymentProvider,
    AgentInstructions,
    AgentStatus,
)
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.utils.event_loop import run_sync


class AgentsListItem(BaseModel):
    """
    Summary representation of an agent in list operations.
    
    This model contains essential information about an agent as returned by
    list operations, providing enough detail for display and selection purposes
    while allowing for efficient loading of the full agent when needed.
    
    Attributes:
        id (str): Unique identifier for the agent.
        deployment_provider (AgentDeploymentProvider): Platform where the agent is deployed.
        name (str): Human-readable name of the agent.
        icon (str): Icon identifier or URL for the agent.
        instructions (AgentInstructions): Basic instructions and configuration for the agent.
        status (AgentStatus): Current operational status of the agent.
        organization_id (str): ID of the organization that owns the agent.
        created_at (datetime): Timestamp when the agent was created.
        description (Optional[str]): Optional detailed description of the agent.
        
    Methods:
        aload: Asynchronously load the full agent details.
        load: Synchronously load the full agent details.
        
    Example:
        >>> agents = Agents()
        >>> agent_list = agents.list()
        >>> for item in agent_list:
        ...     print(f"Agent: {item.name} (Status: {item.status})")
        ...     full_agent = item.load()  # Load complete agent details
    """
    
    id: str
    deployment_provider: AgentDeploymentProvider
    name: str
    icon: str
    instructions: AgentInstructions
    status: AgentStatus
    organization_id: str
    created_at: datetime
    description: Optional[str] = None

    async def aload(self, configuration: Optional[Configuration] = None) -> Agent:
        """
        Asynchronously load the complete Agent object for this agent.
        
        This method fetches the full agent configuration, execution graph,
        and all associated metadata from the xpander.ai platform.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration to use
                for the request. If None, uses default configuration.
                
        Returns:
            Agent: Complete agent object with full configuration and capabilities.
            
        Raises:
            ModuleException: If the agent cannot be loaded or access is denied.
            
        Example:
            >>> agent_item = agent_list[0]
            >>> full_agent = await agent_item.aload()
            >>> result = await full_agent.aexecute("Hello, world!")
        """
        return await Agent.aload(agent_id=self.id, configuration=configuration)

    def load(self, configuration: Optional[Configuration] = None) -> Agent:
        """
        Synchronously load the complete Agent object for this agent.
        
        This is the synchronous version of aload(). It internally calls the
        asynchronous method and waits for completion.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration to use
                for the request. If None, uses default configuration.
                
        Returns:
            Agent: Complete agent object with full configuration and capabilities.
            
        Raises:
            ModuleException: If the agent cannot be loaded or access is denied.
            
        Example:
            >>> agent_item = agent_list[0]
            >>> full_agent = agent_item.load()
            >>> result = full_agent.execute("What's the weather today?")
        """
        return run_sync(self.aload(configuration=configuration))
