import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig, pipeline
from dotenv import load_dotenv
from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams

load_dotenv()


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

    def generate(self, question: str, context: str = None, streaming=False):

        if context == None or context == "":
            prompt = f"""Give a detailed answer to the following question. Always answer in Vietnamese. Question: {question}"""
        else:
            prompt = f"""[INST]Using the information contained in the context, give a detailed answer to the query. If there is no information in the context to support your answer, say so.
Always answer in Vietnamese, make sure the entire answer is in Vietnamese. At the end, provide the source you used for your answers (ie. title, page number (if available))[/INST]
Context: {context}.
Query: {question}
"""

        formatted_prompt = prompt.replace("\n", "<eos>")
        print(formatted_prompt)
        if not streaming:
            response = self.model.generate_text(formatted_prompt)
            response = response.replace("<eos>", "")  # remove eos token
            return response
        else:
            return self.model.generate_text_stream(formatted_prompt)

class PhoQueryRouter:
    def __init__(self, model_dir: str = CACHE_DIR):
        self.model = pipeline('text-classification', model=model_dir)

    def classify(self, query):
        return self.model(query)