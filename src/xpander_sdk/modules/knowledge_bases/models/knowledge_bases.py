from enum import Enum

from pydantic import BaseModel

class KnowledgeBaseType(str, Enum):
    MANAGED = "managed"
    EXTERNAL = "external"

class KnowledgeBaseSearchResult(BaseModel):
    content: str
    score: float