from typing import Optional

from httpx import HTTPStatusError
from pydantic import BaseModel, Field

from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.exceptions.module_exception import ModuleException
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.knowledge_bases.models.knowledge_bases import KnowledgeBaseType

class KnowledgeBaseDocumentItem(BaseModel):
    """
    Represents a document item within a Knowledge Base.

    Attributes:
        kb_id (Optional[str]): KB identifier.
        id (str): Document unique identifier.
        document_url (str): URL of the document.
        raw_data (Optional[str]): Raw textual data of the document.
        local_env (Optional[bool]): Indicates if the document is in a local environment. Defaults to False.
    """
    configuration: Optional[Configuration] = None
    kb_id: Optional[str] = Field(description="KB identifier", default=None)
    id: Optional[str] = Field(default=None, description="Document unique identifier")
    document_url: str = Field(..., description="Document URL")
    raw_data: Optional[str] = Field(description="Raw data (textual)", default=None)
    
    async def delete(self):
        try:
            client = APIClient(configuration=self.configuration)
            await client.make_request(
                path=APIRoute.KnowledgeBaseDocumentsCrud.format(knowledge_base_id=self.kb_id),
                payload=[self.id],
                method="DELETE",
            )
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to delete knowledge base document - {str(e)}")