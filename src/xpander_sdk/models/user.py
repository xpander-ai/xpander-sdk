from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    """
    Represents the details of a user.

    Attributes:
        id (Optional[str]): The unique identifier of the user. Defaults to None.
        first_name (Optional[str]): The first name of the user. Defaults to None.
        last_name (Optional[str]): The last name of the user. Defaults to None.
        email (str): The email address of the user. This field is required.
        additional_attributes (Optional[dict]): Possible additional parameters for the assistant's service.
    """

    id: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: str
    additional_attributes: Optional[dict] = None
