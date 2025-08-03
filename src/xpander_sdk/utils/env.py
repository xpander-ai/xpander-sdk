"""
Environment utilities for the xpander.ai SDK.

This module provides utilities for reading environment variables and
configuring SDK behavior based on environment settings.
"""

from os import getenv
from typing import Any


def get_base_url() -> str:
    """
    Get the base URL for xpander.ai API endpoints.
    
    This function determines the appropriate base URL for API requests based on
    environment variables. It supports both production and staging environments,
    with the ability to override via environment variables.
    
    Environment Variables:
        XPANDER_BASE_URL: Override URL for API endpoints (optional).
        IS_STG: Set to "true" for staging environment (optional, defaults to "false").
        
    Returns:
        str: The base URL for xpander.ai API endpoints.
        
    Example:
        >>> # Production environment (default)
        >>> url = get_base_url()
        >>> print(url)  # "inbound.xpander.ai"
        
        >>> # With custom override
        >>> import os
        >>> os.environ["XPANDER_BASE_URL"] = "https://custom.api.endpoint"
        >>> url = get_base_url()
        >>> print(url)  # "https://custom.api.endpoint"
    """
    # Support override by environment variable
    if env_base_url := getenv(key="XPANDER_BASE_URL"):
        return env_base_url
        
    # Determine environment (production vs staging)
    is_stg = getenv(key="IS_STG", default="false") == "true"
    
    # Return appropriate URL based on environment
    return "inbound.xpander.ai" if not is_stg else "inbound.xpander.ai"
