import re
from typing import Any


def deep_merge(a: dict, b: dict) -> dict:
    result = a.copy()
    for key, b_value in b.items():
        if key in result:
            a_value = result[key]
            if isinstance(a_value, dict) and isinstance(b_value, dict):
                result[key] = deep_merge(a_value, b_value)
            else:
                result[key] = b_value
        else:
            result[key] = b_value
    return result


def json_type_to_python(json_type: str) -> type:
    return {
        "string": str,
        "integer": int,
        "number": float,
        "boolean": bool,
        "object": dict,
        "array": list,
    }.get(json_type, Any)


def pascal_case(name: str) -> str:
    """
    Converts a string to PascalCase.
    Example: 'my_tool-name' -> 'MyToolName'
    """
    return "".join(word.capitalize() for word in re.split(r"[\s_\-]+", name) if word)
