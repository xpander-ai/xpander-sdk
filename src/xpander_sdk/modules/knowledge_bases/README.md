# Knowledge Bases Module

The Knowledge Bases Module provides comprehensive functionality for managing and querying knowledge repositories within the xpander.ai platform. It supports document management, search operations, and seamless integration with AI agents.

## Overview

This module handles:
- Knowledge base creation and management
- Document addition and removal
- Search and retrieval operations
- Integration with agents for knowledge-based responses
- Asynchronous and synchronous operations

## Structure

```
knowledge_bases/
├── knowledge_bases_module.py      # Main module interface
├── models/                        # Knowledge base data models
│   └── knowledge_bases.py        # Knowledge base definitions
├── sub_modules/                   # Sub-modules for additional functionalities
│   ├── knowledge_base.py         # Core knowledge base class
│   └── knowledge_base_document_item.py # Document management
└── utils/                         # Knowledge base utility functions
```

## Key Classes

### `KnowledgeBases`
Interface for knowledge base management operations.

**Methods:**
- `acreate()` / `create()`: Create a new knowledge base
- `alist()` / `list()`: List all available knowledge bases
- `aget(kb_id)` / `get(kb_id)`: Retrieve a specific knowledge base
- Support for both async and sync operations

### `KnowledgeBase`
Instance of a single knowledge base with search and document management capabilities.

**Key Features:**
- Document management (`aadd_documents()`, `adelete_multiple_documents()`)
- Search operations (`asearch()` / `search()`)
- Knowledge base deletion
- Document listing

## Usage Examples

### Basic Knowledge Base Operations
```python
from xpander_sdk import KnowledgeBases, KnowledgeBase

# List knowledge bases
kb_manager = KnowledgeBases()
kb_list = await kb_manager.alist()

# Create new knowledge base
new_kb = await kb_manager.acreate(
    name="Company Knowledge",
    description="Internal company documentation"
)

# Retrieve specific knowledge base
kb = await kb_manager.aget(knowledge_base_id="kb-123")
```

### Document Management
```python
# Add documents to knowledge base
documents = await kb.aadd_documents([
    "https://example.com/doc1.pdf",
    "https://example.com/doc2.txt"
], sync=True)

# List documents
doc_list = await kb.alist_documents()

# Delete documents
await kb.adelete_multiple_documents(["doc1", "doc2"])
```

### Search Operations
```python
# Search within knowledge base
results = await kb.asearch(
    search_query="pricing strategy",
    use_bubble=True,
    bubble_size=1500,
    top_k=10
)

for result in results:
    print(f"Content: {result.content}")
    print(f"Score: {result.score}")
```

## Configuration

Knowledge bases support various configuration options:

- **Type**: Managed or external knowledge bases
- **Search Parameters**: Bubble search, top-k results
- **Document Management**: Synchronous/asynchronous document processing
- **Integration**: Seamless agent integration for knowledge-based responses

## API Reference

See the main [Knowledge Guide](/docs/KNOWLEDGE.md) for detailed API documentation.

## Types and Models

The module includes comprehensive type definitions for:
- Knowledge base configuration and metadata
- Document management and metadata
- Search parameters and results
- Integration with agents

## Best Practices

1. **Async First**: Use asynchronous methods for optimal performance
2. **Document Organization**: Structure documents logically for better search results
3. **Search Optimization**: Use appropriate search parameters for your use case
4. **Resource Management**: Efficiently manage knowledge base resources and connections

## Dependencies

- `httpx`: HTTP client for API communication
- `pydantic`: Data validation and serialization
- `asyncio`: Asynchronous programming support

## Contributing

When contributing to this module:
1. Ensure backward compatibility with existing functionality
2. Include comprehensive tests and update existing tests
3. Update documentation for any API changes
4. Follow established code style and patterns

For more information, see the [main documentation](/docs/KNOWLEDGE.md).
