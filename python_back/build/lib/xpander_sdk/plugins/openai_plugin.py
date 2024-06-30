import json
from ..core.tools import create_tool
from ..models.payloads import RequestPayload
from ..constants.plugins import Plugin

class OpenAI:
    """
    A class to handle OpenAI tools for the xpanderAI client.

    Attributes:
        client (any): The xpanderAI client instance.
    """
    client: any

    def __init__(self, xpander_client: any):
        """
        Initialize the OpenAI with the given xpanderAI client.

        Args:
            xpander_client (any): The xpanderAI client instance.
        """
        self.client = xpander_client

    def get_tools(self, functionize=False):
        """
        Retrieve tools from the xpanderAI client and convert them to StructuredTools.

        Args:
            functionize (bool): Whether to include executable functions in the tools.

        Returns:
            list: A list of StructuredTools created from the agent's tool instructions.
        """
        agent_tools = self.client.get_agent_tools()
        tools = []

        for tool_instructions in agent_tools:
            tool = create_tool(self.client, tool_instructions, functionize)
            tool_declaration = {
                "type": "function",
                "function": {
                    "name": tool['name'],
                    "description": f"{tool['description']}"[:1024]  # max length of 1024
                },
            }
            if "parameters" in tool:
                tool_declaration['function']['parameters'] = tool['parameters']

            if functionize:
                tool_declaration['function']['execute'] = tool['func']

            tools.append(tool_declaration)
        return tools

    def invoke_tool(self, tool_id, payload: RequestPayload):
        """
        Invoke a tool by its ID with the given payload.

        Args:
            tool_id (str): The ID of the tool to invoke.
            payload (RequestPayload): The payload to pass to the tool.

        Returns:
            str: The JSON-encoded result of the tool execution.
        """
        tools = self.get_tools(True)
        tool = next((tool for tool in tools if tool['function']['name'] == tool_id), None)
        if tool:
            return json.dumps(tool['function']['execute'](**payload))
        else:
            raise Exception(f"Tool {tool_id} implementation not found")

    def process_chat_response(self, messages: list[dict], chat_completion_response, ai_client):
        """
        Process the chat completion response and handle tool calls if present.

        Args:
            messages (list): The list of messages to be processed.
            chat_completion_response: The response from the chat completion.
            ai_client: The AI client instance.

        Returns:
            The processed chat completion response.
        """
        if hasattr(chat_completion_response, "choices") and isinstance(chat_completion_response.choices, list):
            for chat_choice in chat_completion_response.choices:
                if hasattr(chat_choice, 'message'):
                    response_message = chat_choice.message

                    tool_calls = response_message.tool_calls
                    if tool_calls:
                        messages.append(response_message)
                        for tool_call in tool_calls:
                            function_name = tool_call.function.name

                            try:
                                payload = json.loads(tool_call.function.arguments)
                            except Exception as e:
                                payload = None

                            function_response = self.invoke_tool(tool_id=function_name, payload=payload)
                            messages.append(
                                {
                                    "tool_call_id": tool_call.id,
                                    "role": "tool",
                                    "name": function_name,
                                    "content": function_response,
                                }
                            )
                        return self.process_chat_response(messages=messages, chat_completion_response=ai_client.chat.completions.create(
                            model="gpt-4o",
                            messages=messages,
                        ), ai_client=ai_client)

        return chat_completion_response

    @staticmethod
    def should_handle(plugin: Plugin) -> bool:
        """
        Determine if the OpenAI should handle the given plugin.

        Args:
            plugin (Plugin): The plugin to check.

        Returns:
            bool: True if the plugin is OpenAI, False otherwise.
        """
        return plugin == Plugin.OpenAI
