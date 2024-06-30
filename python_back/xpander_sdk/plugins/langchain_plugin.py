from langchain_core.tools import StructuredTool
from ..core.tools import create_tool
from ..constants.plugins import Plugin

class LangChain:
    """
    A class to handle LangChain tools for the xpanderAI client.
    
    Attributes:
        client (any): The xpanderAI client instance.
    """
    client: any

    def __init__(self, xpander_client: any):
        """
        Initialize the LangChain with the given xpanderAI client.
        
        Args:
            xpander_client (any): The xpanderAI client instance.
        """
        self.client = xpander_client

    def get_tools(self):
        """
        Retrieve tools from the xpanderAI client and convert them to StructuredTools.
        
        Returns:
            list: A list of StructuredTools created from the agent's tool instructions.
        """
        agent_tools = self.client.get_agent_tools()
        tools = []
        
        for tool_instructions in agent_tools:
            tools.append(StructuredTool.from_function(**create_tool(self.client, tool_instructions), return_direct=True))
        
        return tools

    @staticmethod
    def should_handle(plugin: Plugin) -> bool:
        """
        Determine if the LangChain should handle the given plugin.
        
        Args:
            plugin (Plugin): The plugin to check.
        
        Returns:
            bool: True if the plugin is LangChain, False otherwise.
        """
        return True if plugin == Plugin.LangChain else False
