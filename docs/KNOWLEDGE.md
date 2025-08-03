# Knowledge Bases Module Guide

The Knowledge Bases Module in xpander.ai SDK provides functionality for managing and querying knowledge repositories. It supports both synchronous and asynchronous operations.

## Overview

This module allows developers to:

- Create and configure knowledge bases
- Manage and search within knowledge repositories
- Retrieve detailed knowledge base information

## Classes

### KnowledgeBases

Manages the collection of knowledge bases, providing methods for creation, listing, and retrieval.

#### Key Methods

- **`acreate`**: Asynchronously create a new knowledge base.
- **`alist`**: Asynchronously list all available knowledge bases.
- **`aget`**: Asynchronously retrieve a knowledge base by its unique ID.

### KnowledgeBase

Represents a single knowledge base with functionality to manage documents and perform search operations.

#### Key Methods

- **`aadd_documents`**: Asynchronously add new documents to the knowledge base.
  - **Note**: This is an asynchronous function that adds documents in a non-blocking manner.
- **`add_documents`**: Synchronously add new documents to the knowledge base.
- **`alist_documents`**: Asynchronously list all documents in the knowledge base.
- **`list_documents`**: Synchronously list all documents in the knowledge base.
- **`adelete_multiple_documents`**: Asynchronously delete multiple documents by ID.
- **`delete_multiple_documents`**: Synchronously delete multiple documents by ID.
- **`adelete`**: Asynchronously delete the knowledge base.
- **`delete`**: Synchronously delete the knowledge base.
- **`asearch`**: Asynchronously perform search operations within the knowledge base.
  - **Note**: This is an asynchronous function that performs searches in a non-blocking manner.
- **`search`**: Synchronously perform search operations within the knowledge base.

## Examples

### Create and Manage Knowledge Bases

```python
from xpander_sdk import KnowledgeBases

# Initialize Knowledge Bases module
knowledge_bases = KnowledgeBases(configuration=config)

# Create a new knowledge base
new_kb = await knowledge_bases.acreate(
    name="New KB",
    description="A knowledge base for testing"
)

# List all knowledge bases
kbs = await knowledge_bases.alist()
for kb in kbs:
    print(f"Knowledge Base ID: {kb.id}, Name: {kb.name}")
```

### Retrieve and Search Knowledge Base

```python
# Retrieve a specific knowledge base
specific_kb = await knowledge_bases.aget(knowledge_base_id="kb123")

# Add documents to the knowledge base
documents = await specific_kb.add_documents([
    "https://example.com/doc1",
    "https://example.com/doc2"
])

# Search within the knowledge base
results = await specific_kb.search(search_query="pricing strategy", top_k=5)
for result in results:
    print(result.content)
```

## API Reference

### `KnowledgeBases`

- **`async acreate(name: str, ...)`**: Create a new knowledge base asynchronously
    - **Parameters**: `name` (str): The knowledge base name. `description` (str): Details about the knowledge base.
    - **Returns**: An instance of `KnowledgeBase`.

- **`async alist()`**: List all knowledge bases
    - **Returns**: A list of `KnowledgeBase` summary objects.

- **`async aget(knowledge_base_id: str)`**: Get a knowledge base by ID
    - **Parameters**: `knowledge_base_id` (str): The unique ID of the knowledge base.
    - **Returns**: A complete `KnowledgeBase` object.

### `KnowledgeBase`

- **`async add_documents(document_urls: List[str], ...): Add documents to knowledge base.
- **`async search(search_query: str, ...)`**: Search within the knowledge base
    - **Parameters**: `search_query` (str): The search term or phrase.
    - **Returns**: List of `KnowledgeBaseSearchResult`.

## Additional Information

- Use asynchronous methods for real-time interaction.
- Synchronous versions provide flexibility for different environments.
- Full [SDK Documentation](https://docs.xpander.ai) available online.

Contact Support: dev@xpander.ai
