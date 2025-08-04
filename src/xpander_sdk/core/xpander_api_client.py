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
    Conditional singleton HTTP client for xpander.ai API communication.
    
    - If no configuration is passed, uses a shared singleton instance.
    - If a configuration is passed, creates a unique instance.
    
    This client handles:
    - API key authentication via x-api-key header
    - URL construction
    - JSON serialization/deserialization
    - Extended timeouts
    - HTTP error handling
    """

    _shared_instances: Dict[type, 'APIClient'] = {}

    def __new__(cls, configuration: Optional[Configuration] = None):
        """
        Returns a shared singleton if no configuration is passed.
        If configuration is provided, returns a unique instance.
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
        Initialize the APIClient with configuration, once per instance.
        """
        if hasattr(self, '_initialized') and self._initialized:
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

        Args:
            path (str): Endpoint path (e.g., "/agents").
            method (HTTPMethod): HTTP verb.
            payload (Optional[Any]): JSON body for POST/PUT/PATCH.
            query (Optional[Dict[str, Any]]): Query string parameters.
            headers (Optional[Dict[str, Any]]): Extra headers.
            configuration (Optional[Configuration]): Overrides self.configuration.
        
        Returns:
            Any: Parsed response body (JSON or text).
        
        Raises:
            httpx.HTTPStatusError: For 4xx/5xx responses.
            httpx.RequestError: For connection/network errors.
        """
        config = configuration or self.configuration

        # Construct full URL
        url = f"{config.get_full_url().rstrip('/')}/{path.lstrip('/')}"

        # Prepare headers
        headers = headers.copy() if headers else {}
        headers["x-api-key"] = config.api_key

        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=method,
                url=url,
                json=payload if method in {"POST", "PUT", "PATCH"} else None,
                params=query,
                headers=headers,
                timeout=1200,  # 20 minutes
            )

            response.raise_for_status()

            content_type = response.headers.get("Content-Type", "")
            if "application/json" in content_type:
                try:
                    return response.json()
                except Exception:
                    return response.text
            return response.text
