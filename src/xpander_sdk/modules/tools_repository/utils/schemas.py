from typing import Optional, Type
from copy import deepcopy

from pydantic import BaseModel, ConfigDict, Field, create_model

from xpander_sdk.modules.tools_repository.utils.generic import json_type_to_python, pascal_case

from pydantic import BaseModel, create_model, ConfigDict
from typing import Optional, Type, Dict, Any

def build_model_from_schema(
    model_name: str,
    schema: dict,
    with_defaults: Optional[bool] = False
) -> Type[BaseModel]:
    fields = {}
    properties = schema.get("properties", {})
    required = set(schema.get("required", []))

    FIELD_SPECS = {
        "body_params": (
            Optional[Dict[str, Any]],
            Field(
                default={},
                description="Request body parameters (default: empty object)."
            )
        ),
        "query_params": (
            Optional[Dict[str, Any]],
            Field(
                default={},
                description="Request query parameters (default: empty object)."
            )
        ),
        "path_params": (
            Optional[Dict[str, Any]],
            Field(
                default={},
                description="Request path parameters (default: empty object)."
            )
        ),
    }

    # If with_defaults is True and schema is empty, set all three params
    if with_defaults and not properties:
        fields = FIELD_SPECS.copy()
    else:
        for prop_name, prop_schema in properties.items():
            # Skip invalid field names starting with "_"
            if prop_name.startswith("_"):
                continue
            prop_type = prop_schema.get("type")
            description = prop_schema.get("description", None)
            default = prop_schema.get("default", None)

            # Nested object support
            if prop_type == "object" and "properties" in prop_schema:
                nested_model_name = f"{model_name}{pascal_case(prop_name)}"
                base_type = build_model_from_schema(nested_model_name, prop_schema)
            else:
                # Pass the full property schema to handle anyOf correctly
                base_type = json_type_to_python(prop_type, prop_schema)

            # Field annotation and Field() construction
            annotation = base_type if prop_name in required else Optional[base_type]
            field_args = {}
            
            # Enhance description to clarify optional vs required status
            enhanced_description = description or f"Parameter: {prop_name}"
            if prop_name in required:
                if default is not None:
                    enhanced_description = f"[REQUIRED with default] {enhanced_description} (default: {default})"
                else:
                    enhanced_description = f"[REQUIRED] {enhanced_description}"
            else:
                if default is not None:
                    enhanced_description = f"[OPTIONAL with default] {enhanced_description} (default: {default})"
                else:
                    enhanced_description = f"[OPTIONAL] {enhanced_description} - can be omitted or set to null"
            
            field_args["description"] = enhanced_description

            # Set default or ... (required)
            if prop_name in required:
                if default is not None:
                    field_info = Field(default, **field_args)
                else:
                    field_info = Field(..., **field_args)
            else:
                # For optional fields, be more explicit about defaults
                if default is not None:
                    field_info = Field(default, **field_args)
                else:
                    # Make sure optional fields are clearly marked as optional with explicit default
                    field_info = Field(default=None, **field_args)

            fields[prop_name] = (annotation, field_info)


        # Ensure the presence of all three params if with_defaults is True
        if with_defaults:
            for key, (annotation, field_info) in FIELD_SPECS.items():
                if key not in fields:
                    fields[key] = (annotation, field_info)

    # After building fields, relax body/query/path if present and not already optional with a default
    for param in ("body_params", "query_params", "path_params"):
        if param in fields:
            ann, fld = fields[param]
            # If field is required (not optional) or required with default=None
            # or does not have a default
            if (ann is dict or
                ann is Dict[str, Any] or
                (hasattr(ann, '__origin__') and ann.__origin__ is dict) or
                (hasattr(ann, '__origin__') and ann.__origin__ is Dict)) \
                or (getattr(fld, 'default', None) is None and getattr(fld, 'default_factory', None) is None):
                # Make it Optional[Dict[str, Any]], with default={}
                desc = getattr(fld, 'description', None) or f"Request {param.replace('_', ' ')} (default: empty object)."
                fields[param] = (
                    Optional[Dict[str, Any]],
                    Field(default={}, description=desc)
                )

    model_config = ConfigDict(
        strict=False,  # Allow flexibility with types to handle AI agent inputs better
        extra="allow",
        title=model_name,
        description="IMPORTANT: Required fields must be provided. Optional fields can be omitted entirely or set to null. All parameters with defaults will use those defaults if not provided. Check the 'required' array in the schema to see which fields are mandatory."
    )
    return create_model(
        model_name,
        __config__=model_config,
        **fields
    )

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