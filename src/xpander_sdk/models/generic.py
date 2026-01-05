from enum import Enum
from typing import Optional

from xpander_sdk.models.shared import XPanderSharedModel

class LLMCredentialsKeyType(str, Enum):
    XPander = "xpander"
    Custom = "custom"

class LLMCredentials(XPanderSharedModel):
    name: str
    description: Optional[str] = None
    value: str

class LLMModelProvider(Enum):
    OpenAI = "openai"
    NvidiaNIM = "nim"
    AmazonBedrock = "amazon_bedrock"
    HuggingFace = "huggingFace"
    FriendliAI = "friendlyAI"
    Anthropic = "anthropic"
    GoogleGemini = "gemini"
    Fireworks = "fireworks"
    GoogleAIStudio = "google_ai_studio"
    Helicone = "helicone"
    OpenRouter = "open_router"
    Nebius = "nebius"