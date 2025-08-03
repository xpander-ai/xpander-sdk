import inspect
import asyncio
from inspect import Parameter
from pydantic import BaseModel
from typing import Any, get_type_hints


async def invoke_local_fn(fn, payload: Any):
    sig = inspect.signature(fn)
    params = sig.parameters
    is_coroutine = inspect.iscoroutinefunction(fn)
    type_hints = get_type_hints(fn)

    args = []
    kwargs = {}

    def build_param_value(param_name, param_type):
        if isinstance(payload, dict):
            if issubclass(param_type, BaseModel):
                return param_type(**payload.get(param_name, {}))
            elif param_name in payload:
                return payload[param_name]
            else:
                raise TypeError(f"Missing required argument: {param_name}")
        else:
            if issubclass(param_type, BaseModel) and isinstance(payload, dict):
                return param_type(**payload)
            return payload  # fallback for scalar values

    # Handle no parameters
    if not params:
        return await fn() if is_coroutine else await asyncio.to_thread(fn)

    # Match each parameter
    for name, param in params.items():
        expected_type = type_hints.get(name, Any)
        if param.kind in [Parameter.POSITIONAL_ONLY, Parameter.POSITIONAL_OR_KEYWORD]:
            val = build_param_value(name, expected_type)
            args.append(val)
        elif param.kind == Parameter.KEYWORD_ONLY:
            val = build_param_value(name, expected_type)
            kwargs[name] = val
        elif param.kind == Parameter.VAR_POSITIONAL:
            if isinstance(payload, (list, tuple)):
                args.extend(payload)
        elif param.kind == Parameter.VAR_KEYWORD:
            if isinstance(payload, dict):
                kwargs.update(payload)

    if is_coroutine:
        return await fn(*args, **kwargs)
    return await asyncio.to_thread(fn, *args, **kwargs)
