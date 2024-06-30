import os
import pytest
from xpander_sdk import XpanderClient, Plugin
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def print_pretty_string(input_string):
    lines = input_string.split('\n')
    for line in lines:
        print(line)

@pytest.mark.skip(reason="Skipping this test because it is not working yet")
def test_chat_completion():
    xpander_api_key = "fIlE1RK2sp5BPGhGgzhOF8g4PUCjoVgc1KhRQpAL"
    openai_api_key = os.environ.get("OPENAI_API_KEY", "")
    
    client = XpanderClient(
        agent_key=xpander_api_key,
        agent_url="https://inbound.xpander.ai/agent/96185321-297a-45b6-81ea-269d2a35de5d"
    )
    
    openai_client = OpenAI(api_key=openai_api_key)

    messages = [
        {
            "role": "user",
            "content": "Get the last blog post from Content DB Database saved in Notion"
        }
    ]
    
    tools = client.tools(plugin=Plugin.OpenAI)
    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools,
        tool_choice="required"
    )

    processed_response = client.process_chat_response(
        plugin=Plugin.OpenAI,
        messages=messages,
        chat_completion_response=response,
        ai_client=openai_client
    )
    
    assert processed_response is not None
    assert 'choices' in processed_response
    assert len(processed_response['choices']) > 0
    assert 'message' in processed_response['choices'][0]
    assert 'content' in processed_response['choices'][0]['message']
    
    print_pretty_string(processed_response['choices'][0]['message']['content'])

if __name__ == "__main__":
    pytest.main()
