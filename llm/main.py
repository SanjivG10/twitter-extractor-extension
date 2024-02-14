from dotenv import load_dotenv
load_dotenv()

from flask import Flask,request
from flask_cors import CORS

from mistral import get_chat_response
from utils import save_json

port = 6000

app =Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "hello world"

@app.route("/save-tweet", methods=['GET', 'POST'])
def save_tweet_to_json():
    try:
        if request.method=="POST":
            data = request.get_json()
            save_json(data)
            return "saved"
        return "not a good endpoint, but I will allow it"
    except Exception as e:
        print(e)
        return "done"

if __name__=="__main__":
    app.run(debug=True,port=port)



