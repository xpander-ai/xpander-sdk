"""
Agent management and execution models for xpander.ai SDK.

This module contains data models and methods for managing and executing
agents in the xpander.ai Backend-as-a-Service platform.
"""

import asyncio
from datetime import datetime
import heapq
from typing import Any, Callable, Dict, List, Optional, Type, TypeVar
from httpx import HTTPStatusError
from loguru import logger
from pydantic import ConfigDict, computed_field

from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.exceptions.module_exception import ModuleException
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.models.frameworks import AgnoSettings, Framework
from xpander_sdk.modules.agents.utils.generic import get_db_schema_name
from xpander_sdk.modules.knowledge_bases.models.knowledge_bases import (
    KnowledgeBaseSearchResult,
)
from xpander_sdk.modules.tools_repository.models.mcp import MCPServerDetails
from xpander_sdk.models.shared import LLMModelT, OutputFormat, XPanderSharedModel
from xpander_sdk.models.user import User
from xpander_sdk.modules.agents.models.agent import (
    AgentAccessScope,
    AgentDeploymentProvider,
    AgentGraphItem,
    AgentGraphItemType,
    AgentInstructions,
    AgentOutput,
    AgentSourceNode,
    AgentStatus,
    AgentType,
    DatabaseConnectionString,
    LLMCredentials,
)
from xpander_sdk.modules.agents.models.knowledge_bases import AgentKnowledgeBase
from xpander_sdk.modules.knowledge_bases.knowledge_bases_module import KnowledgeBases
from xpander_sdk.modules.knowledge_bases.sub_modules.knowledge_base import KnowledgeBase
from xpander_sdk.modules.tasks.models.task import AgentExecutionInput
from xpander_sdk.modules.tasks.sub_modules.task import Task
from xpander_sdk.modules.tools_repository.models.tool_invocation_result import (
    ToolInvocationResult,
)
from xpander_sdk.modules.tools_repository.sub_modules.tool import Tool
from xpander_sdk.modules.tools_repository.tools_repository_module import ToolsRepository
from xpander_sdk.modules.tools_repository.utils.schemas import build_model_from_schema
from xpander_sdk.utils.event_loop import run_sync


class AgentGraph(XPanderSharedModel):
    """
    Model representing the graph structure of an agent's execution flow.

    Attributes:
        items (List[AgentGraphItem]): List of all items in the agent's execution graph.

    Methods:
        __init__: Initialize with a list of graph items.
        get_graph_item: Retrieve a specific graph item by attribute.
    """

    items: List[AgentGraphItem] = []

    def __init__(self, graph: list[AgentGraphItem]):
        """
        Initialize the agent graph with provided graph items.

        Args:
            graph (list[AgentGraphItem]): List of graph item definitions.
        """
        super().__init__()
        self.items = [AgentGraphItem(**item) for item in graph]

    def get_graph_item(self, attr: str, value: str):
        """
        Retrieve a specific item from the agent's graph based on a matching attribute.

        Args:
            attr (str): Attribute name to match.
            value (str): Value of the attribute to find.

        Returns:
            Optional[AgentGraphItem]: The graph item if found, otherwise None.
        """
        for gi in self.items:
            if getattr(gi, attr, None) == value:
                return gi
        return None
    
    @computed_field
    @property
    def sub_agents(self) -> List[str]:
        """
        Retrieve the list of sub-agent IDs associated with this agent.

        This property returns the IDs of all agents that are nested under the current agent.
        A sub-agent is identified when the `type` of the graph item matches `AgentGraphItemType.AGENT`.

        Returns:
            List[str]:  
                A list of unique string IDs representing the agents nested under this agent.
        """
        return [
            gi.item_id
            for gi in self.items
            if gi.type == AgentGraphItemType.AGENT
        ]



T = TypeVar("T", bound="Agent")


class Agent(XPanderSharedModel):
    """
        Main class for managing agent configuration and execution in xpander.ai.

        This class captures the complete state and configuration of an agent within
    the xpander.ai platform, including handling task creation, tool invocation,
    and knowledge base interactions.

        Attributes:
            configuration: Optional[Configuration]
            id: str
            organization_id: str
            name: str
            description: Optional[str]
            unique_name: str
            origin_template: Optional[str]
            environment_id: str
            deployment_provider: Optional[AgentDeploymentProvider]
            tools: Optional[ToolsRepository]
            icon: Optional[str]
            source_nodes: Optional[List[AgentSourceNode]]
            access_scope: Optional[AgentAccessScope]
            instructions: Optional[AgentInstructions]
            framework: Framework
            graph: Optional[AgentGraph]
            status: Optional[AgentStatus]
            knowledge_bases: Optional[List[AgentKnowledgeBase]]
            version: Optional[int]
            created_by: Optional[str]
            model_provider: str
            model_name: str
            webhook_url: Optional[str]
            created_at: Optional[datetime]
            type: Optional[AgentType]
            output_format: Optional[OutputFormat]
            output_schema: Optional[Dict]
            llm_credentials: Optional[LLMCredentials]
            expected_output: Optional[str]
            agno_settings: Optional[AgnoSettings]

        Example:
            >>> agent = Agent(id="agent123", name="Example Agent")
    """

    configuration: Optional[Configuration] = None
    id: str
    organization_id: str
    name: str
    description: Optional[str] = None
    unique_name: str
    origin_template: Optional[str] = None
    environment_id: str = None
    deployment_provider: Optional[AgentDeploymentProvider] = (
        AgentDeploymentProvider.XPander
    )
    tools: Optional[ToolsRepository] = None
    icon: Optional[str] = "🚀"
    source_nodes: Optional[List[AgentSourceNode]] = []
    access_scope: Optional[AgentAccessScope] = AgentAccessScope.Organizational
    instructions: Optional[AgentInstructions] = AgentInstructions(
        role=[], goal=[], general=""
    )
    framework: Framework  # agents framework
    graph: Optional[AgentGraph] = None
    status: Optional[AgentStatus] = AgentStatus.ACTIVE
    knowledge_bases: Optional[List[AgentKnowledgeBase]] = []
    version: Optional[int] = 1
    created_by: Optional[str] = None
    model_provider: str
    model_name: str
    webhook_url: Optional[str] = None
    created_at: Optional[datetime] = None
    type: Optional[AgentType] = None
    output_format: Optional[OutputFormat] = OutputFormat.Markdown
    output_schema: Optional[Dict] = None

    llm_credentials: Optional[LLMCredentials] = None
    expected_output: Optional[str] = ""
    agno_settings: Optional[AgnoSettings] = AgnoSettings()

    _connection_string: Optional[DatabaseConnectionString] = None

    model_config = ConfigDict(arbitrary_types_allowed=True)

    def model_post_init(self, context):
        """
        Post-initialization hook for the model.

        This method sets the current agent in the global state and then calls the
        parent class's `model_post_init` method.

        Parameters:
            context (Any): Context object provided during model initialization.

        Returns:
            Any: The result from the superclass `model_post_init` method.

        Note:
            This method uses `self.configuration.state.agent = self` to register the current agent
            in the global state.

        Powered by xpander.ai
        """
        self.configuration.state.agent = self
        return super().model_post_init(context)

    @computed_field
    @property
    def mcp_servers(self) -> List[MCPServerDetails]:
        """
        List MCP server details configured in the agent's graph.

        Returns:
            List[MCPServerDetails]: Details of MCP servers configured for this agent.
        """
        return [
            gi.settings.mcp_settings
            for gi in self.graph.items
            if gi.type == AgentGraphItemType.MCP
        ]

    @computed_field
    @property
    def output(self) -> AgentOutput:
        """
        Construct the output settings for this agent.

        Returns:
            AgentOutput: Output configuration based on schema and format.
        """
        return AgentOutput(
            output_schema=(
                build_model_from_schema(
                    model_name="StructuredOutput", schema=self.output_schema
                )
                if self.output_schema and self.output_format == OutputFormat.Json
                else None
            ),
            is_markdown=self.output_format == OutputFormat.Markdown,
            use_json_mode=self.output_format == OutputFormat.Json,
        )

    @classmethod
    async def aload(
        cls: Type[T],
        agent_id: str,
        configuration: Optional[Configuration] = None,
        version: Optional[int] = None,
    ) -> T:
        """
        Asynchronously load an agent's configuration and settings by ID.

        Args:
            agent_id (str): Unique identifier of the agent.
            configuration (Optional[Configuration]): SDK configuration to use.
            version (Optional[int]): Specific agent version to load.

        Returns:
            T: Loaded agent object.

        Example:
            >>> agent = await Agent.aload(agent_id="agent123")
        """
        try:
            client = APIClient(configuration=configuration)
            headers = {}
            if version:
                headers["x-agent-version"] = str(version)

            response_data: dict = await client.make_request(
                path=APIRoute.GetAgent.format(agent_id=agent_id), headers=headers
            )
            agent = cls.model_validate({**response_data, "graph": None, "tools": None, "configuration": configuration or Configuration()})
            agent.graph = AgentGraph(response_data.get("graph", []))
            agent.tools = ToolsRepository(
                configuration=agent.configuration, tools=response_data.get("tools", []), agent_graph=agent.graph
            )

            if agent.tools.should_sync_local_tools():
                asyncio.create_task(
                    agent.sync_local_tools(tools=agent.tools.get_local_tools_for_sync())
                )

            return agent
        except HTTPStatusError as e:
            raise ModuleException(
                status_code=e.response.status_code, description=e.response.text
            )
        except Exception as e:
            raise ModuleException(
                status_code=500, description=f"Failed to load agent - {str(e)}"
            )

    @classmethod
    def load(
        cls: Type[T],
        agent_id: str,
        configuration: Optional[Configuration] = None,
        version: Optional[int] = None,
    ) -> T:
        """
        Synchronously load an agent's configuration using its unique ID.

        Args:
            agent_id (str): Unique identifier of the agent.
            configuration (Optional[Configuration]): SDK configuration to use.
            version (Optional[int]): Specific agent version to load.

        Returns:
            T: Loaded agent object.

        Example:
            >>> agent = Agent.load(agent_id="agent123")
        """
        return run_sync(
            cls.aload(agent_id=agent_id, configuration=configuration, version=version)
        )

    async def aget_connection_string(self):
        """
        Asynchronously retrieve the agent's connection string from the platform.

        Returns:
            DatabaseConnectionString: The connection string details.
        """
        try:
            if self._connection_string:
                return self._connection_string

            client = APIClient(configuration=self.configuration)
            connection_string = await client.make_request(
                path=APIRoute.GetAgentConnectionString.format(agent_id=self.id)
            )
            self._connection_string = DatabaseConnectionString(**connection_string)
            return self._connection_string
        except HTTPStatusError as e:
            raise ModuleException(
                status_code=e.response.status_code, description=e.response.text
            )
        except Exception as e:
            raise ModuleException(
                status_code=500,
                description=f"Failed to get agent connection string - {str(e)}",
            )

    def get_connection_string(self):
        """
        Synchronously retrieve the agent's connection string from the platform.

        Returns:
            DatabaseConnectionString: The connection string details.

        Example:
            >>> connection_string = agent.get_connection_string()
        """
        return run_sync(self.aget_connection_string())

    async def acreate_task(
        self,
        prompt: Optional[str] = "",
        existing_task_id: Optional[str] = None,
        file_urls: Optional[List[str]] = [],
        user_details: Optional[User] = None,
        agent_version: Optional[str] = None,
        tool_call_payload_extension: Optional[dict] = None,
        source: Optional[str] = None,
        worker_id: Optional[str] = None,
        run_locally: Optional[bool] = False,
        output_format: Optional[OutputFormat] = None,
        output_schema: Optional[Dict] = None,
        events_streaming: Optional[bool] = False,
        additional_context: Optional[str] = None,
        expected_output: Optional[str] = None,
    ) -> Task:
        """
        Asynchronously create a new task and link it to this agent.

        Args:
            prompt (Optional[str]): Task initiation prompt.
            existing_task_id (Optional[str]): Existing task id if exists.
            file_urls (Optional[List[str]]): URLs of files related to the task.
            user_details (Optional[User]): User linked to this task context.
            agent_version (Optional[str]): Optional agent version to use.
            tool_call_payload_extension (Optional[dict]): Extend payload with additional information.
            source (Optional[str]): Origin or source of the request.
            worker_id (Optional[str]): Worker identifier if applicable.
            run_locally (Optional[bool]): Indicates if task should run locally.
            output_format (Optional[OutputFormat]): Format for output response.
            output_schema (Optional[Dict]): Schema defining structure of output.
            events_streaming (Optional[bool]): Flag idicating for events are required for this task.
            additional_context (Optional[str]): Additional context to be passed to the agent.
            expected_output (Optional[str]): Expected output of the execution.

        Returns:
            Task: Created Task object linked to this agent.
        """
        try:
            
            headers = {}
            if agent_version:
                headers['x-agent-version'] = str(agent_version)
            
            client = APIClient(configuration=self.configuration)
            created_task = await client.make_request(
                path=APIRoute.TaskCrud.format(agent_or_task_id=self.id),
                method="POST",
                headers=headers,
                payload={
                    "id": existing_task_id,
                    "input": AgentExecutionInput(
                        text=prompt, files=file_urls, user=user_details
                    ).model_dump(),
                    "payload_extension": tool_call_payload_extension,
                    "source": source,
                    "worker_id": worker_id,
                    "output_format": output_format,
                    "output_schema": output_schema,
                    "run_locally": run_locally,
                    "events_streaming": events_streaming,
                    "additional_context": additional_context,
                    "expected_output": expected_output
                },
            )
            return Task(**created_task, configuration=self.configuration)
        except Exception as e:
            if isinstance(e, HTTPStatusError):
                raise ModuleException(e.response.status_code, e.response.text)
            raise ModuleException(500, f"Failed to create task - {str(e)}")

    def create_task(self, *args, **kwargs) -> Task:
        """
        Synchronously create a new task for this agent.

        Args:
            *args, **kwargs: Arguments matching acreate_task.

        Returns:
            Task: Created Task object linked to this agent.

        Example:
            >>> task = agent.create_task(prompt="Analyze data files")
        """
        return run_sync(self.acreate_task(*args, **kwargs))

    async def ainvoke_tool(
        self,
        tool: Tool,
        payload: Any,
        payload_extension: Optional[Dict] = {},
        task_id: Optional[str] = None,
        tool_call_id: Optional[str] = None,
    ) -> ToolInvocationResult:
        """
        Asynchronously invoke a specific tool linked to the agent.

        Args:
            tool (Tool): Tool to be invoked during the execution.
            payload (Any): Data payload to be passed to the tool.
            payload_extension (Optional[Dict]): Optional payload extensions.
            task_id (Optional[str]): Related task ID if linked.
            tool_call_id (Optional[str]): Optional tool call identifier.

        Returns:
            ToolInvocationResult: Result object with execution details.
        """
        return await tool.ainvoke(
            agent_id=self.id,
            payload=payload,
            agent_version=self.version,
            payload_extension=payload_extension,
            task_id=task_id,
            tool_call_id=tool_call_id,
        )

    def invoke_tool(self, *args, **kwargs) -> ToolInvocationResult:
        """
        Synchronously invoke a specific tool linked to the agent.

        Args:
            *args, **kwargs: Arguments matching ainvoke_tool.

        Returns:
            ToolInvocationResult: Result object with execution details.

        Example:
            >>> result = agent.invoke_tool(my_tool, payload={"data": "value"})
        """
        return run_sync(self.ainvoke_tool(*args, **kwargs))

    async def aget_knowledge_bases(self) -> List[KnowledgeBase]:
        """
        Asynchronously retrieve all linked knowledge bases for this agent.

        Returns:
            List[KnowledgeBase]: List of linked knowledge bases.

        Example:
            >>> knowledge_bases = await agent.aget_knowledge_bases()
        """
        kb_modules = KnowledgeBases(configuration=self.configuration)
        tasks = [
            kb_modules.aget(knowledge_base_id=kb.id) for kb in self.knowledge_bases
        ]
        return await asyncio.gather(*tasks)

    def get_knowledge_bases(self) -> List[KnowledgeBase]:
        """
        Synchronously retrieve all linked knowledge bases for this agent.

        Returns:
            List[KnowledgeBase]: List of linked knowledge bases.

        Example:
            >>> knowledge_bases = agent.get_knowledge_bases()
        """
        return run_sync(self.aget_knowledge_bases())

    async def sync_local_tools(self, tools: List[Tool]):
        """
        Asynchronously sync local tools with the backend graph representation.

        Args:
            tools (List[Tool]): List of local tools to sync.
        """
        try:
            client = APIClient(configuration=self.configuration)
            response_data: dict = await client.make_request(
                path=APIRoute.SyncLocalTools.format(agent_id=self.id),
                method="PATCH",
                payload=[
                    tool.model_dump(exclude={"fn", "schema", "configuration"})
                    for tool in tools
                ],
            )
            self.graph = AgentGraph(response_data.get("graph", []))

            # set all local tools as synced
            for tool in tools:
                tool.is_synced = True
        except Exception as e:
            logger.warning(f"Failed to sync local tools - {str(e)}")

    async def aget_storage(self):
        """
        Asynchronously retrieve the storage backend for this agent.

        Returns:
            PostgresStorage: Initialized storage backend for agent sessions.

        Raises:
            NotImplementedError: If the framework does not support storage.
            ImportError: If required dependencies are missing.
            ValueError: If the connection string for storage is invalid.
        """
        if self.framework != Framework.Agno:
            raise NotImplementedError(
                f"Storage for framework '{self.framework}' is not supported."
            )

        if not self.agno_settings.session_storage:
            raise LookupError("Session storage is not enabled for this agent.")

        try:
            from agno.storage.postgres import PostgresStorage
        except ImportError as e:
            raise ImportError(
                "The 'agno' extras must be installed to use this storage backend. "
                "Run `pip install xpander-sdk[agno]`."
            ) from e

        connection_string = await self.aget_connection_string()
        if not connection_string or not connection_string.connection_uri.uri:
            raise ValueError(
                "Invalid connection string provided for Agno storage backend."
            )

        schema = get_db_schema_name(agent_id=self.id)

        return PostgresStorage(
            table_name="team_sessions" if self.agno_settings.coordinate_mode else "agent_sessions",
            schema=schema,
            db_url=connection_string.connection_uri.uri,
            auto_upgrade_schema=True,
            mode="team" if self.agno_settings.coordinate_mode else "agent"
        )

    def get_storage(self) -> Any:
        """
        Synchronously retrieve the storage backend for this agent.

        Returns:
            Any: Initialized storage backend for agent sessions.

        Example:
            >>> storage = agent.get_storage()
        """
        return run_sync(self.aget_storage())

    async def aget_memory_handler(self, model: LLMModelT):
        """
        Asynchronously retrieve the memory handler backend for user memories.

        Args:
            model (LLMModelT): Language model type to associate with memory handler.

        Returns:
            Memory: Initialized memory handler for user memories associated with the provided model.

        Raises:
            NotImplementedError: If the framework does not support user memories.
            ImportError: If required dependencies are missing.
            ValueError: If the connection string for memory storage is invalid.
        """
        if self.framework != Framework.Agno:
            raise NotImplementedError(
                f"Memory for framework '{self.framework}' is not supported."
            )

        if not self.agno_settings.user_memories:
            raise LookupError("User memories not enabled for this agent.")

        try:
            from agno.memory.v2.memory import Memory
            from agno.memory.v2.db.postgres import PostgresMemoryDb
        except ImportError as e:
            raise ImportError(
                "The 'agno' extras must be installed to use this users memory backend. "
                "Run `pip install xpander-sdk[agno]`."
            ) from e

        connection_string = await self.aget_connection_string()
        if not connection_string or not connection_string.connection_uri.uri:
            raise ValueError(
                "Invalid connection string provided for Agno storage backend."
            )

        schema = get_db_schema_name(agent_id=self.id)

        return Memory(
            model=model,
            db=PostgresMemoryDb(
                table_name="user_memories",
                schema=schema,
                db_url=connection_string.connection_uri.uri,
            ),
        )

    def get_memory_handler(self, model: LLMModelT) -> Any:
        """
        Synchronously retrieve the memory handler backend for user memories.

        Args:
            model (LLMModelT): Language model type to associate with memory handler.

        Returns:
            Any: Initialized memory handler for user memories.

        Example:
            >>> memory_handler = agent.get_memory_handler(model=my_model)
        """
        return run_sync(self.aget_memory_handler(model=model))

    @computed_field
    @property
    def search_knowledge(self) -> bool:
        """
        Check if any knowledge bases are linked to this agent.

        Returns:
            bool: True if one or more knowledge bases are linked, otherwise False.
        """
        return len(self.knowledge_bases) != 0

    def knowledge_bases_retriever(
        self,
    ) -> Callable[[str, Optional[Any], int], asyncio.Future]:
        """
        Retrieve callable to perform search within linked knowledge bases.

        Returns:
            Callable[[str, Optional[Any], int], asyncio.Future]: Function to execute a search query.
        """

        def search(
            query: str, agent: Optional[Any] = None, num_documents: int = 5, **kwargs
        ) -> Optional[List[dict]]:
            """
            Perform search across all linked knowledge bases for a query.

            Args:
                query (str): Search query string.
                agent (Optional[Any]): Optional agent context to refine query.
                num_documents (int): Number of top documents to retrieve.

            Returns:
                Optional[List[dict]]: Top matching documents from knowledge bases.
            """
            try:
                num_documents = num_documents or 10
                all_results: List[KnowledgeBaseSearchResult] = []
                # Retrieve all the agent's knowledge bases
                agents_kbs = self.get_knowledge_bases()

                # Launch concurrent searches
                for kb in agents_kbs:
                    all_results.extend(
                        kb.search(search_query=query, top_k=num_documents)
                    )

                # Sort by score descending and return top N
                sorted_results = heapq.nlargest(
                    num_documents, all_results, key=lambda x: x.score
                )

                return [result.model_dump() for result in sorted_results]

            except Exception as e:
                logger.error(f"Error during vector database search: {str(e)}")
                return []

        return search
    
    @computed_field
    @property
    def is_active(self) -> bool:
        """
        Check if the agent is active.

        Returns:
            bool: True if the agent is active, False if not.
        """
        return self.status == AgentStatus.ACTIVE
    
    async def aget_user_sessions(self, user_id: str):
        """
        Asynchronously retrieve all user sessions associated with this agent.

        This method loads all saved session records linked to the specified user ID from
        the agent's storage backend. It is only supported for agents using the Agno framework
        with session storage enabled.

        Args:
            user_id (str): Identifier of the user whose sessions are to be retrieved.

        Returns:
            Any: A list of session records associated with the user.

        Raises:
            NotImplementedError: If the agent framework does not support session storage.
            LookupError: If session storage is not enabled for this agent.
            ImportError: If required dependencies for Agno storage are not installed.
            ValueError: If the agent connection string is invalid.

        Example:
            >>> sessions = await agent.aget_user_sessions(user_id="user_123")
        """
        storage = await self.aget_storage()
        sessions = await asyncio.to_thread(storage.get_recent_sessions, user_id=user_id, limit=50)
        return sessions
    
    def get_user_sessions(self, user_id: str):
        """
        Synchronously retrieve all user sessions associated with this agent.

        This method wraps the asynchronous `aget_user_sessions` method and returns the result
        in a synchronous context. It loads session data for a given user ID from the agent's storage backend.

        Args:
            user_id (str): Identifier of the user whose sessions are to be retrieved.

        Returns:
            Any: A list of sessions related to the given user.

        Example:
            >>> sessions = agent.get_user_sessions(user_id="user_123")
        """
        return run_sync(self.aget_user_sessions(user_id=user_id))
    
    async def aget_session(self, session_id: str):
        """
        Asynchronously retrieve a single session by its session ID.

        This method accesses the agent's storage backend and loads the session record
        corresponding to the given session ID. It is only supported for agents using
        the Agno framework with session storage enabled.

        Args:
            session_id (str): Unique identifier of the session to retrieve.

        Returns:
            Any: A single session record if found, or None if the session does not exist.

        Raises:
            NotImplementedError: If the agent framework does not support session storage.
            LookupError: If session storage is not enabled for this agent.
            ImportError: If required dependencies for Agno storage are not installed.
            ValueError: If the agent connection string is invalid.

        Example:
            >>> session = await agent.aget_session(session_id="sess_456")
        """
        storage = await self.aget_storage()
        session = await asyncio.to_thread(storage.read, session_id=session_id)
        return session

    def get_session(self, session_id: str):
        """
        Synchronously retrieve a single session by its session ID.

        This method wraps the asynchronous `aget_session` and returns the result
        in a synchronous context. It retrieves the session record from the agent's
        storage backend using the given session ID.

        Args:
            session_id (str): Unique identifier of the session to retrieve.

        Returns:
            Any: A single session record if found, or None if the session does not exist.

        Example:
            >>> session = agent.get_session(session_id="sess_456")
        """
        return run_sync(self.aget_session(session_id=session_id))
    
    async def adelete_session(self, session_id: str):
        """
        Asynchronously delete a session by its session ID.

        This method removes a specific session record from the agent's storage backend
        based on the provided session ID. It is only supported for agents using the
        Agno framework with session storage enabled.

        Args:
            session_id (str): Unique identifier of the session to delete.

        Raises:
            NotImplementedError: If the agent framework does not support session storage.
            LookupError: If session storage is not enabled for this agent.
            ImportError: If required dependencies for Agno storage are not installed.
            ValueError: If the agent connection string is invalid.

        Example:
            >>> await agent.adelete_session(session_id="sess_456")
        """
        storage = await self.aget_storage()
        await asyncio.to_thread(storage.delete_session, session_id=session_id)
    
    def delete_session(self, session_id: str):
        """
        Synchronously delete a session by its session ID.

        This method wraps the asynchronous `adelete_session` and removes the session
        record from the agent's storage backend in a synchronous context.

        Args:
            session_id (str): Unique identifier of the session to delete.

        Example:
            >>> agent.delete_session(session_id="sess_456")
        """
        return run_sync(self.adelete_session(session_id=session_id))
    
    def attach_knowledge_base(
        self,
        knowledge_base: Optional[KnowledgeBase] = None,
        knowledge_base_id: Optional[str] = None
    ) -> None:
        """
        Attach a knowledge base to the agent if it is not already linked.

        This method ensures that a knowledge base is associated with the agent, either
        via a `KnowledgeBase` instance or a raw ID. It avoids duplicate links by checking
        for existing associations.

        Args:
            knowledge_base (Optional[KnowledgeBase]): The KnowledgeBase instance to attach.
            knowledge_base_id (Optional[str]): The unique identifier of the knowledge base.

        Raises:
            ValueError: If neither a knowledge base nor an ID is provided.
            TypeError: If a provided knowledge base is not a valid `KnowledgeBase` instance.

        Example:
            >>> agent.attach_knowledge_base(knowledge_base_id="kb_12345")
            >>> agent.attach_knowledge_base(knowledge_base=my_kb_instance)

        Note:
            This change only affects the runtime instance of the agent.
            To persist changes, an explicit save or sync must be called.
        """
        if not knowledge_base and not knowledge_base_id:
            raise ValueError("You must provide either a knowledge_base instance or a knowledge_base_id.")

        if knowledge_base:
            if not isinstance(knowledge_base, KnowledgeBase):
                raise TypeError("Expected 'knowledge_base' to be an instance of KnowledgeBase.")
            knowledge_base_id = knowledge_base.id

        if not any(kb.id == knowledge_base_id for kb in self.knowledge_bases):
            self.knowledge_bases.append(AgentKnowledgeBase(id=knowledge_base_id))
