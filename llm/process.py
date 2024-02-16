import os
from mistral import get_chat_response_mistral
from openai_llm import get_chat_response_openai
import json
from utils import extract_json_like_string

from constant import folder_name_twitter_jobs

def process_json_files(model="mistral"):
    for file in os.listdir(folder_name_twitter_jobs):
        print("🔍 checking ", file)
        full_path = os.path.join(folder_name_twitter_jobs, file)
        with open(full_path, "r", encoding="utf-8") as f:
            jobs = json.loads(f.read())
            for job in jobs:
                tweet = job["text"]
                if job.get("llm"):
                    continue

                print(10 * "#")
                print("🔬 Analyzing")
                print(10 * "#")
                print(tweet)

                llm_res = None
                chat_res = None
                try:
                    chat_res = get_chat_response_mistral(tweet) if model=="mistral" else get_chat_response_openai(tweet)
                    llm_res = json.loads(extract_json_like_string(chat_res))
                    job["isProcessed"] = True
                    print("✅ GOT")
                    print(10 * "#")
                    print(llm_res)
                    print(10 * "#")
                except Exception as e:
                    llm_res =  chat_res
                    print("❌ Error",e)

                job["llm"] = llm_res

        with open(full_path, "w", encoding="utf-8") as f:
            json.dump(jobs, f, ensure_ascii=False, indent=4)

