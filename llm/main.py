from openai import OpenAI
from pydantic import BaseModel, Field
from typing import List

import instructor


class JobPostHandler(BaseModel):
    title: str
    is_job: bool 


# enables `response_model` in create call
client = instructor.patch(
    OpenAI(
        base_url="http://localhost:11434/v1",
        api_key="ollama",  # required, but unused
    ),
    mode=instructor.Mode.JSON,
)

resp = client.chat.completions.create(
    model="llama2",
    messages=[
        {
            "role": "user",
            "content": "We are not hiring lol. This is just a random fake post",
        }
    ],
    response_model=JobPostHandler,
)
print(resp.model_dump_json(indent=2))