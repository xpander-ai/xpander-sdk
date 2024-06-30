from pydantic import BaseModel
from typing import Any

class RequestPayload(BaseModel):
    """
    A model to represent the request payload.

    Attributes:
        body_params (Any): The body parameters of the request.
        query_params (Any): The query parameters of the request.
        path_params (Any): The path parameters of the request.
        headers (Any): The headers of the request.
    """
    body_params: Any
    query_params: Any
    path_params: Any
    headers: Any