"""
Base class for all xpander.ai SDK modules.

This module provides the abstract base class that all SDK modules inherit from,
establishing common patterns for resource management and API operations.
"""

from abc import ABC
from typing import Optional, Any
from xpander_sdk.models.configuration import Configuration


class ModuleBase(ABC):
    """
    Abstract base class for all xpander.ai SDK modules.
    
    This class implements a singleton pattern and provides common CRUD (Create, Read,
    Update, Delete) operations that can be implemented by specific modules. It ensures
    consistent configuration management and API patterns across all SDK modules.
    
    The class follows the singleton pattern to ensure that each module type has only
    one instance throughout the application lifecycle, maintaining consistent state
    and configuration.
    
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
        
    Example:
        >>> class MyModule(ModuleBase):
        ...     async def list(self, **kwargs):
        ...         # Implementation for listing resources
        ...         pass
        ...     async def get(self, resource_id: str, **kwargs):
        ...         # Implementation for getting a resource
        ...         pass
    """
    
    _instance = None

    def __new__(cls, configuration: Optional[Configuration] = None):
        """
        Create or return existing module singleton instance.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration. If None,
                will use default configuration from environment variables.
                
        Returns:
            ModuleBase: The singleton module instance.
        """
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, configuration: Optional[Configuration] = None):
        """
        Initialize the module with configuration.
        
        This method is called only once due to the singleton pattern.
        Subsequent calls will not reinitialize the module.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration. If None,
                will create a default Configuration instance from environment variables.
        """
        if self._initialized:
            return
        self.configuration = configuration or Configuration()
        self._initialized = True

    async def list(self, **kwargs) -> Any:
        """
        List all resources of this module type.
        
        This is an abstract method that must be implemented by concrete module classes.
        It should return a list or paginated collection of resources.
        
        Args:
            **kwargs: Additional parameters for filtering, pagination, or other
                list-specific options.
                
        Returns:
            Any: List of resources or paginated response object.
            
        Raises:
            NotImplementedError: Always, as this method must be implemented by subclasses.
        """
        raise NotImplementedError

    async def get(self, resource_id: str, **kwargs) -> Any:
        """
        Retrieve a single resource by its unique identifier.
        
        This is an abstract method that must be implemented by concrete module classes.
        It should return the resource data for the specified ID.
        
        Args:
            resource_id (str): Unique identifier of the resource to retrieve.
            **kwargs: Additional parameters for resource retrieval options.
            
        Returns:
            Any: The resource data object.
            
        Raises:
            NotImplementedError: Always, as this method must be implemented by subclasses.
        """
        raise NotImplementedError

    async def create(self, data: dict, **kwargs) -> Any:
        """
        Create a new resource (optional operation).
        
        This method can be overridden by modules that support resource creation.
        By default, it raises NotImplementedError to indicate the operation is not supported.
        
        Args:
            data (dict): Resource data for creation.
            **kwargs: Additional parameters for resource creation.
            
        Returns:
            Any: The created resource data object.
            
        Raises:
            NotImplementedError: If the module does not support resource creation.
        """
        raise NotImplementedError("This module does not support 'create'")

    async def update(self, resource_id: str, data: dict, **kwargs) -> Any:
        """
        Update an existing resource by ID (optional operation).
        
        This method can be overridden by modules that support resource updates.
        By default, it raises NotImplementedError to indicate the operation is not supported.
        
        Args:
            resource_id (str): Unique identifier of the resource to update.
            data (dict): Updated resource data.
            **kwargs: Additional parameters for resource update.
            
        Returns:
            Any: The updated resource data object.
            
        Raises:
            NotImplementedError: If the module does not support resource updates.
        """
        raise NotImplementedError("This module does not support 'update'")

    async def delete(self, resource_id: str, **kwargs) -> Any:
        """
        Delete a resource by ID (optional operation).
        
        This method can be overridden by modules that support resource deletion.
        By default, it raises NotImplementedError to indicate the operation is not supported.
        
        Args:
            resource_id (str): Unique identifier of the resource to delete.
            **kwargs: Additional parameters for resource deletion.
            
        Returns:
            Any: Deletion confirmation or result data.
            
        Raises:
            NotImplementedError: If the module does not support resource deletion.
        """
        raise NotImplementedError("This module does not support 'delete'")
