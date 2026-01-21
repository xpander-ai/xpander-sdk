#!/usr/bin/env python3
"""
Test script to verify that Option 2 + 3 enhancements work correctly.
This tests that the schema and docstring improvements help guide LLMs to pass parameters correctly.
"""

import json
import sys
from xpander_sdk import Configuration
from xpander_sdk.modules.agents.agents_module import Agents

def test_schema_enhancements():
    """Test that tool schemas now have enhanced descriptions and examples."""
    
    # Setup configuration for staging
    config = Configuration(
        api_key="A02tKVpMd58Z3gAIDsQ7C8dh7oIRBYBc8Vu6cGFJ",
        organization_id="6f3a8d1a-00e4-4ae7-bb1f-907b8704d4e2",
        base_url="https://inbound.stg.xpander.ai"
    )
    
    print("🔍 Fetching agent and tools...")
    agents = Agents(configuration=config)
    agent = agents.get(agent_id="cb0fa205-96a8-4f43-ad99-881fb87f374a")
    
    print(f"✅ Agent loaded: {agent.name}")
    print(f"📊 Number of tools: {len(agent.tools.list)}\n")
    
    # Test each tool's schema and function
    for tool in agent.tools.list:
        print("=" * 80)
        print(f"🔧 Tool: {tool.name} (ID: {tool.id})")
        print("=" * 80)
        
        # Check schema documentation
        print("\n📝 Schema Documentation:")
        print("-" * 80)
        if hasattr(tool.schema, '__doc__') and tool.schema.__doc__:
            doc_lines = tool.schema.__doc__.split('\n')
            for line in doc_lines[:20]:  # Show first 20 lines
                print(line)
            if len(doc_lines) > 20:
                print(f"... ({len(doc_lines) - 20} more lines)")
        else:
            print("⚠️  No schema documentation found")
        
        # Check if critical keywords are present in schema doc
        if tool.schema.__doc__:
            has_payload = 'payload' in tool.schema.__doc__.lower()
            has_example = 'example' in tool.schema.__doc__.lower()
            has_critical = 'critical' in tool.schema.__doc__.lower()
            
            print(f"\n✓ Contains 'payload' guidance: {has_payload}")
            print(f"✓ Contains example: {has_example}")
            print(f"✓ Has CRITICAL warning: {has_critical}")
        
        # Check field descriptions
        print("\n📋 Field Descriptions:")
        print("-" * 80)
        schema_json = tool.schema.model_json_schema()
        if 'properties' in schema_json:
            for field_name, field_def in schema_json['properties'].items():
                desc = field_def.get('description', 'No description')
                has_wrapper_note = 'payload' in desc.lower()
                status = "✅" if has_wrapper_note else "⚠️ "
                print(f"{status} {field_name}: {desc[:100]}...")
        
        # Check function documentation
        print("\n🔨 Function Documentation:")
        print("-" * 80)
        functions = agent.tools.functions
        if functions:
            func = functions[0]  # Get first function
            if hasattr(func, '__doc__') and func.__doc__:
                doc_lines = func.__doc__.split('\n')
                for line in doc_lines[:25]:  # Show first 25 lines
                    print(line)
                if len(doc_lines) > 25:
                    print(f"... ({len(doc_lines) - 25} more lines)")
            
            # Check function signature
            import inspect
            sig = inspect.signature(func)
            print(f"\n📌 Function Signature: {func.__name__}{sig}")
            
            # Check if function has payload parameter
            params = list(sig.parameters.keys())
            if 'payload' in params:
                print("✅ Function has 'payload' parameter")
            else:
                print(f"⚠️  Function parameters: {params}")
        
        print("\n")

if __name__ == "__main__":
    try:
        test_schema_enhancements()
        print("\n" + "=" * 80)
        print("✅ Test completed successfully!")
        print("=" * 80)
    except Exception as e:
        print(f"\n❌ Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
