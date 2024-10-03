import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores.utils import DistanceStrategy

from ibm_watsonx_ai.metanames import EmbedTextParamsMetaNames as EmbedParams
from ibm_watsonx_ai.foundation_models import Embeddings

import pymongo

from pymilvus import(
    Milvus,
    IndexType,
    Status,
    connections,
    FieldSchema,
    DataType,
    Collection,
    CollectionSchema
)

CACHE_DIR = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "models")
)

##ENCODER
class Encoder:
    def __init__(
        self, model_name: str = "intfloat/multilingual-e5-large", device="cpu"
    ):
        my_credentials = {
            "url": "https://us-south.ml.cloud.ibm.com",
            "apikey": os.environ['WATSONX_APIKEY'],
        }

        # model_id = 'sentence-transformers/all-minilm-l12-v2'
        model_id = 'intfloat/multilingual-e5-large'
        gen_parms = None
        project_id = os.environ['WATSONX_PROJECT_ID']
        space_id = None
        verify = False

        # Set the truncate_input_tokens to a value that is equal to or less than the maximum allowed tokens for the embedding model that you are using. If you don't specify this value and the input has more tokens than the model can process, an error is generated.

        embed_params = {
            EmbedParams.TRUNCATE_INPUT_TOKENS: 512,
        }

        model = Embeddings(
            model_id=model_id,
            credentials=my_credentials,
            params=embed_params,
            project_id=project_id,
            verify=verify
        )
        self.embedding_function = model

##DATABASES
class MongoDB:
    def __init__(self, db_name):
        # Connect to your Atlas cluster
        connection_string = os.getenv()
        mongo_client = pymongo.MongoClient(connection_string)
        self.client = mongo_client
        self.db = mongo_client[db_name]
    
    def similarity_search(self, question: str, k: int = 3):
        pass

class MilvusDB:
    def __init__(self, host,port,password,user,server_pem_path,server_name='localhost') -> None:
        connections.connect(alias = 'default',
                        host = host,
                        port = port,
                        user = user,
                        password = password,
                        server_pem_path=server_pem_path,
                        server_name = server_name,
                        secure = True)
        self.persistent_collections = []
        self._handler = connections._fetch_handler('default')

    def load_collection(self, name, persist=False):
        if persist:
            self.persistent_collections.append(name)
            collection = Collection(name)
            collection.load()
        else:
            collection = Collection(name)
            collection.load()

        for c in connections._fetch_handler('default').list_collections():
            if c not in self.persistent_collections and c != name:
                Collection(c).release()
        return Status()
    
    def similarity_search(self, collection:str, query_embeddings, k: int = 3, search_params=None, output_fields=['title','article']):
        results = {}
        
        if search_params is None:
            search_params = {
                "metric_type": "L2",
                "params": {"nprobe": 5}
            }
        for c in self.persistent_collections + [collection]: #Search from default collections + currently loaded collection
            search_results = Collection(c).search(
                data=[query_embeddings],
                anns_field="embedding",
                param=search_params,
                limit=k,
                expr=None,
                output_fields=output_fields if type(output_fields) == list else output_fields[c] #If the user specified different output fields
                                                                                                    # for different collections
            )[0]
            for r in search_results:
                results[r.distance] = r.entity
        #Sort by distance and return only k results
        myKeys = list(results.keys())
        myKeys.sort()
        myKeys = myKeys[:k]
        sorted_list = [results[i] for i in myKeys]
        return sorted_list

##UTILITY FUNCTIONS
# def load_and_split_pdfs(file_paths: list, chunk_size: int = 256):
#     loaders = [PyPDFLoader(file_path) for file_path in file_paths]
#     pages = []
#     for loader in loaders:
#         pages.extend(loader.load())

#     text_splitter = RecursiveCharacterTextSplitter.from_huggingface_tokenizer(
#         tokenizer=AutoTokenizer.from_pretrained(
#             "sentence-transformers/all-MiniLM-L12-v2"
#         ),
#         chunk_size=chunk_size,
#         chunk_overlap=int(chunk_size / 10),
#         strip_whitespace=True,
#     )
#     docs = text_splitter.split_documents(pages)
#     return docs
def create_prompt_milvus(question, context, output_fields=['title','article']):
#     full_context = """
# You always answer with markdown formatting using GitHub syntax. Do not use ordered or numbered lists.
# You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. 
# Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. 
# Respond in a brief and concise manner.

# Try to answer the user's question using the given context below. The context consists of groups of a question, its answer and the section it belongs to.
# Specify which questions and sections you derived your final answer from.

# Do not start with "based on" or "according to" in your response or anything similar, in your response. 
# Provide your answer only based on the provided information. If the answer is not in provided information, explain that you are only trained on the provided information.
# Always answer in Vietnamese.

# """
    full_context = ""
    for answer in context:
        context = ""
        if type(output_fields) is not list:
            context = output_fields + ":" + answer.get(output_fields)
        else:
            for field in output_fields:
                value = answer.get(field)
                context = context + field.title() + ": " + value + "\n" # 'question: How are you?'
        full_context = full_context + context + "\n"

    # complete_prompt = full_context + "\nUSER'S QUESTION: " + question
    complete_prompt = full_context
    return complete_prompt

def determine_collection(question, model, database_descriptions, collection_names):
    prompt = """Using the collections descriptions below and the user's question. 
    Determine which collections to search to find the documents most related to the question.
    Do not provide any explanations, only answer with the collection name.
    """
    full_prompt = prompt + '\n' + database_descriptions + '\n' + question + '\n'
    result = model.model.generate_text(full_prompt)
    result = result.strip()
    for collection in collection_names:
        idx = result.find(collection)
        if idx != -1:
            result = result[idx:idx + len(collection)]
    return result