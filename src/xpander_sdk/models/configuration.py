"""
Configuration model for xpander.ai SDK.

This module contains the Configuration class that manages SDK settings including
API credentials, base URLs, and organization information.
"""

from typing import Optional
from os import getenv
from pydantic import BaseModel, Field

from xpander_sdk.core.state import State
from xpander_sdk.utils.env import get_base_url


class Configuration(BaseModel):
    """
    Configuration settings for the xpander.ai SDK.
    
    This class manages all configuration parameters required to connect to the xpander.ai
    Backend-as-a-Service platform, including authentication credentials and service endpoints.
    
    Attributes:
        api_key (Optional[str]): Your xpander.ai API key. Defaults to XPANDER_API_KEY environment variable.
        base_url (Optional[str]): The base URL for xpander.ai API endpoints. Auto-detected from environment.
        organization_id (Optional[str]): Your organization ID. Defaults to XPANDER_ORGANIZATION_ID environment variable.
    
    Environment Variables:
        XPANDER_API_KEY: Your API key for authentication
        XPANDER_ORGANIZATION_ID: Your organization identifier
        
    Example:
        >>> config = Configuration(
        ...     api_key="your-api-key",
        ...     organization_id="your-org-id"
        ... )
        >>> full_url = config.get_full_url()
    """
    
    api_key: Optional[str] = Field(
        default_factory=lambda: getenv(key="XPANDER_API_KEY"),
        description="xpander.ai API key for authentication",
    )
    
    base_url: Optional[str] = Field(
        default_factory=get_base_url, 
        description="Base URL for xpander.ai API endpoints"
    )
    
    organization_id: Optional[str] = Field(
        default_factory=lambda: getenv(key="XPANDER_ORGANIZATION_ID"),
        description="Organization identifier for xpander.ai account",
    )
    
    state: Optional[State] = Field(
        default=State(),
        description="Configuration level in-memory state",
        exclude=True,  # This ensures it's excluded by default
    )

    def get_full_url(self) -> str:
        """
        Construct the complete API URL including organization ID when required.
        
        Some xpander.ai services require the organization ID to be included in the URL path.
        This method automatically detects when this is needed and constructs the appropriate URL.
        
        Returns:
            str: The complete URL for API requests, with organization ID included if required.
            
        Example:
            >>> config = Configuration(base_url="https://inbound.xpander.ai", organization_id="org123")
            >>> config.get_full_url()
            'https://inbound.xpander.ai'
            
            >>> config = Configuration(base_url="https://agent-controller.xpander.ai", organization_id="org123")
            >>> config.get_full_url()
            'https://agent-controller.xpander.ai/org123'
        """
        should_add_organization_id_to_the_url = (
            "agent-controller" in self.base_url or "9016" in self.base_url
        )

        if should_add_organization_id_to_the_url:
            return f"{self.base_url}/{self.organization_id}"

        return self.base_url
