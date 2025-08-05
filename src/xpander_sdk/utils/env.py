"""
Environment utilities for the xpander.ai SDK.

This module provides utilities for reading environment variables and
configuring SDK behavior based on environment settings.
"""

from os import getenv

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
        str: The base URL for xpander.ai API endpoints, always prefixed with "https://".
        
    Example:
        >>> url = get_base_url()
        >>> print(url)  # "https://inbound.xpander.ai"
        
        >>> import os
        >>> os.environ["XPANDER_BASE_URL"] = "custom.api.endpoint"
        >>> url = get_base_url()
        >>> print(url)  # "https://custom.api.endpoint"
    """
    # Support override by environment variable
    base_url = getenv("XPANDER_BASE_URL")
    
    if not base_url:
        is_stg = getenv("IS_STG", "false") == "true"
        base_url = "inbound.stg.xpander.ai" if is_stg else "inbound.xpander.ai"
    
    if not base_url.startswith("http://") and not base_url.startswith("https://"):
        base_url = f"https://{base_url}"
    
    return base_url
