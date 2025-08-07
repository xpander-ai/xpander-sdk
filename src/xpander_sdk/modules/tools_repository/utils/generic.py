import re
from typing import Any, List


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


def json_type_to_python(json_type: str, prop_schema: dict = None):
    # Handle anyOf schemas (union types)
    if prop_schema and "anyOf" in prop_schema:
        # Extract non-null types from anyOf
        non_null_types = []
        for any_of_item in prop_schema["anyOf"]:
            item_type = any_of_item.get("type")
            if item_type and item_type != "null":
                non_null_types.append(json_type_to_python(item_type, any_of_item))
        
        # Return the first non-null type (this will be wrapped in Optional later)
        if non_null_types:
            return non_null_types[0]
        else:
            return Any
    
    # Extend to support arrays of objects, etc.
    if json_type == "array" and prop_schema:
        items = prop_schema.get("items", {})
        item_type = json_type_to_python(items.get("type"), items)
        return List[item_type]
    
    return {
        "string": str,
        "integer": int,
        "number": float,
        "boolean": bool,
        "object": dict,
        "array": list,
        None: Any
    }.get(json_type, Any)


def pascal_case(name: str) -> str:
    """
    Converts a string to PascalCase.
    Example: 'my_tool-name' -> 'MyToolName'
    """
    return "".join(word.capitalize() for word in re.split(r"[\s_\-]+", name) if word)
