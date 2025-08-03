"""
API client for communicating with xpander.ai services.

This module provides the core HTTP client functionality for making authenticated
requests to the xpander.ai Backend-as-a-Service platform.
"""

from abc import ABC
from typing import Optional, Any, Literal, Dict
import httpx

from xpander_sdk.models.configuration import Configuration

# Type alias for supported HTTP methods
HTTPMethod = Literal["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]


class APIClient(ABC):
    """
    Singleton HTTP client for xpander.ai API communication.
    
    This class implements a singleton pattern to ensure consistent API client
    configuration across the entire SDK. It handles authentication, request
    formatting, and response parsing for all xpander.ai API interactions.
    
    The client automatically handles:
    - API key authentication via x-api-key header
    - URL construction with organization ID when required
    - JSON serialization/deserialization
    - HTTP error handling with proper status codes
    - Extended timeouts for long-running operations
    
    Attributes:
        configuration (Configuration): SDK configuration including credentials and endpoints.
        
    Example:
        >>> config = Configuration(api_key="your-key")
        >>> client = APIClient(config)
        >>> response = await client.make_request("/agents", method="GET")
    """
    
    _instance = None

    def __new__(cls, configuration: Optional[Configuration] = None):
        """
        Create or return existing APIClient singleton instance.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration. If None,
                will use default configuration from environment variables.
                
        Returns:
            APIClient: The singleton APIClient instance.
        """
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, configuration: Optional[Configuration] = None):
        """
        Initialize the APIClient with configuration.
        
        This method is called only once due to the singleton pattern.
        Subsequent calls will not reinitialize the client.
        
        Args:
            configuration (Optional[Configuration]): SDK configuration. If None,
                will create a default Configuration instance from environment variables.
        """
        if self._initialized:
            return
        self.configuration = configuration or Configuration()
        self._initialized = True

    async def make_request(
        self,
        path: str,
        method: HTTPMethod = "GET",
        payload: Optional[Any] = None,
        query: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, Any]] = None,
        configuration: Optional[Configuration] = None,
    ) -> Any:
        """
        Make an authenticated HTTP request to the xpander.ai API.
        
        This method handles the complete request lifecycle including URL construction,
        authentication header injection, request execution, and response parsing.
        
        Args:
            path (str): API endpoint path (e.g., "/agents" or "/tasks/123").
            method (HTTPMethod): HTTP method to use. Defaults to "GET".
            payload (Optional[Any]): Request body data for POST/PUT/PATCH requests.
                Will be JSON-serialized automatically.
            query (Optional[Dict[str, Any]]): URL query parameters as key-value pairs.
            headers (Optional[Dict[str, Any]]): Additional HTTP headers to include.
                Authentication header will be added automatically.
            configuration (Optional[Configuration]): Override default configuration
                for this specific request.
                
        Returns:
            Any: Parsed response data. Returns JSON object for application/json
                responses, plain text otherwise.
                
        Raises:
            httpx.HTTPStatusError: For HTTP error status codes (4xx, 5xx).
            httpx.RequestError: For network-related errors.
            
        Example:
            >>> # GET request with query parameters
            >>> response = await client.make_request(
            ...     path="/agents",
            ...     method="GET",
            ...     query={"limit": 10, "status": "active"}
            ... )
            
            >>> # POST request with JSON payload
            >>> response = await client.make_request(
            ...     path="/agents",
            ...     method="POST",
            ...     payload={"name": "My Agent", "description": "Test agent"}
            ... )
        """
        # Allow override of configuration for this specific request
        config = configuration or self.configuration

        # Construct the complete URL
        url = f"{config.get_full_url().rstrip('/')}/{path.lstrip('/')}"
        
        # Prepare headers with authentication
        headers = headers.copy() if headers else {}
        headers["x-api-key"] = config.api_key

        # Execute the HTTP request
        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=method,
                url=url,
                json=payload if method in {"POST", "PUT", "PATCH"} else None,
                params=query,
                headers=headers,
                timeout=1200,  # Extended timeout for long-running operations
            )
            
            # Raise an exception for HTTP error status codes
            response.raise_for_status()
            
            # Parse response based on content type
            content_type = response.headers.get("Content-Type", "")
            if "application/json" in content_type:
                try:
                    return response.json()
                except Exception:
                    # Fallback to text if JSON parsing fails
                    return response.text
            return response.text
