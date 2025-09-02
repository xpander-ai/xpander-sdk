"""
Shared models and utilities for the xpander.ai SDK.

This module contains common base classes, enums, and type definitions used
across the entire SDK for consistent data handling and serialization.
"""

from abc import ABC
from enum import Enum
import json
from typing import Optional
from pydantic import BaseModel, computed_field


class XPanderSharedModel(BaseModel):
    """
    Base model class for all xpander.ai SDK models.
    
    This class extends Pydantic's BaseModel with additional functionality
    for safe serialization of complex data types including Enums.
    
    Methods:
        model_dump_safe: Safely serialize the model with proper Enum handling.
    """
    
    def model_dump_safe(self, **kwargs) -> dict:
        """
        Safely serialize the model to a dictionary with proper Enum handling.
        
        This method ensures that Enum values are properly serialized as their
        string representations rather than Enum objects, making the output
        JSON-compatible and suitable for API requests.
        
        Args:
            **kwargs: Additional keyword arguments passed to model_dump_json().
            
        Returns:
            dict: A dictionary representation of the model with all values
                 properly serialized for JSON compatibility.
                 
        Example:
            >>> class MyModel(XPanderSharedModel):
            ...     format: OutputFormat = OutputFormat.Json
            >>> model = MyModel()
            >>> model.model_dump_safe()
            {'format': 'json'}
        """
        return json.loads(self.model_dump_json(**kwargs))


class OutputFormat(str, Enum):
    """
    Enumeration of supported output formats for xpander.ai operations.
    
    This enum defines the various output formats that can be used when
    requesting data from xpander.ai services, allowing for flexible
    response formatting based on use case requirements.
    
    Values:
        Text: Plain text format for simple string responses.
        Markdown: Markdown format for rich text with formatting.
        Json: JSON format for structured data responses.
        
    Example:
        >>> format_type = OutputFormat.Markdown
        >>> print(format_type.value)
        'markdown'
    """
    
    Text = "text"
    Markdown = "markdown"
    Json = "json"


# Type alias for Language Model types
LLMModelT = type[ABC]
"""
Type alias for Language Model types.

This type alias is used throughout the SDK to represent different
LLM (Large Language Model) implementations that can be used with xpander.ai.
The models should inherit from ABC (Abstract Base Class) to ensure
proper interface implementation.
"""

class Tokens(BaseModel):
    completion_tokens: Optional[int] = 0
    prompt_tokens: Optional[int] = 0
    
    @computed_field
    @property
    def total_tokens(self) -> int:
        return self.completion_tokens+self.prompt_tokens


class ExecutionTokens(BaseModel):
    inner: Optional[Tokens] = Tokens()
    worker: Optional[Tokens] = Tokens()
