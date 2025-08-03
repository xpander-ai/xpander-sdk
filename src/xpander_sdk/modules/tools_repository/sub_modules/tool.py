from typing import Dict, Any, Optional, Callable
from httpx import HTTPStatusError
from pydantic import BaseModel, computed_field, model_validator, Field
from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk.models.configuration import Configuration
from xpander_sdk.models.shared import XPanderSharedModel
from xpander_sdk.modules.tools_repository.models.tool_invocation_result import ToolInvocationResult
from xpander_sdk.modules.tools_repository.utils.generic import deep_merge, pascal_case
from xpander_sdk.modules.tools_repository.utils.local_tools import invoke_local_fn
from xpander_sdk.modules.tools_repository.utils.schemas import build_model_from_schema
from xpander_sdk.utils.event_loop import run_sync


class Tool(XPanderSharedModel):
    """
    Represents a callable tool in the xpander.ai system.

    A tool can be invoked either locally or remotely. This class handles input validation,
    dynamic schema generation, preflight checks, and invocation logic.

    Attributes:
        id (str): Unique identifier for the tool.
        name (str): Name of the tool.
        method (str): HTTP method used for remote invocation.
        path (str): Endpoint path for the tool.
        should_add_to_graph (Optional[bool]): Whether the tool should be added to the execution graph.
        is_local (Optional[bool]): Whether the tool is local.
        is_synced (Optional[bool]): Whether the tool is synchronized.
        description (str): Description of the tool.
        parameters (Dict[str, Any]): Parameter schema for the tool.
        configuration (Optional[Configuration]): Configuration for the tool.
        fn (Optional[Callable]): Callable function for local tools.
    """

    configuration: Optional[Configuration] = Configuration()

    id: str
    name: str
    method: str
    path: str
    should_add_to_graph: Optional[bool] = False
    is_local: Optional[bool] = False
    is_synced: Optional[bool] = False
    description: str = ""
    parameters: Dict[str, Any] = {}

    fn: Optional[Callable] = Field(default=None, exclude=True)

    def set_configuration(self, configuration: Configuration):
        """
        Set the configuration object for this tool.

        Args:
            configuration (Configuration): The configuration instance to associate with this tool.
        """
        self.configuration = configuration

    @computed_field
    @property
    def schema(self) -> type[BaseModel]:
        """
        Generate and return a Pydantic model schema based on the tool's parameters.

        Returns:
            type[BaseModel]: A dynamically constructed Pydantic model class.
        """
        model_name = f"{pascal_case(self.id)}PayloadSchema"
        return build_model_from_schema(model_name=model_name, schema=self.parameters)

    @model_validator(mode="before")
    @classmethod
    def set_description_from_function_desc(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        """
        Automatically sets the tool's description from the 'function_description' field if not already set.

        Args:
            values (Dict[str, Any]): Initial model values.

        Returns:
            Dict[str, Any]: Updated model values with description set if applicable.
        """
        if not values.get("description") and values.get("function_description"):
            values["description"] = values["function_description"]
        return values

    async def acall_remote_tool(
        self,
        agent_id: str,
        payload: Any,
        payload_extension: Optional[Dict[str, Any]] = {},
        configuration: Optional[Configuration] = None,
        task_id: Optional[str] = None,
        is_preflight: Optional[bool] = False,
    ) -> Any:
        """
        Asynchronously invoke the tool remotely using xpander.ai API.

        Args:
            agent_id (str): The ID of the agent calling the tool.
            payload (Any): The request payload to be sent.
            payload_extension (Optional[Dict[str, Any]]): Additional values to merge into the payload.
            configuration (Optional[Configuration]): Optional configuration override.
            task_id (Optional[str]): ID of the execution task.
            is_preflight (Optional[bool]): If True, performs a preflight check only.

        Returns:
            Any: The response from the remote API.
        """
        client = APIClient(configuration=configuration or self.configuration)
        headers = {}

        if task_id:
            headers["x-execution-id"] = task_id

        if isinstance(payload, dict) and isinstance(payload_extension, dict) and payload_extension:
            payload = deep_merge(a=payload, b=payload_extension)

        if is_preflight:
            headers["x-preflight-check"] = "true"

        return await client.make_request(
            path=APIRoute.InvokeTool.format(agent_id=agent_id, tool_id=self.id),
            method="POST",
            payload=None if is_preflight else payload,
            headers=headers,
        )

    def call_remote_tool(
        self,
        agent_id: str,
        payload: Any,
        payload_extension: Optional[Dict[str, Any]] = {},
        configuration: Optional[Configuration] = None,
        task_id: Optional[str] = None,
        is_preflight: Optional[bool] = False,
    ) -> Any:
        """
        Synchronous wrapper for `acall_remote_tool`.

        Args:
            agent_id (str): The ID of the agent calling the tool.
            payload (Any): The request payload.
            payload_extension (Optional[Dict[str, Any]]): Additional payload values.
            configuration (Optional[Configuration]): Configuration override.
            task_id (Optional[str]): Execution task ID.
            is_preflight (Optional[bool]): Preflight mode flag.

        Returns:
            Any: The response from the API.
        """
        return run_sync(self.acall_remote_tool(
            agent_id=agent_id,
            payload=payload,
            payload_extension=payload_extension,
            configuration=configuration,
            task_id=task_id,
            is_preflight=is_preflight,
        ))

    async def agraph_preflight_check(
        self,
        agent_id: str,
        configuration: Optional[Configuration] = None,
        task_id: Optional[str] = None,
    ):
        """
        Perform an asynchronous preflight check on the tool execution graph.

        Args:
            agent_id (str): The ID of the agent.
            configuration (Optional[Configuration]): Optional configuration override.
            task_id (Optional[str]): Execution task ID.

        Raises:
            Exception: If the preflight check returns an error.
        """
        try:
            if not task_id:
                return

            result = await self.acall_remote_tool(
                agent_id=agent_id,
                configuration=configuration,
                task_id=task_id,
                payload={},
                is_preflight=True,
            )

            if isinstance(result, dict) and (error := result.get("error")):
                raise Exception(error)
        except Exception:
            raise

    def graph_preflight_check(
        self,
        agent_id: str,
        configuration: Optional[Configuration] = None,
        task_id: Optional[str] = None,
    ):
        """
        Synchronous wrapper for `agraph_preflight_check`.

        Args:
            agent_id (str): The ID of the agent.
            configuration (Optional[Configuration]): Optional configuration override.
            task_id (Optional[str]): Execution task ID.

        Returns:
            Any: Result of the preflight check.
        """
        return run_sync(self.agraph_preflight_check(
            agent_id=agent_id,
            configuration=configuration,
            task_id=task_id,
        ))

    async def ainvoke(
        self,
        agent_id: str,
        payload: Any,
        payload_extension: Optional[Dict[str, Any]] = {},
        configuration: Optional[Configuration] = None,
        task_id: Optional[str] = None,
        tool_call_id: Optional[str] = None,
    ) -> ToolInvocationResult:
        """
        Asynchronously invoke the tool (local or remote), with schema validation and error handling.

        Args:
            agent_id (str): ID of the agent making the call.
            payload (Any): The input payload to the tool.
            payload_extension (Optional[Dict[str, Any]]): Optional additional payload data.
            configuration (Optional[Configuration]): Optional configuration override.
            task_id (Optional[str]): ID of the current task context.
            tool_call_id (Optional[str]): Unique ID of the tool call.

        Returns:
            ToolInvocationResult: Result object encapsulating invocation output and status.
        """
        tool_invocation_result = ToolInvocationResult(
            tool_id=self.id,
            payload=payload,
            is_local=self.is_local,
            tool_call_id=tool_call_id,
            task_id=task_id,
        )

        try:
            if self.schema and payload:
                try:
                    self.schema.model_validate(payload)
                except Exception as validation_error:
                    raise ValueError(
                        f"Invalid payload for tool '{self.name}': {validation_error}"
                    ) from validation_error

            if self.is_local:
                await self.agraph_preflight_check(
                    agent_id=agent_id,
                    configuration=configuration,
                    task_id=task_id,
                )

                if self.fn is None:
                    raise RuntimeError(f"No local function provided for this tool ({self.id}).")

                result = await invoke_local_fn(fn=self.fn, payload=payload)
                tool_invocation_result.result = result
                tool_invocation_result.is_success = True
                return tool_invocation_result

            tool_invocation_result.result = await self.acall_remote_tool(
                agent_id=agent_id,
                payload=payload,
                payload_extension=payload_extension,
                configuration=configuration,
                task_id=task_id,
            )
            tool_invocation_result.is_success = True

        except Exception as e:
            tool_invocation_result.is_error = True
            if isinstance(e, HTTPStatusError):
                tool_invocation_result.status_code = e.response.status_code
                tool_invocation_result.result = e.response.text
            else:
                tool_invocation_result.status_code = 500
                tool_invocation_result.result = str(e)

        return tool_invocation_result

    def invoke(
        self,
        agent_id: str,
        payload: Any,
        payload_extension: Optional[Dict[str, Any]] = {},
        configuration: Optional[Configuration] = None,
        task_id: Optional[str] = None,
        tool_call_id: Optional[str] = None,
    ) -> ToolInvocationResult:
        """
        Synchronous wrapper for `ainvoke`.

        Args:
            agent_id (str): ID of the agent making the call.
            payload (Any): Payload to pass to the tool.
            payload_extension (Optional[Dict[str, Any]]): Optional additional payload.
            configuration (Optional[Configuration]): Optional override configuration.
            task_id (Optional[str]): Optional execution task ID.
            tool_call_id (Optional[str]): Optional tool call ID.

        Returns:
            ToolInvocationResult: Result of the tool invocation.
        """
        return run_sync(self.ainvoke(
            agent_id=agent_id,
            payload=payload,
            payload_extension=payload_extension,
            configuration=configuration,
            task_id=task_id,
            tool_call_id=tool_call_id,
        ))
