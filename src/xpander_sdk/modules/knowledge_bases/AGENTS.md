# Knowledge Bases Module - AI Agents Guide

This AGENTS.md file provides specific guidance for AI agents working with the Knowledge Bases module of the xpander.ai SDK.

## Module Overview

The Knowledge Bases module provides comprehensive functionality for managing and querying knowledge repositories within the xpander.ai platform. It supports document management, search operations, and seamless integration with AI agents for knowledge-based responses.

## Module Structure for AI Agents

```
knowledge_bases/
├── knowledge_bases_module.py      # Main module interface - entry point AI agents should understand
├── models/                        # Knowledge base data models
│   └── knowledge_bases.py        # Knowledge base definitions
├── sub_modules/                   # Sub-modules for additional functionalities
│   ├── knowledge_base.py         # Core knowledge base class
│   └── knowledge_base_document_item.py # Document management
└── utils/                         # Knowledge base utility functions
```

## Coding Conventions for AI Agents

### Knowledge Base-Specific Conventions
- AI agents should use the `KnowledgeBases` class for collection operations (create, list)
- AI agents should use the `KnowledgeBase` class for individual KB operations (search, add_documents)
- Follow the async-first pattern: `acreate()`, `asearch()`, `aadd_documents()` for production code
- Use proper type hints with knowledge base-specific models from `/models/`

### Document Management Patterns
- AI agents should validate document URLs before adding to knowledge bases
- Implement proper error handling for document processing failures
- Use batch operations for multiple document additions
- AI agents should handle document deletion gracefully

### Search Operation Patterns
- AI agents should use appropriate search parameters (top_k, bubble_size)
- Implement result pagination for large search results
- Handle search failures and empty results gracefully

## API Patterns for AI Agents

### Knowledge Base Management Operations
```python
# Correct pattern for listing knowledge bases
kb_manager = KnowledgeBases(configuration=config)
kb_list = await kb_manager.alist()

# Correct pattern for creating new knowledge base
new_kb = await kb_manager.acreate(
    name="Company Knowledge",
    description="Internal company documentation"
)

# Correct pattern for retrieving specific knowledge base
kb = await kb_manager.aget(knowledge_base_id="kb-123")
```

### Document Management Operations
```python
# AI agents should use the standard document addition pattern
documents = await kb.aadd_documents([
    "https://example.com/doc1.pdf",
    "https://example.com/doc2.txt",
    "https://example.com/doc3.docx"
], sync=True)  # Use sync=True for immediate processing

# List documents in knowledge base
doc_list = await kb.alist_documents()

# Delete multiple documents
await kb.adelete_multiple_documents(["doc1", "doc2", "doc3"])
```

### Search Operations
```python
# AI agents should use the standard search pattern
results = await kb.asearch(
    search_query="pricing strategy",
    use_bubble=True,
    bubble_size=1500,
    top_k=10
)

# Process search results properly
for result in results:
    print(f"Content: {result.content}")
    print(f"Score: {result.score}")
    print(f"Document: {result.document_name}")
```

## Data Models and Types for AI Agents

### Core Knowledge Base Models
- `KnowledgeBase`: Main knowledge base entity with search capabilities
- `KnowledgeBaseListItem`: Summary view for knowledge base collections
- `KnowledgeBaseSearchResult`: Results from search operations
- `KnowledgeBaseDocument`: Document metadata and content

### Document Management Models
- `DocumentItem`: Individual document with metadata
- `DocumentUploadResult`: Results from document addition operations
- `DocumentDeletionResult`: Results from document removal operations

## Testing Requirements for AI Agents

### Knowledge Base-Specific Tests
```bash
# Run knowledge base module tests
pytest tests/test_knowledge_bases.py

# Run specific knowledge base functionality tests
pytest tests/test_knowledge_bases.py::test_kb_creation
pytest tests/test_knowledge_bases.py::test_document_management
pytest tests/test_knowledge_bases.py::test_search_operations
```

### Test Patterns AI Agents Should Follow
- Mock external document URLs and content
- Test both local and remote document processing
- Verify proper error handling for invalid documents
- Test search result parsing and ranking
- Mock knowledge base API calls for integration tests

## Best Practices for AI Agents

### Knowledge Base Lifecycle Management
1. **Creation**: Validate knowledge base parameters and naming conventions
2. **Document Addition**: Batch document operations when possible
3. **Search Operations**: Use appropriate search parameters for performance
4. **Maintenance**: Regular cleanup of outdated documents

### Performance Considerations
- AI agents should use async methods for all I/O operations
- Implement document batching for bulk uploads
- Use appropriate search parameters to balance accuracy and performance
- Cache frequently accessed search results when appropriate

### Search Optimization Guidelines
- AI agents should craft specific search queries for better results
- Use bubble search for contextual results
- Implement proper result ranking and filtering
- Handle search timeouts gracefully

## Integration Guidelines for AI Agents

### Agent Integration
- Knowledge bases integrate seamlessly with agent operations
- AI agents should use `aproxy_knowledge_base()` method from Agent class
- Handle knowledge base connections through agent configuration

### Document Processing Integration
- Support multiple document formats (PDF, TXT, DOCX, etc.)
- AI agents should validate document accessibility before processing
- Implement proper error handling for document conversion failures

## Security Guidelines for AI Agents

### Access Control
- AI agents should verify knowledge base access permissions
- Implement proper authentication for document operations
- Never log sensitive document content

### Data Protection
- Validate document sources before processing
- Implement data sanitization for document content
- Handle document deletion requests securely

### Error Handling Patterns
```python
from xpander_sdk.exceptions import ModuleException

try:
    results = await kb.asearch("search query")
except ModuleException as e:
    logger.error(f"Knowledge base search failed: {e.description}")
except Exception as e:
    logger.error(f"Unexpected error: {str(e)}")
```

## Common Patterns AI Agents Should Follow

### Knowledge Base Factory Pattern
```python
async def create_knowledge_base_with_docs(name: str, docs: list) -> KnowledgeBase:
    """Create a knowledge base and populate with documents."""
    kb_manager = KnowledgeBases()
    kb = await kb_manager.acreate(name=name, description=f"KB for {name}")
    
    # Add documents in batches
    batch_size = 10
    for i in range(0, len(docs), batch_size):
        batch = docs[i:i + batch_size]
        await kb.aadd_documents(batch, sync=True)
    
    return kb
```

### Search Result Processing Pattern
```python
async def enhanced_search(kb: KnowledgeBase, query: str, min_score: float = 0.5):
    """Search with result filtering and processing."""
    results = await kb.asearch(
        search_query=query,
        use_bubble=True,
        bubble_size=2000,
        top_k=20
    )
    
    # Filter results by score threshold
    filtered_results = [r for r in results if r.score >= min_score]
    
    # Sort by relevance
    filtered_results.sort(key=lambda x: x.score, reverse=True)
    
    return filtered_results
```

### Document Batch Processing Pattern
```python
async def process_document_batch(kb: KnowledgeBase, documents: list):
    """Process documents in batches with error handling."""
    batch_size = 5
    successful_docs = []
    failed_docs = []
    
    for i in range(0, len(documents), batch_size):
        batch = documents[i:i + batch_size]
        try:
            results = await kb.aadd_documents(batch, sync=True)
            successful_docs.extend(results)
        except Exception as e:
            logger.error(f"Batch {i//batch_size + 1} failed: {e}")
            failed_docs.extend(batch)
    
    return successful_docs, failed_docs
```

## Advanced Usage Patterns for AI Agents

### Semantic Search Enhancement
```python
async def semantic_search_with_context(kb: KnowledgeBase, query: str, context: dict):
    """Enhanced search with contextual information."""
    # Enhance query with context
    enhanced_query = f"{query} {context.get('domain', '')} {context.get('topic', '')}"
    
    results = await kb.asearch(
        search_query=enhanced_query,
        use_bubble=True,
        bubble_size=1500,
        top_k=15
    )
    
    # Post-process results based on context
    return filter_results_by_context(results, context)
```

### Knowledge Base Synchronization
```python
async def sync_knowledge_bases(source_kb: KnowledgeBase, target_kb: KnowledgeBase):
    """Synchronize documents between knowledge bases."""
    source_docs = await source_kb.alist_documents()
    target_docs = await target_kb.alist_documents()
    
    # Find documents missing in target
    source_doc_names = {doc.name for doc in source_docs}
    target_doc_names = {doc.name for doc in target_docs}
    missing_docs = source_doc_names - target_doc_names
    
    # Copy missing documents
    for doc_name in missing_docs:
        # Implementation for document copying
        pass
```

## Troubleshooting for AI Agents

### Common Issues
1. **Knowledge base not found**: Verify KB ID and organization access
2. **Document processing failures**: Check document format and accessibility
3. **Search timeouts**: Optimize search parameters or query complexity
4. **Document upload errors**: Validate document URLs and formats

### Debugging Tips
- Enable debug logging for document processing details
- Use proper exception handling to capture search errors
- Verify document accessibility before adding to knowledge bases
- Check knowledge base permissions and configuration

## Module-Specific Environment Variables

Optional for knowledge base operations:
- `XPANDER_KB_SEARCH_TIMEOUT`: Default timeout for search operations
- `XPANDER_DOCUMENT_BATCH_SIZE`: Default batch size for document operations
- `XPANDER_KB_BUBBLE_SIZE`: Default bubble size for search operations

## Search Best Practices for AI Agents

### Query Optimization
- AI agents should use specific, targeted search queries
- Include relevant keywords and domain-specific terms
- Use appropriate search parameters for the use case

### Result Processing
- Implement proper result ranking and filtering
- Handle empty search results gracefully
- Use appropriate pagination for large result sets

### Performance Tuning
- Use bubble search for contextual results
- Adjust top_k parameter based on use case requirements
- Implement result caching for frequently accessed content

For more information, see the [main Knowledge Bases documentation](/docs/KNOWLEDGE.md).
