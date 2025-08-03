"""
Custom exception classes for the xpander.ai SDK.

This module defines SDK-specific exception types for better error handling
and debugging throughout the xpander.ai Backend-as-a-Service platform.
"""


class ModuleException(Exception):
    """
    Custom exception for xpander.ai SDK module operations.
    
    This exception is raised when SDK modules encounter errors during API
    operations, providing structured error information including HTTP status
    codes and detailed error descriptions.
    
    Attributes:
        status_code (int): HTTP status code associated with the error.
        description (str): Detailed description of the error.
        
    Example:
        >>> try:
        ...     agents = Agents()
        ...     agent = agents.get("invalid-id")
        ... except ModuleException as e:
        ...     print(f"Error {e.status_code}: {e.description}")
        ...     # Error 404: Agent not found
    """
    
    def __init__(self, status_code: int, description: str):
        """
        Initialize a ModuleException with status code and description.
        
        Args:
            status_code (int): HTTP status code representing the error type
                (e.g., 404 for not found, 401 for unauthorized, 500 for server error).
            description (str): Human-readable description of the error condition.
                
        Example:
            >>> raise ModuleException(404, "Agent with ID 'xyz' not found")
            >>> raise ModuleException(401, "Invalid API key provided")
        """
        self.status_code = status_code
        self.description = description
        super().__init__(f"[{status_code}] {description}")
