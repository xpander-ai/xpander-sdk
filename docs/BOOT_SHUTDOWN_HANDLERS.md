# Boot and Shutdown Handlers

The xpander.ai SDK provides `@on_boot` and `@on_shutdown` decorators for managing application lifecycle events. These decorators allow you to register handlers that execute during specific phases of your agent's lifecycle.

## Overview

- **`@on_boot`**: Executes before event listeners are set up, ideal for initialization tasks
- **`@on_shutdown`**: Executes during application shutdown, ideal for cleanup tasks
- Both decorators support **async and sync** functions
- Handlers are executed in **registration order**

## Boot Handlers (`@on_boot`)

Boot handlers run **before** any event listeners are established, making them perfect for initialization tasks that need to complete before your agent starts processing tasks.

### Characteristics

- Execute once during application startup
- Run **before** event listeners are registered  
- Run **before** task processing begins
- If any boot handler fails, the application **will not start**
- Executed in the order they were registered

### Usage

```python
from xpander_sdk import on_boot

@on_boot
async def initialize_database():
    """Async boot handler."""
    database = Database()
    await database.connect()
    logger.info("Database connected")

@on_boot
def load_configuration():
    """Sync boot handler."""  
    config = load_config_file()
    validate_config(config)
    logger.info("Configuration loaded")
```

### Use Cases

- Database connection setup
- Configuration file loading and validation
- External API authentication
- Cache initialization
- Environment validation
- Resource allocation

## Shutdown Handlers (`@on_shutdown`)

Shutdown handlers run during application termination, after event listeners have stopped but before final cleanup.

### Characteristics  

- Execute once during application shutdown
- Run **after** event listeners are stopped
- Run **before** final application cleanup
- Exceptions are **logged but do not prevent shutdown**
- Executed in the order they were registered
- Continue executing even if individual handlers fail

### Usage

```python
from xpander_sdk import on_shutdown

@on_shutdown
async def cleanup_database():
    """Async shutdown handler."""
    database = get_database_connection()
    await database.close()
    logger.info("Database connection closed")

@on_shutdown  
def save_application_state():
    """Sync shutdown handler."""
    state = get_current_state()
    save_state_to_file(state)
    logger.info("Application state saved")
```

### Use Cases

- Database connection cleanup
- Saving application state or metrics
- Closing file handles
- Releasing external resources
- Final logging or reporting
- Temporary file cleanup

## Execution Flow

Here's the complete application lifecycle with boot and shutdown handlers:

```
1. Application Start
   ↓
2. Execute Boot Handlers (in registration order)
   - @on_boot handlers run sequentially
   - If any fail, application stops
   ↓  
3. Set up Event Listeners
   - Signal handlers registered
   - SSE connections established
   ↓
4. Task Processing Phase
   - @on_task handlers process incoming tasks
   - Application runs normally
   ↓
5. Shutdown Signal Received (SIGINT/SIGTERM)
   ↓
6. Stop Event Listeners
   - Cancel background tasks
   - Clean up connections
   ↓
7. Execute Shutdown Handlers (in registration order)
   - @on_shutdown handlers run sequentially  
   - Exceptions logged but don't stop shutdown
   ↓
8. Final Cleanup & Exit
```

## Configuration

Both decorators accept an optional `configuration` parameter:

```python
from xpander_sdk import Configuration, on_boot, on_shutdown

custom_config = Configuration(...)

@on_boot(configuration=custom_config)
async def custom_boot_handler():
    # Uses custom configuration
    pass

@on_shutdown(configuration=custom_config)  
def custom_shutdown_handler():
    # Uses custom configuration
    pass
```

## Error Handling

### Boot Handler Errors

Boot handlers use **fail-fast** behavior:

```python
@on_boot
async def failing_boot_handler():
    raise Exception("Setup failed")
    # This will prevent the application from starting
    # The exception will be logged and re-raised
```

### Shutdown Handler Errors

Shutdown handlers use **graceful degradation**:

```python
@on_shutdown
async def failing_shutdown_handler():
    raise Exception("Cleanup failed") 
    # This will be logged as an error
    # But other shutdown handlers will still execute
    # And the application will still shut down
```

## Best Practices

### Boot Handlers

1. **Keep them fast**: Boot handlers delay application startup
2. **Handle dependencies**: Order handlers based on dependencies
3. **Validate early**: Check requirements before task processing begins
4. **Use proper error handling**: Boot failures should stop startup

```python
@on_boot
async def validate_environment():
    """Validate required environment variables."""
    required_vars = ["API_KEY", "DATABASE_URL"]
    missing = [var for var in required_vars if not os.getenv(var)]
    if missing:
        raise EnvironmentError(f"Missing required variables: {missing}")
```

### Shutdown Handlers

1. **Order matters**: Critical cleanup first, optional tasks last
2. **Be defensive**: Handle cleanup gracefully even if resources are unavailable
3. **Set timeouts**: Don't block shutdown indefinitely
4. **Log appropriately**: Important for debugging shutdown issues

```python
@on_shutdown
async def graceful_database_cleanup():
    """Gracefully close database with timeout."""
    try:
        if database and database.is_connected():
            await asyncio.wait_for(database.close(), timeout=5.0)
            logger.info("Database closed gracefully")
    except asyncio.TimeoutError:
        logger.warning("Database cleanup timed out")
    except Exception as e:
        logger.error(f"Database cleanup error: {e}")
```

## Integration with Existing Code

Boot and shutdown handlers integrate seamlessly with existing `@on_task` handlers:

```python
from xpander_sdk import on_boot, on_shutdown, on_task

# Initialize resources
@on_boot
async def setup_resources():
    global shared_resource
    shared_resource = await create_resource()

# Use resources in task processing  
@on_task
async def process_task(task):
    result = await shared_resource.process(task.input.text)
    task.result = result
    return task

# Clean up resources
@on_shutdown
async def cleanup_resources():
    global shared_resource
    if shared_resource:
        await shared_resource.close()
```

## Multiple Handlers

You can register multiple handlers of each type:

```python
# Multiple boot handlers - execute in registration order
@on_boot
def first_boot_task():
    logger.info("First boot task")

@on_boot  
async def second_boot_task():
    logger.info("Second boot task")
    
@on_boot
def third_boot_task():
    logger.info("Third boot task")

# Multiple shutdown handlers - execute in registration order
@on_shutdown
async def first_cleanup():
    logger.info("First cleanup")

@on_shutdown
def second_cleanup(): 
    logger.info("Second cleanup")
```

## Testing

When testing applications with boot/shutdown handlers:

```python
import pytest
from xpander_sdk.modules.events.events_module import Events

@pytest.fixture(autouse=True)
def clear_handlers():
    """Clear handlers between tests."""
    Events._boot_handlers.clear()
    Events._shutdown_handlers.clear()

def test_boot_handlers():
    """Test boot handler registration and execution."""
    executed = []
    
    @on_boot
    def test_handler():
        executed.append("test")
    
    # Verify handler was registered
    assert len(Events._boot_handlers) == 1
    
    # Test execution (would normally happen in Events.start())
    # This is simplified for testing purposes
```

## Troubleshooting

### Common Issues

1. **Boot handler blocking startup**
   - Check for infinite loops or blocking operations
   - Add timeout wrapping for external calls
   - Verify all handlers are properly async/await

2. **Shutdown handlers not executing**
   - Ensure proper signal handling setup
   - Check that application is using Events system
   - Verify handlers are registered before startup

3. **Handler execution order**
   - Handlers execute in registration/import order
   - Use explicit dependency management if needed
   - Consider breaking complex handlers into smaller ones

### Debug Logging

Enable debug logging to see handler execution:

```python
import logging
logging.basicConfig(level=logging.DEBUG)

# You'll see logs like:
# DEBUG: Boot handler registered: initialize_database  
# INFO: Executing 3 boot handler(s)...
# DEBUG: Boot handler executed successfully: initialize_database
```

## Conclusion

Boot and shutdown handlers provide a clean, declarative way to manage application lifecycle in xpander.ai agents. They ensure proper initialization and cleanup while maintaining the event-driven architecture of the SDK.

For comprehensive tests and usage patterns, see `tests/test_boot_shutdown_handlers.py` in the SDK repository.
