import requests
from collections import defaultdict
from ..models.payloads import RequestPayload

def create_tool(client, tool_instructions, functionize=True):
    """
    Create a tool with the given client and tool instructions.

    Args:
        client: The client to use for making requests.
        tool_instructions (dict): The instructions for the tool, including its ID and description.
        functionize (bool, optional): Flag to create an invocation function for the tool. Defaults to True.

    Returns:
        dict: A dictionary representing the created tool, including its name, description, schema, and invocation function.
    """
    tool = {
        "name": tool_instructions['id'],
        "description": tool_instructions['function_description'],
    }

    if "parameters" in tool_instructions:
        tool['parameters'] = tool_instructions['parameters']
        tool['description'] = tool_instructions['function_description'].split(' - Valid')[0]
        tool['description'] += " IMPORTANT! make sure to use body_params, query_params, path_params. these are crucial for ensuring function calling works!"

    if functionize:
        def tool_invocation_function(**kwargs: RequestPayload):
            """
            Function to invoke the tool with the given payload.

            Args:
                kwargs (RequestPayload): The payload for the tool invocation.

            Returns:
                Any: The result of the tool invocation.
            """
            url = f"{client.agent_url}/operations/{tool_instructions['id']}"
            json_payload = kwargs if isinstance(kwargs, dict) else {}

            response = requests.post(url=url, json=json_payload, headers={"x-api-key": client.agent_key})
            response.raise_for_status()

            result = None
            try:
                result = response.json()
            except Exception:
                result = response.text
            return result

        tool_invocation_function.__doc__ = tool['description']
        tool['description'] = tool['description'][:1024]  # max length of 1024
        tool['infer_schema'] = False
        tool['args_schema'] = RequestPayload
        tool['func'] = tool_invocation_function

    return tool
