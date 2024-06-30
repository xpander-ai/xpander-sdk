from enum import Enum

class Plugin(str, Enum):
    """
    An enumeration to represent the available plugins.

    Attributes:
        LangChain (str): Represents the 'langchain' plugin.
        OpenAI (str): Represents the 'openai' plugin.
    """
    LangChain = 'langchain'
    OpenAI = 'openai'
