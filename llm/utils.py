import re
import uuid
import json
import os
from constant import folder_name


def save_json(data:str)->None:
    json_object = json.dumps(data, indent=4)
    full_path = os.path.join(folder_name, str(uuid.uuid4())+".json")         

    with open(f"{full_path}", "w") as f:
        f.write(json_object)

def extract_json_like_string(text):
    pattern = r'\{.*?\}'
    match = re.search(pattern, text,re.DOTALL)
    if match:
        return match.group(0)
    else:
        return "" 
    
