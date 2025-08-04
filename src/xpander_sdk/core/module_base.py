"""
Base class for all xpander.ai SDK modules.

This module provides the abstract base class that all SDK modules inherit from,
establishing common patterns for resource management and API operations.
"""

from abc import ABC
from typing import Optional, Any, Dict, Type
from xpander_sdk.models.configuration import Configuration


class ModuleBase(ABC):
    """
    Abstract base class for all xpander.ai SDK modules.
    
    This class implements a conditional singleton pattern:
    - If no configuration is passed, it returns a shared singleton per subclass.
    - If a configuration is passed, a new instance is created and not shared.
    
    Attributes:
        configuration (Configuration): SDK configuration including API credentials
            and endpoint information.
            
    Abstract Methods:
        list: List all resources of this module type.
        get: Retrieve a single resource by ID.
        
    Optional Methods (can be overridden by subclasses):
        create: Create a new resource.
        update: Update an existing resource.
        delete: Delete a resource.
    """

    _shared_instances: Dict[Type['ModuleBase'], 'ModuleBase'] = {}

    def __new__(cls, configuration: Optional[Configuration] = None):
        """
        Create or return an existing module singleton instance.
        
        Args:
            configuration (Optional[Configuration]): If provided, a new independent
                instance is created. Otherwise, returns a singleton per class.
                
        Returns:
            ModuleBase: The module instance.
        """
        if configuration is not None:
            instance = super().__new__(cls)
            instance._is_custom_instance = True
            return instance

        if cls not in cls._shared_instances:
            instance = super().__new__(cls)
            instance._is_custom_instance = False
            cls._shared_instances[cls] = instance

        return cls._shared_instances[cls]

    def __init__(self, configuration: Optional[Configuration] = None):
        """
        Initialize the module with configuration.
        
        This method is called only once per instance to prevent reinitialization.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration. If None,
                will create a default Configuration instance from environment variables.
        """
        if hasattr(self, '_initialized') and self._initialized:
            return

        self.configuration = configuration or Configuration()
        self._initialized = True

    async def list(self, **kwargs) -> Any:
        """
        List all resources of this module type.

        This is an abstract method that must be implemented by concrete module classes.
        
        Args:
            **kwargs: Additional parameters for filtering, pagination, etc.
                
        Returns:
            Any: List of resources or paginated response.
            
        Raises:
            NotImplementedError: Always, unless overridden.
        """
        raise NotImplementedError

    async def get(self, resource_id: str, **kwargs) -> Any:
        """
        Retrieve a single resource by its unique identifier.
        
        This is an abstract method that must be implemented by concrete module classes.
        
        Args:
            resource_id (str): Unique identifier of the resource to retrieve.
            **kwargs: Additional retrieval options.
            
        Returns:
            Any: The resource data.
            
        Raises:
            NotImplementedError: Always, unless overridden.
        """
        raise NotImplementedError

    async def create(self, data: dict, **kwargs) -> Any:
        """
        Create a new resource (optional operation).
        
        Can be overridden by modules that support creation.
        
        Args:
            data (dict): Resource data.
            **kwargs: Additional creation options.
            
        Returns:
            Any: Created resource data.
            
        Raises:
            NotImplementedError: If creation is not supported.
        """
        raise NotImplementedError("This module does not support 'create'")

    async def update(self, resource_id: str, data: dict, **kwargs) -> Any:
        """
        Update an existing resource by ID (optional operation).
        
        Can be overridden by modules that support updates.
        
        Args:
            resource_id (str): Unique ID of resource to update.
            data (dict): Updated data.
            **kwargs: Additional update options.
            
        Returns:
            Any: Updated resource data.
            
        Raises:
            NotImplementedError: If update is not supported.
        """
        raise NotImplementedError("This module does not support 'update'")

    async def delete(self, resource_id: str, **kwargs) -> Any:
        """
        Delete a resource by ID (optional operation).
        
        Can be overridden by modules that support deletion.
        
        Args:
            resource_id (str): Unique ID of resource to delete.
            **kwargs: Additional deletion options.
            
        Returns:
            Any: Deletion result.
            
        Raises:
            NotImplementedError: If delete is not supported.
        """
        raise NotImplementedError("This module does not support 'delete'")
