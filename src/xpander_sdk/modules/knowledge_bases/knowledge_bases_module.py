"""
Knowledge Bases module for managing knowledge repositories in the xpander.ai platform.

This module provides functionality to create, list, and retrieve knowledge bases
within the xpander.ai Backend-as-a-Service platform.
"""

from typing import List, Optional

from httpx import HTTPStatusError

from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.module_base import ModuleBase
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.exceptions.module_exception import ModuleException
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.knowledge_bases.sub_modules.knowledge_base import KnowledgeBase
from xpander_sdk.utils.event_loop import run_sync


class KnowledgeBases(ModuleBase):
    """
    Main module for managing knowledge bases in xpander.ai.
    
    This class provides methods for listing, creating, and retrieving knowledge
    bases associated with AI agents in the xpander.ai platform. Both asynchronous
    and synchronous versions are offered to accommodate different integration needs.
    
    The module follows the singleton pattern inherited from ModuleBase, ensuring
    consistent configuration across all operations.
    
    Example:
        >>> knowledge_bases = KnowledgeBases()
        >>> kb_list = knowledge_bases.list()
        >>> specific_kb = knowledge_bases.get(knowledge_base_id="kb123")
    """
    
    def __init__(self, configuration: Optional[Configuration] = None):
        """
        Initialize the KnowledgeBases module.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration. If None,
                will use default configuration from environment variables.
        """
        super().__init__(configuration)

    async def alist(self) -> List[KnowledgeBase]:
        """
        Asynchronously list all available knowledge bases.
        
        Retrieves a list of all knowledge bases accessible to the current
        user/organization, providing essential information for exploration and management.
        
        Returns:
            List[KnowledgeBase]: List of knowledge base summary objects.
            
        Raises:
            ModuleException: If the API request fails or returns an error.
                
        Example:
            >>> knowledge_bases = KnowledgeBases()
            >>> kb_list = await knowledge_bases.alist()
            >>> for kb in kb_list:
            ...     print(f"Knowledge Base: {kb.name} (ID: {kb.id})")
        """
        try:
            client = APIClient(configuration=self.configuration)
            kbs = await client.make_request(path=APIRoute.ListKnowledgeBases)
            return [KnowledgeBase(**kb, configuration=self.configuration) for kb in kbs]
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to list knowledge bases - {str(e)}")

    def list(self) -> List[KnowledgeBase]:
        """
        Synchronously list all available knowledge bases.
        
        This is the synchronous version of alist(). It internally calls the
        asynchronous method and waits for completion.
        
        Returns:
            List[KnowledgeBase]: List of knowledge base summary objects.
            
        Raises:
            ModuleException: If the API request fails or returns an error.
            
        Example:
            >>> knowledge_bases = KnowledgeBases()
            >>> kb_list = knowledge_bases.list()
            >>> print(f"Found {len(kb_list)} knowledge bases")
        """
        return run_sync(self.alist())

    async def aget(self, knowledge_base_id: str) -> KnowledgeBase:
        """
        Asynchronously retrieve a specific knowledge base by ID.
        
        Loads and returns a full KnowledgeBase object with detailed configuration
        and capabilities using the provided knowledge base ID.
        
        Args:
            knowledge_base_id (str): Unique identifier of the knowledge base to retrieve.
                
        Returns:
            KnowledgeBase: Complete knowledge base object.
            
        Raises:
            ModuleException: If the knowledge base is not found or access is denied.
                
        Example:
            >>> knowledge_bases = KnowledgeBases()
            >>> kb = await knowledge_bases.aget(knowledge_base_id="kb123")
            >>> print(f"Loaded knowledge base: {kb.name}")
        """
        try:
            client = APIClient(configuration=self.configuration)
            kb = await client.make_request(
                path=APIRoute.GetKnowledgeBaseDetails.format(knowledge_base_id=knowledge_base_id)
            )
            return KnowledgeBase(**kb, configuration=self.configuration)
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to get knowledge base - {str(e)}")

    def get(self, knowledge_base_id: str) -> KnowledgeBase:
        """
        Synchronously retrieve a specific knowledge base by ID.
        
        This is the synchronous version of aget(). It internally calls the
        asynchronous method and waits for completion.
        
        Args:
            knowledge_base_id (str): Unique identifier of the knowledge base to retrieve.
                
        Returns:
            KnowledgeBase: Complete knowledge base object.
            
        Raises:
            ModuleException: If the knowledge base is not found or access is denied.
                
        Example:
            >>> knowledge_bases = KnowledgeBases()
            >>> kb = knowledge_bases.get(knowledge_base_id="kb123")
            >>> details = kb.details()
        """
        return run_sync(self.aget(knowledge_base_id))

    async def acreate(self, name: str, description: Optional[str] = "") -> KnowledgeBase:
        """
        Asynchronously create a new knowledge base.
        
        Creates a new knowledge base in the xpander.ai platform with the specified
        name and description.
        
        Args:
            name (str): The name of the new knowledge base.
            description (Optional[str]): A brief description of the knowledge base.
                
        Returns:
            KnowledgeBase: Newly created knowledge base object.
            
        Raises:
            ModuleException: If knowledge base creation fails due to API problems or configuration errors.
                
        Example:
            >>> knowledge_bases = KnowledgeBases()
            >>> new_kb = await knowledge_bases.acreate(
            ...     name="New Knowledge Base",
            ...     description="A demo knowledge base for testing"
            ... )
            >>> print(f"Created knowledge base: {new_kb.id}")
        """
        try:
            client = APIClient(configuration=self.configuration)
            created_kb = await client.make_request(
                path=APIRoute.CreateKnowledgeBase,
                method="POST",
                payload={
                    "name": name,
                    "description": description,
                },
            )
            return KnowledgeBase(**created_kb, configuration=self.configuration)
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to create knowledge base - {str(e)}")

    def create(self, name: str, description: Optional[str] = "") -> KnowledgeBase:
        """
        Synchronously create a new knowledge base.
        
        This is the synchronous version of acreate(). It internally calls the
        asynchronous method and waits for completion.
        
        Args:
            name (str): The name of the new knowledge base.
            description (Optional[str]): A brief description of the knowledge base.
                
        Returns:
            KnowledgeBase: Newly created knowledge base object.
            
        Raises:
            ModuleException: If knowledge base creation fails due to API problems or configuration errors.
                
        Example:
            >>> knowledge_bases = KnowledgeBases()
            >>> new_kb = knowledge_bases.create(
            ...     name="New Knowledge Base",
            ...     description="A demo knowledge base for testing"
            ... )
            >>> print(f"Created knowledge base: {new_kb.id}")
        """
        return run_sync(self.acreate(name=name, description=description))
