# Knowledge Bases Module Guide

The Knowledge Bases Module in xpander.ai SDK provides comprehensive functionality for managing and querying knowledge repositories. It supports both synchronous and asynchronous operations with full document management capabilities.

## Overview

This module allows developers to:

- Create and configure knowledge bases
- Add and manage documents within knowledge repositories
- Perform semantic search operations
- Delete and maintain knowledge base collections
- Retrieve detailed knowledge base information

## Classes

### KnowledgeBases

Manages the collection of knowledge bases, providing methods for creation, listing, and retrieval.

#### Key Methods

- **`acreate`**: Asynchronously create a new knowledge base.
- **`create`**: Synchronously create a new knowledge base.
- **`alist`**: Asynchronously list all available knowledge bases.
- **`list`**: Synchronously list all available knowledge bases.
- **`aget`**: Asynchronously retrieve a knowledge base by its unique ID.
- **`get`**: Synchronously retrieve a knowledge base by its unique ID.

### KnowledgeBase

Represents a single knowledge base with functionality to manage documents and perform search operations.

#### Key Properties

- **`id`**: Unique identifier for the knowledge base.
- **`name`**: Name of the knowledge base.
- **`description`**: Optional description of the knowledge base.
- **`type`**: Type of the knowledge base.
- **`organization_id`**: ID of the organization owning the knowledge base.
- **`total_documents`**: Total number of documents in the knowledge base.

#### Key Methods

##### Document Management
- **`aadd_documents`**: Asynchronously add new documents to the knowledge base.
- **`add_documents`**: Synchronously add new documents to the knowledge base.
- **`alist_documents`**: Asynchronously list all documents in the knowledge base.
- **`list_documents`**: Synchronously list all documents in the knowledge base.
- **`adelete_multiple_documents`**: Asynchronously delete multiple documents by ID.
- **`delete_multiple_documents`**: Synchronously delete multiple documents by ID.

##### Search Operations
- **`asearch`**: Asynchronously perform search operations within the knowledge base.
- **`search`**: Synchronously perform search operations within the knowledge base.

##### Knowledge Base Management
- **`adelete`**: Asynchronously delete the knowledge base.
- **`delete`**: Synchronously delete the knowledge base.

## Examples

### Create and Manage Knowledge Bases (Test-Verified)

```python
from xpander_sdk import KnowledgeBases

# Initialize Knowledge Bases module
kbs = KnowledgeBases()

# List all knowledge bases (test pattern)
kbs_list = await kbs.alist()
assert isinstance(kbs_list, list)
assert len(kbs_list) != 0
assert isinstance(kbs_list[0], KnowledgeBase)

# Get specific knowledge base by ID
kb = await kbs.aget(knowledge_base_id="2fd003b1-51b8-4f68-b0e7-68c3d63d70c9")
assert isinstance(kb, KnowledgeBase)

# Create and delete knowledge base (test pattern)
name = "KB Test"
created_kb = await kbs.acreate(name=name)
assert isinstance(created_kb, KnowledgeBase)
assert created_kb.name == name

# Clean up
await created_kb.adelete()
kbs_list = await kbs.alist()
assert not any(kb.id == created_kb.id for kb in kbs_list)
```

### Document Management and Search (Test-Based)

```python
# Create knowledge base with documents (test verified)
name = "KB Test"
created_kb = await kbs.acreate(name=name)

# Add documents with sync option
document_url = "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
created_documents = await created_kb.aadd_documents(
    document_urls=[document_url], 
    sync=True
)

assert isinstance(created_documents, list)
assert len(created_documents) != 0
assert isinstance(created_documents[0], KnowledgeBaseDocumentItem)
assert created_documents[0].document_url == document_url

# Search the document (test pattern)
search_query = "Praesent"
search_results = await created_kb.asearch(search_query=search_query)
assert isinstance(search_results, list)
assert len(search_results) != 0
assert isinstance(search_results[0], KnowledgeBaseSearchResult)
assert search_query in search_results[0].content
```

### Agent Integration with Knowledge Bases

```python
# Access agent's knowledge bases (test verified)
from xpander_sdk import Agents

agents = Agents()
agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

# Get agent knowledge bases
kbs = await agent.aget_knowledge_bases()
assert isinstance(kbs, list)
assert isinstance(kbs[0], KnowledgeBase)

# Search within agent's knowledge base
search_results = await kbs[0].asearch(search_query="David Hines", top_k=1)
assert isinstance(search_results, list)
assert isinstance(search_results[0], KnowledgeBaseSearchResult)
assert "jason53" in search_results[0].content
```

### Attaching Knowledge Bases to Agents

```python
# Create or retrieve a knowledge base
from xpander_sdk import KnowledgeBases, Agents

kb_manager = KnowledgeBases()
kb = await kb_manager.aget(knowledge_base_id="d8fd14c0-51e1-469e-a5bb-b470e8488eca")

# Load an agent
agents = Agents()
agent = await agents.aget(agent_id=XPANDER_AGENT_ID)

# Attach knowledge base to agent using the KnowledgeBase instance
agent.attach_knowledge_base(knowledge_base=kb)

# Alternative: attach using knowledge base ID directly
agent.attach_knowledge_base(knowledge_base_id="d8fd14c0-51e1-469e-a5bb-b470e8488eca")

# Verify the knowledge base is now attached to the agent
attached_kbs = await agent.aget_knowledge_bases()
assert any(k.id == kb.id for k in attached_kbs)
print(f"Agent now has {len(attached_kbs)} knowledge bases attached")

# The agent can now search across all attached knowledge bases
if agent.has_knowledge_bases:
    retriever = agent.knowledge_bases_retriever()
    search_results = retriever(
        query="search term",
        num_documents=5
    )
```

## API Reference

### `KnowledgeBases`

- **`async acreate(self, name: str, description: Optional[str] = "") -> KnowledgeBase`**: Asynchronously create a new knowledge base.
    - **Parameters**: 
        - `name` (str): The name of the new knowledge base
        - `description` (Optional[str]): A brief description of the knowledge base
    - **Returns**: `KnowledgeBase` - Newly created knowledge base object
    - **Raises**: `ModuleException` if knowledge base creation fails
    - **Example**: `>>> new_kb = await knowledge_bases.acreate(name="New Knowledge Base", description="A demo knowledge base for testing")`

- **`create(self, name: str, description: Optional[str] = "") -> KnowledgeBase`**: Synchronously create a new knowledge base.
    - **Parameters**: Same as `acreate`
    - **Returns**: `KnowledgeBase` - Newly created knowledge base object

- **`async alist(self) -> List[KnowledgeBase]`**: Asynchronously list all available knowledge bases.
    - **Returns**: `List[KnowledgeBase]` - List of knowledge base summary objects
    - **Raises**: `ModuleException` if the API request fails
    - **Example**: `>>> kb_list = await knowledge_bases.alist()`

- **`list(self) -> List[KnowledgeBase]`**: Synchronously list all available knowledge bases.
    - **Returns**: `List[KnowledgeBase]` - List of knowledge base summary objects

- **`async aget(self, knowledge_base_id: str) -> KnowledgeBase`**: Asynchronously retrieve a specific knowledge base by ID.
    - **Parameters**: `knowledge_base_id` (str): Unique identifier of the knowledge base to retrieve
    - **Returns**: `KnowledgeBase` - Complete knowledge base object
    - **Raises**: `ModuleException` if the knowledge base is not found or access is denied
    - **Example**: `>>> kb = await knowledge_bases.aget(knowledge_base_id="kb123")`

- **`get(self, knowledge_base_id: str) -> KnowledgeBase`**: Synchronously retrieve a specific knowledge base by ID.
    - **Parameters**: Same as `aget`
    - **Returns**: `KnowledgeBase` - Complete knowledge base object

### `KnowledgeBase`

#### Document Management Methods

- **`async aadd_documents(self, document_urls: List[str], sync: Optional[bool] = False) -> List[KnowledgeBaseDocumentItem]`**: Asynchronously add new documents to the knowledge base.
    - **Parameters**: 
        - `document_urls` (List[str]): List of URLs pointing to documents to add
        - `sync` (Optional[bool]): Whether to process documents synchronously
    - **Returns**: `List[KnowledgeBaseDocumentItem]` - List of created document items
    - **Raises**: `ModuleException` if adding documents fails

- **`add_documents(self, document_urls: List[str], sync: Optional[bool] = False) -> List[KnowledgeBaseDocumentItem]`**: Synchronously add new documents to the knowledge base.
    - **Parameters**: Same as `aadd_documents`
    - **Returns**: `List[KnowledgeBaseDocumentItem]` - List of created document items

- **`async alist_documents(self) -> List[KnowledgeBaseDocumentItem]`**: Asynchronously list all documents in the knowledge base.
    - **Returns**: `List[KnowledgeBaseDocumentItem]` - List of all documents in the knowledge base
    - **Raises**: `ModuleException` if listing documents fails

- **`list_documents(self) -> List[KnowledgeBaseDocumentItem]`**: Synchronously list all documents in the knowledge base.
    - **Returns**: `List[KnowledgeBaseDocumentItem]` - List of all documents in the knowledge base

- **`async adelete_multiple_documents(self, document_ids: List[str])`**: Asynchronously delete multiple documents by ID.
    - **Parameters**: `document_ids` (List[str]): List of document IDs to delete
    - **Raises**: `ModuleException` if deleting documents fails

- **`delete_multiple_documents(self, document_ids: List[str])`**: Synchronously delete multiple documents by ID.
    - **Parameters**: Same as `adelete_multiple_documents`

#### Search Methods

- **`async asearch(self, search_query: str, use_bubble: Optional[bool] = False, bubble_size: Optional[int] = 1000, top_k: Optional[int] = 10) -> List[KnowledgeBaseSearchResult]`**: Asynchronously perform search operations within the knowledge base.
    - **Parameters**: 
        - `search_query` (str): The search term or phrase
        - `use_bubble` (Optional[bool]): Whether to use bubble search mode
        - `bubble_size` (Optional[int]): Size of the search bubble if enabled
        - `top_k` (Optional[int]): Maximum number of results to return
    - **Returns**: `List[KnowledgeBaseSearchResult]` - List of search results
    - **Raises**: `ModuleException` if search fails

- **`search(self, search_query: str, use_bubble: Optional[bool] = False, bubble_size: Optional[int] = 1000, top_k: Optional[int] = 10) -> List[KnowledgeBaseSearchResult]`**: Synchronously perform search operations within the knowledge base.
    - **Parameters**: Same as `asearch`
    - **Returns**: `List[KnowledgeBaseSearchResult]` - List of search results

#### Management Methods

- **`async adelete(self)`**: Asynchronously delete the knowledge base.
    - **Raises**: `ModuleException` if deletion fails

- **`delete(self)`**: Synchronously delete the knowledge base.
    - **Description**: Removes the entire knowledge base and all its documents

## Additional Information

- Use asynchronous methods for real-time interaction.
- Synchronous versions provide flexibility for different environments.
- Full [SDK Documentation](https://docs.xpander.ai) available online.

Contact Support: dev@xpander.ai
