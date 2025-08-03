"""
Agents module for managing AI agents in the xpander.ai platform.

This module provides functionality to list, retrieve, and manage AI agents
within the xpander.ai Backend-as-a-Service platform.
"""

from typing import List, Optional

from httpx import HTTPStatusError

from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.module_base import ModuleBase
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.exceptions.module_exception import ModuleException
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.agents.models.agent_list import AgentsListItem
from xpander_sdk.modules.agents.sub_modules.agent import Agent
from xpander_sdk.utils.event_loop import run_sync


class Agents(ModuleBase):
    """
    Main module for managing AI agents in xpander.ai.
    
    This class provides both synchronous and asynchronous methods for listing
    and retrieving AI agents from the xpander.ai platform. It handles agent
    discovery, versioning, and provides access to individual agent instances.
    
    The module follows the singleton pattern inherited from ModuleBase,
    ensuring consistent configuration across all agent operations.
    
    Example:
        >>> agents = Agents()
        >>> agent_list = agents.list()
        >>> specific_agent = agents.get("agent-id-123")
        >>> specific_version = agents.get("agent-id-123", version=2)
    """
    
    def __init__(self, configuration: Optional[Configuration] = None):
        """
        Initialize the Agents module.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration. If None,
                will use default configuration from environment variables.
        """
        super().__init__(configuration)

    async def alist(self) -> List[AgentsListItem]:
        """
        Asynchronously list all available agents.
        
        Retrieves a list of all agents accessible to the current user/organization.
        Each item in the list contains basic agent information including ID, name,
        status, and metadata.
        
        Returns:
            List[AgentsListItem]: List of agent summary objects containing
                basic information about each agent.
                
        Raises:
            ModuleException: If the API request fails or returns an error.
                The exception will contain the HTTP status code and error message.
                
        Example:
            >>> agents = Agents()
            >>> agent_list = await agents.alist()
            >>> for agent in agent_list:
            ...     print(f"Agent: {agent.name} (ID: {agent.id})")
        """
        try:
            client = APIClient(configuration=self.configuration)
            agents = await client.make_request(path=APIRoute.ListAgent)
            return [AgentsListItem(**agent) for agent in agents]
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to list agents - {str(e)}")

    def list(self) -> List[AgentsListItem]:
        """
        Synchronously list all available agents.
        
        This is the synchronous version of alist(). It internally calls the
        asynchronous method and waits for completion.
        
        Returns:
            List[AgentsListItem]: List of agent summary objects containing
                basic information about each agent.
                
        Raises:
            ModuleException: If the API request fails or returns an error.
            
        Example:
            >>> agents = Agents()
            >>> agent_list = agents.list()
            >>> print(f"Found {len(agent_list)} agents")
        """
        return run_sync(self.alist())

    async def aget(self, agent_id: str, version: Optional[int] = None) -> Agent:
        """
        Asynchronously retrieve a specific agent by ID.
        
        Loads and returns a full Agent object with complete configuration,
        graph definitions, and all associated metadata. Optionally loads
        a specific version of the agent.
        
        Args:
            agent_id (str): Unique identifier of the agent to retrieve.
            version (Optional[int]): Specific version number to load. If None,
                loads the latest version.
                
        Returns:
            Agent: Complete agent object with full configuration and capabilities.
            
        Raises:
            ModuleException: If the agent is not found, access is denied,
                or the API request fails.
                
        Example:
            >>> agents = Agents()
            >>> agent = await agents.aget("agent-123")
            >>> print(f"Loaded agent: {agent.name}")
            
            >>> # Load specific version
            >>> agent_v2 = await agents.aget("agent-123", version=2)
        """
        return await Agent.aload(agent_id=agent_id, configuration=self.configuration, version=version)

    def get(self, agent_id: str, version: Optional[int] = None) -> Agent:
        """
        Synchronously retrieve a specific agent by ID.
        
        This is the synchronous version of aget(). It internally calls the
        asynchronous method and waits for completion.
        
        Args:
            agent_id (str): Unique identifier of the agent to retrieve.
            version (Optional[int]): Specific version number to load. If None,
                loads the latest version.
                
        Returns:
            Agent: Complete agent object with full configuration and capabilities.
            
        Raises:
            ModuleException: If the agent is not found, access is denied,
                or the API request fails.
                
        Example:
            >>> agents = Agents()
            >>> agent = agents.get("agent-123")
            >>> result = agent.execute("What is the weather today?")
        """
        return run_sync(self.aget(agent_id=agent_id, version=version))
