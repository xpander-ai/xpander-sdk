from xpander_sdk.models.configuration import Configuration

EVENT_STREAMING_ENDPOINT = "{base}/{organization_id}/events"


def backoff_delay(attempt: int) -> int:
    """1 s after first failure, 2 s after second, 3 s for attempts ≥ 3."""
    return 1 if attempt == 1 else 2 if attempt == 2 else 3


def is_not_inbound(configuration: Configuration) -> bool:
    """
    Determine if the current execution context is not the inbound environment.

    Returns:
        bool: True if the base_url is not identified as an inbound service.
    """
    return (
        "inbound.xpander" not in configuration.base_url
        and "inbound.stg.xpander" not in configuration.base_url
    )


def get_events_base(configuration: Configuration) -> str:
    """
    Construct the base URL used for event streaming endpoints.

    Returns:
        str: The base URL for event streaming based on configuration and environment.
    """
    if is_not_inbound(configuration=configuration):
        return EVENT_STREAMING_ENDPOINT.format(
            base=(
                "http://localhost:9016"
                if "8085" in configuration.base_url
                else configuration.base_url
            ),
            organization_id=configuration.organization_id,
        )

    is_stg = "stg.xpander" in configuration.base_url
    base = f"https://agent-controller{'.stg' if is_stg else ''}.xpander.ai"

    return EVENT_STREAMING_ENDPOINT.format(
        base=base, organization_id=configuration.organization_id
    )


def get_events_headers(configuration: Configuration) -> dict[str, str]:
    """
    Construct the headers required for requests, including authentication.

    Returns:
        dict[str, str]: HTTP headers including the API key for authorization.
    """
    return {"x-api-key": configuration.api_key}
