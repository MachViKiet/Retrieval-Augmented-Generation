import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig, pipeline
from dotenv import load_dotenv
from .prompts import prompts
from flask import Response, stream_with_context

load_dotenv('../.env')


CACHE_DIR = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "models")
)

class ChatModel:
    def __init__(self, model_id: str = "mistralai/mistral-large", device="cuda", provider="IBM"):
        self.provider = provider
        if provider == "IBM":
            from ibm_watsonx_ai.foundation_models import ModelInference
            from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
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
        elif provider == "OpenAI":
            import openai
            client = openai.OpenAI(api_key=os.getenv("OPENAI_APIKEY"))
            self.model = client
            self.model_id = model_id
            # response = client.chat.completions.create(
            #     model="gpt-4o-mini",
            #     messages=[{"role": "system", "content": prompt}],
            #     stream=False,
            # )
            # print(response.choices[0].message.content)
        elif provider == "Google":
            import google.generativeai as genai

            genai.configure(api_key=os.getenv("GEMINI_APIKEY"))
            self.model = genai.GenerativeModel(model_id)
            # response = model.generate_content("Explain how AI works", )
            # print(response.text)

    def _generate(self, prompt, max_new_tokens=1000, history=None, streaming=False, response_schema=None):
        if self.provider == "IBM":
            params = {GenParams.MAX_NEW_TOKENS: max_new_tokens}
            if not streaming:
                response = self.model.generate_text(prompt, params=params)
                #response = response.replace("<eos>", "")  # remove eos token
                return response
            else:
                return self.model.generate_text_stream(prompt, params=params)
        elif self.provider == "OpenAI":
            if not streaming:
                response = self.model.chat.completions.create(
                    model=self.model_id,
                    messages=[{"role": "system", "content": prompt}],
                    stream=streaming,
                    max_completion_tokens=max_new_tokens,
                )
                text = response.choices[0].message.content
                return text
            else:
                response = self.model.chat.completions.create(
                    model=self.model_id,
                    messages=[{"role": "system", "content": prompt}],
                    stream=streaming,
                    max_completion_tokens=max_new_tokens,
                )
                def gen(response):
                    for chunk in response:
                        if chunk.choices[0].delta.content is not None:
                            yield f"{chunk.choices[0].delta.content}"
                return stream_with_context(gen(response))
        elif self.provider == "Google":
            import google.generativeai as genai
            params = genai.GenerationConfig(max_output_tokens=max_new_tokens)
            if not streaming:
                return self.model.generate_content(prompt, stream=streaming).text
            else:
                def gen():
                    response = self.model.generate_content(prompt, stream=streaming)
                    for chunk in response:
                        yield f"{chunk.text}"
                return stream_with_context(gen())

    def generate(self, question: str, context: str = None, streaming=False, max_new_tokens=2048, k=3, history=None, theme=None, theme_context=None, user_profile=None):

        if context == None or context == "":
            if history is None or len(history) == 0:
                prompt = prompts['NO_CONTEXT_NO_HISTORY']
                print("Chosen prompt style: NO_CONTEXT_NO_HISTORY")
                formatted_prompt = prompt.format(question=question)
            else:
                prompt = prompts['NO_CONTEXT_HISTORY']
                print("Chosen prompt style: NO_CONTEXT_HISTORY")
                conversation = ""
                for pair in history:
                    conversation = conversation + "\nUser: " + pair['question'] + "\nChatbot: " + pair['anwser'] #answer
                formatted_prompt = prompt.format(history=conversation, question=question)
        else:
            if history is None or len(history) == 0:
                prompt = prompts['CONTEXT_NO_HISTORY']
                print("Chosen prompt style: CONTEXT_NO_HISTORY")
                formatted_prompt = prompt.format(context=context, question=question)
            else:
                prompt = prompts['CONTEXT_HISTORY_FULL']
                print("Chosen prompt style: CONTEXT_HISTORY_FULL")
                conversation = ""
                for pair in history:
                    conversation = conversation + "\nUser: " + pair['question'] + "\nChatbot: " + pair['anwser']
                formatted_prompt = prompt.format(context=context, history=conversation, question=question, theme=theme, theme_context=theme_context, user_profile=user_profile)

        # formatted_prompt = prompt.replace("\n", "<eos>")
        #formatted_prompt = prompt.format(context=context, question=question)
        return self._generate(formatted_prompt, max_new_tokens, streaming)

class PhoQueryRouter:
    def __init__(self, model_dir: str = CACHE_DIR):
        self.model = pipeline('text-classification', model=model_dir + "/phobert_queryrouting")

    def classify(self, query):
        return self.model(query)