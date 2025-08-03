from pathlib import Path
from dotenv import load_dotenv
import httpx
import pytest
from xpander_sdk.consts.api_routes import APIRoute
from xpander_sdk.core.xpander_api_client import APIClient
from xpander_sdk import Configuration

# Load test environment variables
test_env_path = Path(__file__).parent / ".env"
load_dotenv(test_env_path)


@pytest.mark.asyncio
async def test_successful_request():
    """Test that configuration loads defaults from environment variables."""
    client = APIClient()
    agents_list = await client.make_request(path=APIRoute.ListAgent)
    assert isinstance(agents_list, list)
    assert len(agents_list) != 0


@pytest.mark.asyncio
async def test_bad_api_key():
    """Test that an invalid API key raises an HTTPStatusError."""
    client = APIClient()

    with pytest.raises(httpx.HTTPStatusError) as exc_info:
        await client.make_request(
            path=APIRoute.ListAgent,
            configuration=Configuration(api_key="my-bad-api-key"),
        )

    assert exc_info.value.response.status_code == 403
