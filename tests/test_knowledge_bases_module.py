import os
from pathlib import Path
from dotenv import load_dotenv
import pytest

from xpander_sdk import Agents, Agent
from xpander_sdk.modules.knowledge_bases.knowledge_bases_module import KnowledgeBases
from xpander_sdk.modules.knowledge_bases.models.knowledge_bases import KnowledgeBaseSearchResult
from xpander_sdk.modules.knowledge_bases.sub_modules.knowledge_base import KnowledgeBase
from xpander_sdk.modules.knowledge_bases.sub_modules.knowledge_base_document_item import KnowledgeBaseDocumentItem

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)

XPANDER_AGENT_ID = os.getenv("XPANDER_AGENT_ID")


@pytest.mark.asyncio
async def test_list_knowledge_bases():
    kbs = KnowledgeBases()
    kbs_list = await kbs.alist()
    assert isinstance(kbs_list, list)
    assert len(kbs_list) != 0
    assert isinstance(kbs_list[0], KnowledgeBase)

@pytest.mark.asyncio
async def test_get_knowledge_base_by_id():
    kbs = KnowledgeBases()
    kb = await kbs.aget(knowledge_base_id="2fd003b1-51b8-4f68-b0e7-68c3d63d70c9")
    assert isinstance(kb, KnowledgeBase)

@pytest.mark.asyncio
async def test_agent_knowledge_bases():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    
    # get agent kbs
    kbs = await agent.aget_knowledge_bases()
    assert isinstance(kbs, list)
    assert isinstance(kbs[0], KnowledgeBase)
    
    # make search
    search_results = await kbs[0].asearch(search_query="David Hines",top_k=1)
    assert isinstance(search_results, list)
    assert isinstance(search_results[0], KnowledgeBaseSearchResult)
    assert "jason53" in search_results[0].content


@pytest.mark.asyncio
async def test_create_and_delete_knowledge_base():
    kbs = KnowledgeBases()
    name = "KB Test"
    created_kb = await kbs.acreate(name=name)
    assert isinstance(created_kb, KnowledgeBase)
    assert created_kb.name == name
    
    await created_kb.adelete()
    kbs_list = await kbs.alist()
    assert not any(kb.id == created_kb.id for kb in kbs_list)

@pytest.mark.asyncio
async def test_create_knowledge_base_with_docs():
    kbs = KnowledgeBases()
    
    # create KB
    name = "KB Test"
    created_kb = await kbs.acreate(name=name)
    assert isinstance(created_kb, KnowledgeBase)
    assert created_kb.name == name
    
    # add docs (sync)
    document_url = "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
    created_documents = await created_kb.aadd_documents(document_urls=[document_url],sync=True)
    
    assert isinstance(created_documents, list)
    assert len(created_documents) != 0
    assert isinstance(created_documents[0], KnowledgeBaseDocumentItem)
    assert created_documents[0].document_url == document_url
    
    # search the document
    search_query = "Praesent"
    search_results = await created_kb.asearch(search_query=search_query)
    assert isinstance(search_results, list)
    assert len(search_results) != 0
    assert isinstance(search_results[0], KnowledgeBaseSearchResult)
    assert search_query in search_results[0].content
    
    # delete the kb
    await created_kb.adelete()
    kbs_list = await kbs.alist()
    assert not any(kb.id == created_kb.id for kb in kbs_list)


@pytest.mark.asyncio
async def test_global_knowledge_bases_in_agent():
    agents = Agents()
    agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

    assert isinstance(agent, Agent)
    assert agent.id == XPANDER_AGENT_ID
    
    # get kb
    kbs = KnowledgeBases()
    kb = await kbs.aget(knowledge_base_id="d8fd14c0-51e1-469e-a5bb-b470e8488eca")
    assert isinstance(kb, KnowledgeBase)
    
    # attach to the agent
    agent.attach_knowledge_base(knowledge_base=kb)
    
    # get agent kbs
    kbs = await agent.aget_knowledge_bases()
    assert isinstance(kbs, list)
    assert len(kbs) >= 1
    assert any(k.id == kb.id for k in kbs)