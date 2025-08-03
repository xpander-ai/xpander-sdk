import pytest
import os
from pathlib import Path
from dotenv import load_dotenv
from xpander_sdk import Configuration

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)

# Get the actual values from the .env file
TEST_API_KEY = os.getenv("XPANDER_API_KEY")
TEST_BASE_URL = os.getenv("XPANDER_BASE_URL")
TEST_ORG_ID = os.getenv("XPANDER_ORGANIZATION_ID")


def test_configuration_defaults():
    """Test that configuration loads defaults from environment variables."""
    config = Configuration()
    assert config.api_key == TEST_API_KEY
    assert config.organization_id == TEST_ORG_ID


def test_configuration_override():
    config = Configuration(
        api_key="override-key",
        base_url="https://custom.xpander.ai",
        organization_id="custom-org",
    )
    assert config.api_key == "override-key"
    assert config.base_url == "https://custom.xpander.ai"
    assert config.organization_id == "custom-org"


def test_configuration_empty_env(monkeypatch):
    """Test configuration with empty environment variables."""
    # Clear the relevant environment variables
    monkeypatch.delenv("XPANDER_API_KEY", raising=False)
    monkeypatch.delenv("XPANDER_ORGANIZATION_ID", raising=False)
    monkeypatch.delenv("XPANDER_BASE_URL", raising=False)
    monkeypatch.delenv("IS_STG", raising=False)

    config = Configuration()
    assert config.api_key is None
    assert config.organization_id is None
    # Base URL should default to the hardcoded value
    assert config.base_url == "inbound.xpander.ai"
