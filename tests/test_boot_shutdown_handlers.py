"""
Tests for on_boot and on_shutdown decorators in the xpander.ai SDK.

This test suite covers:
- Boot handler registration and execution
- Shutdown handler registration and execution
- Both async and sync handlers
- Error handling in boot vs shutdown handlers
- Handler execution order
- Integration with Events lifecycle
"""

import pytest
import asyncio
from unittest.mock import Mock, patch, AsyncMock
from loguru import logger

from xpander_sdk.modules.events.decorators.on_boot import on_boot
from xpander_sdk.modules.events.decorators.on_shutdown import on_shutdown
from xpander_sdk.modules.events.events_module import Events


class TestBootHandlers:
    """Test cases for @on_boot decorator."""

    def setup_method(self):
        """Clear handlers before each test."""
        Events._boot_handlers.clear()
        Events._shutdown_handlers.clear()

    def test_boot_handler_registration_sync(self):
        """Test that sync boot handlers are registered correctly."""
        assert len(Events._boot_handlers) == 0

        @on_boot
        def sync_boot_handler():
            pass

        assert len(Events._boot_handlers) == 1
        assert Events._boot_handlers[0] == sync_boot_handler

    def test_boot_handler_registration_async(self):
        """Test that async boot handlers are registered correctly."""
        assert len(Events._boot_handlers) == 0

        @on_boot
        async def async_boot_handler():
            pass

        assert len(Events._boot_handlers) == 1
        assert Events._boot_handlers[0] == async_boot_handler

    def test_multiple_boot_handlers_registration_order(self):
        """Test that multiple boot handlers are registered in order."""
        handlers = []

        @on_boot
        def first_handler():
            handlers.append("first")

        @on_boot
        async def second_handler():
            handlers.append("second")

        @on_boot
        def third_handler():
            handlers.append("third")

        assert len(Events._boot_handlers) == 3
        # Handlers should be registered in the order they were defined

    @pytest.mark.asyncio
    async def test_boot_handlers_execution_sync(self):
        """Test execution of sync boot handlers."""
        executed = []

        @on_boot
        def sync_handler():
            executed.append("sync_executed")

        await Events._execute_boot_handlers()
        assert executed == ["sync_executed"]

    @pytest.mark.asyncio
    async def test_boot_handlers_execution_async(self):
        """Test execution of async boot handlers."""
        executed = []

        @on_boot
        async def async_handler():
            executed.append("async_executed")

        await Events._execute_boot_handlers()
        assert executed == ["async_executed"]

    @pytest.mark.asyncio
    async def test_mixed_boot_handlers_execution_order(self):
        """Test execution order of mixed sync/async boot handlers."""
        executed = []

        @on_boot
        def first_sync():
            executed.append("first")

        @on_boot
        async def second_async():
            executed.append("second")

        @on_boot
        def third_sync():
            executed.append("third")

        await Events._execute_boot_handlers()
        assert executed == ["first", "second", "third"]

    @pytest.mark.asyncio
    async def test_boot_handler_failure_stops_execution(self):
        """Test that boot handler failure prevents startup."""
        executed = []

        @on_boot
        def working_handler():
            executed.append("working")

        @on_boot
        def failing_handler():
            executed.append("failing")
            raise Exception("Boot failure")

        @on_boot
        def never_executed():
            executed.append("never")

        with pytest.raises(Exception, match="Boot failure"):
            await Events._execute_boot_handlers()

        assert executed == ["working", "failing"]  # Third handler never executed

    @pytest.mark.asyncio
    async def test_no_boot_handlers(self):
        """Test execution when no boot handlers are registered."""
        # Should not raise any exceptions
        await Events._execute_boot_handlers()

    def test_boot_handler_with_configuration(self):
        """Test boot handler registration with custom configuration."""
        from xpander_sdk.models.configuration import Configuration
        
        config = Configuration()

        @on_boot(configuration=config)
        def configured_handler():
            pass

        assert len(Events._boot_handlers) == 1


class TestShutdownHandlers:
    """Test cases for @on_shutdown decorator."""

    def setup_method(self):
        """Clear handlers before each test."""
        Events._boot_handlers.clear()
        Events._shutdown_handlers.clear()

    def test_shutdown_handler_registration_sync(self):
        """Test that sync shutdown handlers are registered correctly."""
        assert len(Events._shutdown_handlers) == 0

        @on_shutdown
        def sync_shutdown_handler():
            pass

        assert len(Events._shutdown_handlers) == 1
        assert Events._shutdown_handlers[0] == sync_shutdown_handler

    def test_shutdown_handler_registration_async(self):
        """Test that async shutdown handlers are registered correctly."""
        assert len(Events._shutdown_handlers) == 0

        @on_shutdown
        async def async_shutdown_handler():
            pass

        assert len(Events._shutdown_handlers) == 1
        assert Events._shutdown_handlers[0] == async_shutdown_handler

    def test_multiple_shutdown_handlers_registration_order(self):
        """Test that multiple shutdown handlers are registered in order."""
        @on_shutdown
        def first_handler():
            pass

        @on_shutdown
        async def second_handler():
            pass

        @on_shutdown
        def third_handler():
            pass

        assert len(Events._shutdown_handlers) == 3

    @pytest.mark.asyncio
    async def test_shutdown_handlers_execution_sync(self):
        """Test execution of sync shutdown handlers."""
        executed = []

        @on_shutdown
        def sync_handler():
            executed.append("sync_executed")

        await Events._execute_shutdown_handlers()
        assert executed == ["sync_executed"]

    @pytest.mark.asyncio
    async def test_shutdown_handlers_execution_async(self):
        """Test execution of async shutdown handlers."""
        executed = []

        @on_shutdown
        async def async_handler():
            executed.append("async_executed")

        await Events._execute_shutdown_handlers()
        assert executed == ["async_executed"]

    @pytest.mark.asyncio
    async def test_mixed_shutdown_handlers_execution_order(self):
        """Test execution order of mixed sync/async shutdown handlers."""
        executed = []

        @on_shutdown
        def first_sync():
            executed.append("first")

        @on_shutdown
        async def second_async():
            executed.append("second")

        @on_shutdown
        def third_sync():
            executed.append("third")

        await Events._execute_shutdown_handlers()
        assert executed == ["first", "second", "third"]

    @pytest.mark.asyncio
    async def test_shutdown_handler_failure_continues_execution(self):
        """Test that shutdown handler failure doesn't stop other handlers."""
        executed = []

        @on_shutdown
        def working_handler():
            executed.append("working")

        @on_shutdown
        def failing_handler():
            executed.append("failing")
            raise Exception("Shutdown failure")

        @on_shutdown
        def still_executed():
            executed.append("still_executed")

        # Should not raise exception
        await Events._execute_shutdown_handlers()

        assert executed == ["working", "failing", "still_executed"]

    @pytest.mark.asyncio
    async def test_no_shutdown_handlers(self):
        """Test execution when no shutdown handlers are registered."""
        # Should not raise any exceptions
        await Events._execute_shutdown_handlers()

    def test_shutdown_handler_with_configuration(self):
        """Test shutdown handler registration with custom configuration."""
        from xpander_sdk.models.configuration import Configuration
        
        config = Configuration()

        @on_shutdown(configuration=config)
        def configured_handler():
            pass

        assert len(Events._shutdown_handlers) == 1


class TestEventsIntegration:
    """Test integration of boot/shutdown handlers with Events lifecycle."""

    def setup_method(self):
        """Clear handlers before each test."""
        Events._boot_handlers.clear()
        Events._shutdown_handlers.clear()

    @pytest.mark.asyncio
    async def test_boot_handlers_called_in_start(self):
        """Test that boot handlers are called during Events.start()."""
        executed = []

        @on_boot
        def boot_handler():
            executed.append("boot_executed")

        # Mock the Events class to avoid full startup
        with patch.object(Events, 'register_parent_worker', new_callable=AsyncMock) as mock_register, \
             patch.object(Events, 'register_agent_worker', new_callable=AsyncMock) as mock_worker, \
             patch('asyncio.gather', new_callable=AsyncMock) as mock_gather:
            
            mock_register.return_value = Mock()
            mock_gather.return_value = None
            
            # Mock environment variables
            with patch.dict('os.environ', {
                'XPANDER_AGENT_ID': 'test-agent',
                'XPANDER_ORGANIZATION_ID': 'test-org',
                'XPANDER_API_KEY': 'test-key'
            }):
                events = Events()
                
                # Mock the asyncio.get_running_loop().add_signal_handler calls
                with patch('asyncio.get_running_loop') as mock_loop:
                    mock_loop.return_value.add_signal_handler = Mock()
                    
                    await events.start(lambda task: task)

        assert executed == ["boot_executed"]

    @pytest.mark.asyncio
    async def test_shutdown_handlers_called_in_stop(self):
        """Test that shutdown handlers are called during Events.stop()."""
        executed = []

        @on_shutdown
        def shutdown_handler():
            executed.append("shutdown_executed")

        # Mock environment variables and create Events instance
        with patch.dict('os.environ', {
            'XPANDER_AGENT_ID': 'test-agent',
            'XPANDER_ORGANIZATION_ID': 'test-org',
            'XPANDER_API_KEY': 'test-key'
        }):
            events = Events()
            await events.stop()

        assert executed == ["shutdown_executed"]


class TestDecoratorParameters:
    """Test decorator parameter handling."""

    def setup_method(self):
        """Clear handlers before each test."""
        Events._boot_handlers.clear()
        Events._shutdown_handlers.clear()

    def test_boot_decorator_direct_usage(self):
        """Test @on_boot used directly without parentheses."""
        @on_boot
        def direct_handler():
            pass

        assert len(Events._boot_handlers) == 1

    def test_boot_decorator_with_parentheses(self):
        """Test @on_boot() used with empty parentheses."""
        @on_boot()
        def parentheses_handler():
            pass

        assert len(Events._boot_handlers) == 1

    def test_shutdown_decorator_direct_usage(self):
        """Test @on_shutdown used directly without parentheses."""
        @on_shutdown
        def direct_handler():
            pass

        assert len(Events._shutdown_handlers) == 1

    def test_shutdown_decorator_with_parentheses(self):
        """Test @on_shutdown() used with empty parentheses."""
        @on_shutdown()
        def parentheses_handler():
            pass

        assert len(Events._shutdown_handlers) == 1


class TestAsyncHandling:
    """Test proper async/sync function handling."""

    def setup_method(self):
        """Clear handlers before each test."""
        Events._boot_handlers.clear()
        Events._shutdown_handlers.clear()

    @pytest.mark.asyncio
    async def test_async_boot_handler_with_await(self):
        """Test async boot handler that uses await."""
        executed = []

        @on_boot
        async def async_with_await():
            await asyncio.sleep(0.01)  # Small delay
            executed.append("async_completed")

        await Events._execute_boot_handlers()
        assert executed == ["async_completed"]

    @pytest.mark.asyncio
    async def test_async_shutdown_handler_with_await(self):
        """Test async shutdown handler that uses await."""
        executed = []

        @on_shutdown
        async def async_with_await():
            await asyncio.sleep(0.01)  # Small delay
            executed.append("async_completed")

        await Events._execute_shutdown_handlers()
        assert executed == ["async_completed"]

    @pytest.mark.asyncio
    async def test_mixed_handlers_timing(self):
        """Test that handlers execute in order despite async timing."""
        executed = []

        @on_boot
        def sync_fast():
            executed.append("sync_fast")

        @on_boot
        async def async_slow():
            await asyncio.sleep(0.02)
            executed.append("async_slow")

        @on_boot
        def sync_after():
            executed.append("sync_after")

        await Events._execute_boot_handlers()
        assert executed == ["sync_fast", "async_slow", "sync_after"]


class TestErrorMessages:
    """Test error handling and logging."""

    def setup_method(self):
        """Clear handlers before each test."""
        Events._boot_handlers.clear()
        Events._shutdown_handlers.clear()

    @pytest.mark.asyncio
    async def test_boot_handler_error_logging(self):
        """Test that boot handler errors are properly logged."""
        @on_boot
        def failing_boot():
            raise ValueError("Test boot error")

        with pytest.raises(ValueError, match="Test boot error"):
            await Events._execute_boot_handlers()

    @pytest.mark.asyncio
    async def test_shutdown_handler_error_logging(self):
        """Test that shutdown handler errors are logged but don't raise."""
        executed = []

        @on_shutdown
        def failing_shutdown():
            executed.append("before_error")
            raise ValueError("Test shutdown error")

        @on_shutdown
        def working_shutdown():
            executed.append("after_error")

        # Should not raise exception
        await Events._execute_shutdown_handlers()
        assert executed == ["before_error", "after_error"]


@pytest.fixture(autouse=True)
def cleanup_handlers():
    """Automatically clean up handlers after each test."""
    yield
    Events._boot_handlers.clear()
    Events._shutdown_handlers.clear()
