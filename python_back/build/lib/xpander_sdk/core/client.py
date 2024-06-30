import json
import requests
from ..constants.plugins import Plugin
from ..plugins import LangChain, OpenAI

# List of plugin handlers available for use
PLUGIN_HANDLERS = [LangChain, OpenAI]

class XpanderClient:
    """
    A client to interact with the xpanderAI AI service.

    Attributes:
        agent_key (str): The API key for the agent.
        agent_url (str): The URL for the agent.
        tools_cache (dict): A cache for the tools retrieved from the agent.
    """
    agent_key: str
    agent_url: str
    tools_cache: dict

    def __init__(self, agent_key: str, agent_url: str) -> None:
        """
        Initialize the XpanderClient with the agent key and URL.

        Args:
            agent_key (str): The API key for the agent.
            agent_url (str): The URL for the agent.
        """
        self.agent_key = agent_key
        self.agent_url = agent_url

    def get_agent_tools(self):
        """
        Retrieve tools from the agent if not already cached.

        Returns:
            dict: The tools retrieved from the agent.

        Raises:
            Exception: If the tools could not be retrieved or are malformed.
        """
        if hasattr(self, 'tools_cache'):
            return self.tools_cache

        try:
            result = requests.post(
                f"{self.agent_url}/tools",
                headers={"x-api-key": self.agent_key}
            )

            if result.status_code != 200:
                raise Exception(result.json())

            self.tools_cache = result.json()

            if not isinstance(self.tools_cache, list):
                raise Exception(f"Returned tools are malformed - {json.dumps(self.tools_cache)}")

        except Exception as e:
            raise Exception(f"Failed to get agent's spec - {str(e)}")

        return self.tools_cache

    def tools(self, plugin: Plugin):
        """
        Retrieve tools for the specified plugin.

        Args:
            plugin (Plugin): The plugin for which to retrieve tools.

        Returns:
            list: The tools for the specified plugin.

        Raises:
            Exception: If the plugin handler is not found.
        """
        handler = self.get_plugin_handler(plugin)
        return handler.get_tools()

    def get_plugin_handler(self, plugin: Plugin):
        """
        Retrieve plugin handler for the specified plugin.

        Args:
            plugin (Plugin): The plugin for which to retrieve tools.

        Returns:
            PluginHandler: The handler for the specified plugin.

        Raises:
            Exception: If the plugin handler is not found.
        """
        for PluginHandler in PLUGIN_HANDLERS:
            if PluginHandler.should_handle(plugin):
                return PluginHandler(self)
        raise Exception(f"Plugin {plugin} handler not found")

    def process_chat_response(self, messages: list[dict], plugin: Plugin, chat_completion_response, ai_client):
        """
        Process the chat completion response with the specified plugin handler.

        Args:
            messages (list): The list of messages to be processed.
            plugin (Plugin): The plugin used to process the chat response.
            chat_completion_response: The response from the chat completion.
            ai_client: The AI client instance.

        Returns:
            The processed chat completion response.

        Raises:
            Exception: If there is an issue with the handler implementation.
        """
        try:
            handler = self.get_plugin_handler(plugin)
            if hasattr(handler, "process_chat_response"):
                return handler.process_chat_response(
                    messages=messages,
                    chat_completion_response=chat_completion_response,
                    ai_client=ai_client
                )
            else:
                raise Exception("Handler implementation issue - ChatCompletion")
        except Exception as e:
            raise Exception(f"Failed to handle chat completion - {str(e)}")
