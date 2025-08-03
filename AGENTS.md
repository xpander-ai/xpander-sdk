# xpander.ai SDK - Agents.md Guide

This AGENTS.md file provides comprehensive guidance for AI agents working with the xpander.ai SDK codebase.

## Project Overview

The xpander.ai SDK is a Python Backend-as-a-Service (BaaS) platform for building, deploying, and managing AI agents at scale. This SDK provides comprehensive tools for agent management, task execution, tools integration, knowledge bases, and event handling.

## Project Structure for AI Agent Navigation

- `/src/xpander_sdk/`: Main SDK source code that AI agents should analyze
  - `/core/`: Core API client and base classes - fundamental components AI agents should understand
  - `/models/`: Pydantic models and configurations - AI agents should maintain type safety
  - `/modules/`: Main functional modules - each has its own AGENTS.md for specific guidance
    - `/agents/`: Agent management functionality
    - `/tasks/`: Task execution and lifecycle management
    - `/tools_repository/`: External tools and integrations
    - `/knowledge_bases/`: Knowledge management and search capabilities
    - `/events/`: Event-driven programming with decorators
  - `/utils/`: Utility functions - AI agents should leverage existing utilities
  - `/consts/`: Constants and configuration values
  - `/exceptions/`: Custom exception classes
- `/tests/`: Test files that AI agents should maintain and extend
- `/docs/`: Documentation that AI agents should keep updated
- `/scripts/`: Utility scripts
- `/dist/`: Distribution files (AI agents should not modify directly)
- `/.venv/`: Virtual environment (AI agents should not modify directly)

## Coding Conventions for AI Agents

### General Python Conventions

- Use Python 3.9+ features as specified in setup.py
- Follow PEP 8 style guidelines with Black formatting (line length: 88)
- AI agents should use type hints for all function parameters and return values
- Use Pydantic models for data validation and serialization
- AI agents must add comprehensive docstrings for all classes and functions
- Use meaningful variable and function names that reflect xpander.ai domain concepts

### SDK-Specific Conventions

- AI agents should use async/await patterns for all API operations (both async and sync interfaces available)
- Follow the established pattern: `ModuleName` class for module management, individual classes for entities
- AI agents should use the Configuration class for all authentication and API settings
- Maintain backward compatibility when making changes to public APIs
- AI agents should use structured logging with loguru
- Handle errors gracefully with custom exception classes from `/exceptions/`

### Module Development Guidelines

- Each module should follow the established structure: `models/`, `utils/`, `sub_modules/`
- AI agents should use the base classes from `/core/` for consistent API patterns
- Implement both async (`a` prefixed methods) and sync versions of all public methods
- AI agents should use dependency injection patterns for configuration
- Follow the decorator pattern for event handling (see `/modules/events/`)

### File Naming Conventions

- Use snake_case for Python files: `agent_manager.py`, `task_executor.py`
- Use PascalCase for class names: `AgentManager`, `TaskExecutor`
- AI agents should use descriptive module names that reflect functionality
- Configuration files should be prefixed with the module name

## Testing Requirements for AI Agents

AI agents should run tests with the following commands:

```bash
# Run all tests
pytest

# Run specific module tests
pytest tests/test_agents.py
pytest tests/test_tasks.py
pytest tests/test_knowledge_bases.py

# Run tests with coverage
pytest --cov=src/xpander_sdk --cov-report=html

# Run specific test class or function
pytest tests/test_agents.py::TestAgentManager::test_create_agent
```

### Testing Standards

- AI agents should maintain minimum 80% test coverage for all new code
- Use pytest fixtures for common test data and configurations
- AI agents should write both unit tests and integration tests
- Mock external API calls using httpx-mock or similar
- Test both async and sync versions of methods
- AI agents should include error case testing for all public methods

## Development Workflow for AI Agents

### Pre-commit Checks

Before submitting changes, AI agents should run:

```bash
# Format code with Black
black src/ tests/

# Run pre-commit hooks
pre-commit run --all-files

# Type checking (if mypy is configured)
mypy src/xpander_sdk/

# Lint checking
flake8 src/ tests/

# Run full test suite
pytest
```

### Building and Distribution

```bash
# Build package
python setup.py sdist bdist_wheel

# Install in development mode
pip install -e .

# Install with optional dependencies
pip install -e .[dev,agno]
```

## API Integration Guidelines for AI Agents

### Configuration Management

- AI agents should always use the Configuration class for API settings
- Support both environment variables and explicit configuration
- Required environment variables: `XPANDER_API_KEY`, `XPANDER_ORGANIZATION_ID`
- Optional: `XPANDER_BASE_URL` (defaults to https://inbound.xpander.ai)

### HTTP Client Usage

- AI agents should use httpx for all HTTP operations
- Implement proper timeout and retry logic
- Use streaming capabilities for large responses (httpx_sse)
- AI agents should handle rate limiting and implement exponential backoff

### Error Handling

- AI agents should use custom exceptions from `/exceptions/` module
- Implement proper error recovery and user-friendly error messages
- Log errors appropriately using loguru
- Provide helpful debugging information in error messages

## Documentation Requirements for AI Agents

- AI agents should update relevant documentation in `/docs/` when adding features
- Each module should have its own documentation file (AGENTS.md, README.md)
- API changes should be documented with examples
- AI agents should maintain the main README.md with usage examples
- Update docstrings for all public APIs with parameter and return type information

## Pull Request Guidelines for AI Agents

When AI agents create a PR, ensure it:

1. Includes a clear description of changes and their purpose
2. References any related issues or feature requests
3. Ensures all tests pass and maintain coverage requirements
4. Includes appropriate documentation updates
5. Follows the established code style and conventions
6. AI agents should include examples for new features or APIs
7. Updates version numbers if needed (semantic versioning)
8. AI agents should verify compatibility with existing client code

## Security Considerations for AI Agents

- AI agents should never log or expose API keys or sensitive configuration
- Validate all input data using Pydantic models
- Implement proper authentication checks for all API operations
- AI agents should use secure HTTP (HTTPS) for all external communications
- Handle secrets and credentials through environment variables only

## Performance Guidelines for AI Agents

- AI agents should use async operations for I/O bound tasks
- Implement connection pooling for HTTP clients
- Cache frequently accessed data when appropriate
- AI agents should use streaming for large data transfers
- Monitor and optimize memory usage for large datasets
- Implement pagination for list operations

## Module-Specific Guidelines

Each module has its own AGENTS.md file with specific guidance:

- `/modules/agents/AGENTS.md` - Agent management specifics
- `/modules/tasks/AGENTS.md` - Task execution patterns
- `/modules/tools_repository/AGENTS.md` - Tools integration guidelines
- `/modules/knowledge_bases/AGENTS.md` - Knowledge management best practices
- `/modules/events/AGENTS.md` - Event-driven programming patterns

AI agents should consult the module-specific AGENTS.md files when working within those domains.
