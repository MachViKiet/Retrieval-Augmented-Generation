import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig, pipeline
from dotenv import load_dotenv
from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams

load_dotenv('../.env')


CACHE_DIR = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "models")
)

class ChatModel:
    def __init__(self, model_id: str = "mistralai/mistral-large", device="cuda"):
    
        credentials = {
            "apikey": os.getenv("WATSONX_APIKEY"),
            "url": "https://us-south.ml.cloud.ibm.com",
        }

        self.model = ModelInference(
            model_id=model_id,
            credentials=credentials,
            params={
                GenParams.DECODING_METHOD: "greedy",
                GenParams.MAX_NEW_TOKENS: 2048,
                # GenParams.STOP_SEQUENCES: [],
            },
            project_id=os.getenv("WATSONX_PROJECT_ID"),
        )
        self.chat = []

    def generate(self, question: str, context: str = None, streaming=False, max_new_tokens=2048, k=3):

        if context == None or context == "":
            prompt = f"""Give a detailed answer to the following question. Always answer in Vietnamese. Question: {question}"""
        else:
            prompt = f"""You are a chatbot assistant providing answers to students and faculty members of a university. Using the information contained in the context, give a detailed answer to the query.\
If there is no information in the context to support your answer, say so.
Context (encased in backticks): 
```
{context}
```
Query: {question}
Always answer in Vietnamese, make sure the entire answer is in Vietnamese. At the end, provide the source you used for your answers (ie. title, page number (if available)).\
Write the answer in markdown format. Use headings to make the answer more readable. Do not write many consecutive paragraphs without headings.\
Do not add consecutive newlines.
Answer: 
"""
        params = {
            GenParams.MAX_NEW_TOKENS: max_new_tokens
        }

        # formatted_prompt = prompt.replace("\n", "<eos>")
        formatted_prompt = prompt
        if not streaming:
            response = self.model.generate_text(formatted_prompt, params=params)
            #response = response.replace("<eos>", "")  # remove eos token
            return response
        else:
            return self.model.generate_text_stream(formatted_prompt, params=params)

class PhoQueryRouter:
    def __init__(self, model_dir: str = CACHE_DIR):
        self.model = pipeline('text-classification', model=model_dir + "/phobert_queryrouting")

    def classify(self, query):
        return self.model(query)