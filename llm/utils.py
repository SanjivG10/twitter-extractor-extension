import re
import uuid
import json
import os
from constant import folder_name_twitter_jobs,folder_name_jobs_url,file_name_jobs_url

from pathlib import Path

Path(folder_name_twitter_jobs).mkdir(parents=True, exist_ok=True)
Path(folder_name_jobs_url).mkdir(parents=True, exist_ok=True)

def save_job_url(url:str)->None:
    full_path = os.path.join(folder_name_jobs_url, file_name_jobs_url)         
    with open(full_path,"a",encoding="utf-8") as f:
        f.write(url+"\n")

def save_json(data:str)->None:
    json_object = json.dumps(data, indent=4)
    full_path = os.path.join(folder_name_twitter_jobs, str(uuid.uuid4())+".json")         

    with open(f"{full_path}", "w") as f:
        f.write(json_object)

def extract_json_like_string(text):
    pattern = r'\{.*?\}'
    match = re.search(pattern, text,re.DOTALL)
    if match:
        return str(match.group(0))
    else:
        return "" 
    
