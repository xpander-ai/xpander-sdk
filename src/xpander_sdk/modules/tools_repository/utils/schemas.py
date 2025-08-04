from typing import Any, Optional, Type
from copy import deepcopy

from pydantic import BaseModel, ConfigDict, create_model

from xpander_sdk.modules.tools_repository.utils.generic import json_type_to_python, pascal_case

def build_model_from_schema(model_name: str, schema: dict) -> Type[BaseModel]:
    fields = {}
    properties = schema.get("properties", {})
    required = set(schema.get("required", []))

    for prop_name, prop_schema in properties.items():
        if prop_schema.get("type") == "object" and "properties" in prop_schema:
            nested_model_name = f"{model_name}{pascal_case(prop_name)}"
            base_type = build_model_from_schema(nested_model_name, prop_schema)
        else:
            base_type = json_type_to_python(prop_schema.get("type"))

        if prop_name in required:
            fields[prop_name] = (base_type, ...)
        else:
            fields[prop_name] = (Optional[base_type], None)

    return create_model(model_name, **fields, __config__=ConfigDict(extra="forbid"))

def schema_enforcement_block_and_descriptions(target_schema: dict, reference_schema: dict) -> dict:
    updated_schema = deepcopy(target_schema)

    def update_properties(target_props: dict, ref_props: dict):
        to_delete = []
        for key, ref_value in ref_props.items():
            if key not in target_props:
                continue

            # Remove if isBlocked or permanentValue present
            if ref_value.get("isBlocked") is True or "permanentValue" in ref_value:
                to_delete.append(key)
                continue

            target_field = target_props[key]

            # Override description if available
            if "description" in ref_value:
                target_field["description"] = ref_value["description"]

            # Recursively update nested objects
            if (
                ref_value.get("type") == "object"
                and "properties" in ref_value
                and target_field.get("type") == "object"
                and "properties" in target_field
            ):
                update_properties(target_field["properties"], ref_value["properties"])

        # Remove blocked/permanent fields
        for key in to_delete:
            del target_props[key]

    def walk(target: dict, ref: dict):
        if not isinstance(target, dict) or not isinstance(ref, dict):
            return

        if target.get("type") == "object" and "properties" in target and "properties" in ref:
            update_properties(target["properties"], ref["properties"])
            for key in list(target["properties"]):
                walk(target["properties"][key], ref["properties"].get(key, {}))

    walk(updated_schema, reference_schema)
    return updated_schema

def apply_permanent_values_to_payload(schema: dict, payload: dict | list) -> dict | list:
    payload = deepcopy(payload)

    def apply(schema_node, payload_node):
        if not isinstance(schema_node, dict):
            return

        schema_type = schema_node.get("type")

        if schema_type == "object" and "properties" in schema_node:
            if not isinstance(payload_node, dict):
                return  # skip if payload_node is not an object

            for key, sub_schema in schema_node["properties"].items():
                # If permanentValue is present, enforce it
                if "permanentValue" in sub_schema:
                    payload_node[key] = sub_schema["permanentValue"]

                # Recurse
                if sub_schema.get("type") == "object":
                    payload_node.setdefault(key, {})
                    apply(sub_schema, payload_node[key])
                elif sub_schema.get("type") == "array" and sub_schema.get("items", {}).get("type") == "object":
                    payload_node.setdefault(key, [{}])  # if empty, create one
                    if isinstance(payload_node[key], list):
                        for item in payload_node[key]:
                            apply(sub_schema["items"], item)

        elif schema_type == "array" and schema_node.get("items", {}).get("type") == "object":
            if isinstance(payload_node, list):
                for item in payload_node:
                    apply(schema_node["items"], item)

    apply(schema, payload)
    return payload


def enforce_schema_on_response(schema: dict, response: dict | list) -> dict | list:
    response = deepcopy(response)

    def apply(schema_node, response_node):
        if not isinstance(schema_node, dict):
            return

        schema_type = schema_node.get("type")

        if schema_type == "object" and "properties" in schema_node:
            if not isinstance(response_node, dict):
                return

            for key in list(response_node.keys()):
                sub_schema = schema_node["properties"].get(key)

                # If key not in schema, ignore
                if not sub_schema:
                    continue

                # Remove if blocked
                if sub_schema.get("isBlocked"):
                    del response_node[key]
                    continue

                # Set permanentValue if defined
                if "permanentValue" in sub_schema:
                    response_node[key] = sub_schema["permanentValue"]

                # Recurse if it's a nested object
                if sub_schema.get("type") == "object" and isinstance(response_node.get(key), dict):
                    apply(sub_schema, response_node[key])

                # Recurse if it's an array of objects
                elif sub_schema.get("type") == "array" and isinstance(response_node.get(key), list):
                    item_schema = sub_schema.get("items")
                    if item_schema and item_schema.get("type") == "object":
                        for item in response_node[key]:
                            apply(item_schema, item)

        elif schema_type == "array" and schema_node.get("items", {}).get("type") == "object":
            if isinstance(response_node, list):
                for item in response_node:
                    apply(schema_node["items"], item)

    apply(schema, response)
    return response