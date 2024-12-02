import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig, pipeline
from dotenv import load_dotenv
from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from .prompts import prompts

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

    def generate(self, question: str, context: str = None, streaming=False, max_new_tokens=2048, k=3, history=None, theme=None, theme_context=None):

        if context == None or context == "":
            if history is None or len(history) == 0:
                prompt = prompts['NO_CONTEXT_NO_HISTORY']
                formatted_prompt = prompt.format(question=question)
            else:
                prompt = prompts['NO_CONTEXT_HISTORY']
                conversation = ""
                for pair in history:
                    conversation = conversation + "\nUser: " + pair['question'] + "\nChatbot: " + pair['answer']
                formatted_prompt = prompt.format(history=conversation, question=question)
        else:
            if history is None or len(history) == 0:
                prompt = prompts['CONTEXT_NO_HISTORY']
                formatted_prompt = prompt.format(context=context, question=question)
            else:
                prompt = prompts['CONTEXT_HISTORY_NO_PROFILE']
                for pair in history:
                    conversation = conversation + "\nUser: " + pair['question'] + "\nChatbot: " + pair['answer']
                formatted_prompt = prompt.format(context=context, history=conversation, question=question, theme=theme, theme_context=theme_context)
        params = {
            GenParams.MAX_NEW_TOKENS: max_new_tokens
        }

        # formatted_prompt = prompt.replace("\n", "<eos>")
        formatted_prompt = prompt.format(context=context, question=question)
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