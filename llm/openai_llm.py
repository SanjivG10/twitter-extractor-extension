import os
from openai import OpenAI

from prompts import system_prompt

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def get_chat_response_openai(tweet:str)->str:

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role":"system",
                "content":system_prompt
            },
            {
                "role": "user",
                "content": tweet,
            }
        ],
        model="gpt-3.5-turbo-0125")
    
    return chat_completion.choices[0].message.content

