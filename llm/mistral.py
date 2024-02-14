
import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage


api_key = os.environ.get("MISTRAL_API_KEY","")
model = "mistral-medium"

client = MistralClient(api_key=api_key)

def get_chat_response(tweet:str)->str:
    messages = [
        ChatMessage(role="system", content="""
    You check the post from twitter and reply answer in JSON about different attributes related to that post. In this case, we are trying to analyze twitter post and check to see if it is job posts about hiring. You will need to return following fields:
        a. isJob: determines whether the post is about a job offer
        b. title: title of the job post, empty string if the post is not about a job, this could also be an array of jobs
        c. location: remote or hybrid or onsite or empty string 
        d. jobType: one of full stack, frontend, backend or empty string 
        """),
        
        ChatMessage(role="user", content=f"""{tweet}""")
    ]

    # No streaming
    chat_response = client.chat(
        model=model,
        messages=messages,
    )

    return chat_response.choices[0].message.content