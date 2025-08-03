from typing import Any, Type

from pydantic import BaseModel, ConfigDict, create_model

from xpander_sdk.modules.tools_repository.utils.generic import json_type_to_python, pascal_case


def build_model_from_schema(model_name: str, schema: dict) -> Type[BaseModel]:
            fields = {}
            properties = schema.get("properties", {})
            required = schema.get("required", [])

            for prop_name, prop_schema in properties.items():
                field_type = Any
                if prop_schema.get("type") == "object" and "properties" in prop_schema:
                    # Nested object: recurse
                    nested_model_name = f"{model_name}{pascal_case(prop_name)}"
                    field_type = build_model_from_schema(nested_model_name, prop_schema)
                else:
                    # Primitive type
                    field_type = json_type_to_python(prop_schema.get("type"))

                default = ... if prop_name in required else None
                fields[prop_name] = (field_type, default)

            return create_model(model_name, **fields, __config__= ConfigDict(extra="forbid"))