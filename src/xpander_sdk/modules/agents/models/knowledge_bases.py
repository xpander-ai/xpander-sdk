"""
Knowledge base models for agent integration in the xpander.ai SDK.

This module contains models that define how agents interact with knowledge bases,
including access permissions.
"""

from typing import Optional

from pydantic import BaseModel

class AgentKnowledgeBase(BaseModel):
    """
    Model representing a knowledge base attached to an agent.
    
    This model defines the relationship between an agent and a knowledge base,
    including access permissions and usage configuration.
    
    Attributes:
        id (str): Unique identifier of the knowledge base.
        rw (Optional[bool]): Read/write permissions. If True, the agent can
            modify the knowledge base content. Defaults to False (read-only).
            
    Example:
        >>> kb = AgentKnowledgeBase(
        ...     id="kb-123",
        ...     rw=True  # Agent can read and write to this knowledge base
        ... )
        >>> print(f"Knowledge base {kb.id} - Read/Write: {kb.rw}")
    """
    
    id: str
    rw: Optional[bool] = False
