from typing import List, Optional

from httpx import HTTPStatusError
from pydantic import BaseModel, Field

from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.exceptions.module_exception import ModuleException
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.modules.knowledge_bases.models.knowledge_bases import KnowledgeBaseSearchResult, KnowledgeBaseType
from xpander_sdk.modules.knowledge_bases.sub_modules.knowledge_base_document_item import KnowledgeBaseDocumentItem
from xpander_sdk.utils.event_loop import run_sync

class KnowledgeBase(BaseModel):
    configuration: Optional[Configuration] = None
    id: str = Field(...)
    name: str = Field(...)
    description: Optional[str] = Field(default=None)
    type: KnowledgeBaseType = Field(...)
    organization_id: str = Field(...)
    total_documents: int = Field(default=0)

    async def adelete(self):
        try:
            client = APIClient(configuration=self.configuration)
            await client.make_request(
                path=APIRoute.DeleteKnowledgeBase.format(knowledge_base_id=self.id),
                method="DELETE",
            )
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to delete knowledge base - {str(e)}")

    def delete(self):
        return run_sync(self.adelete())

    async def alist_documents(self) -> List[KnowledgeBaseDocumentItem]:
        try:
            client = APIClient(configuration=self.configuration)
            docs = await client.make_request(
                path=APIRoute.ListKnowledgeBaseDocuments.format(knowledge_base_id=self.id),
                method="GET",
            )
            return [KnowledgeBaseDocumentItem(**doc) for doc in docs]
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to list knowledge documents - {str(e)}")

    def list_documents(self) -> List[KnowledgeBaseDocumentItem]:
        return run_sync(self.alist_documents())

    async def adelete_multiple_documents(self, document_ids: List[str]):
        try:
            client = APIClient(configuration=self.configuration)
            await client.make_request(
                path=APIRoute.KnowledgeBaseDocumentsCrud.format(knowledge_base_id=self.id),
                payload=document_ids,
                method="DELETE",
            )
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to delete multiple knowledge base documents - {str(e)}")

    def delete_multiple_documents(self, document_ids: List[str]):
        return run_sync(self.adelete_multiple_documents(document_ids))

    async def aadd_documents(self, document_urls: List[str], sync: Optional[bool] = False) -> List[KnowledgeBaseDocumentItem]:
        try:
            client = APIClient(configuration=self.configuration)
            created_docs = await client.make_request(
                path=APIRoute.KnowledgeBaseDocumentsCrud.format(knowledge_base_id=self.id),
                payload=[{"document_url": doc_url, "sync": sync} for doc_url in document_urls],
                method="POST",
            )
            return [KnowledgeBaseDocumentItem(**doc) for doc in created_docs]
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to add knowledge base documents - {str(e)}")

    def add_documents(self, document_urls: List[str], sync: Optional[bool] = False) -> List[KnowledgeBaseDocumentItem]:
        return run_sync(self.aadd_documents(document_urls, sync))

    async def asearch(self, search_query: str, use_bubble: Optional[bool] = False, bubble_size: Optional[int] = 1000, top_k: Optional[int] = 10) -> List[KnowledgeBaseSearchResult]:
        try:
            client = APIClient(configuration=self.configuration)
            search_results = await client.make_request(
                path=APIRoute.KnowledgeBaseDocumentsCrud.format(knowledge_base_id=self.id),
                query={
                    "search_query": search_query,
                    "use_bubble": "true" if use_bubble else "false",
                    "bubble_size": bubble_size,
                    "top_k": top_k,
                },
                method="GET",
            )
            return [KnowledgeBaseSearchResult(**res) for res in search_results]
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to search in knowledge base - {str(e)}")

    def search(self, search_query: str, use_bubble: Optional[bool] = False, bubble_size: Optional[int] = 1000, top_k: Optional[int] = 10) -> List[KnowledgeBaseSearchResult]:
        return run_sync(self.asearch(search_query, use_bubble, bubble_size, top_k))