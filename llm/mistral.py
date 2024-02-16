
import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from prompts import system_prompt


api_key = os.environ.get("MISTRAL_API_KEY","")
model = "mistral-medium"

client = MistralClient(api_key=api_key)

def get_chat_response_mistral(tweet:str)->str:
    messages = [
        ChatMessage(role="system", content=system_prompt),
        
        ChatMessage(role="user", content=f"""{tweet}""")
    ]

    # No streaming
    chat_response = client.chat(
        model=model,
        messages=messages,
    )

    return chat_response.choices[0].message.content