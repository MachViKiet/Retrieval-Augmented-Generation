import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores.utils import DistanceStrategy

from ibm_watsonx_ai.metanames import EmbedTextParamsMetaNames as EmbedParams
from ibm_watsonx_ai.foundation_models import Embeddings

import pymongo
import json
import ast

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
    def __init__(self, host,port,password,user,server_pem_path=None,server_name='localhost') -> None:
        
        connections.connect(alias = 'default',
                        host = host,
                        port = port)
        self.persistent_collections = []
        self._handler = connections._fetch_handler('default')

    def get_collection_schema(self, collection_name, readable=False):
        schema = Collection(collection_name).describe()['fields']
        schema_readable = {}
        def convert_type(type):
            if type == DataType.INT8 or type == DataType.INT16 or type == DataType.INT32 or type == DataType.INT64:
                return 'int'
            elif type == DataType.FLOAT or type == DataType.DOUBLE:
                return 'float'
            elif type == DataType.VARCHAR or type == DataType.STRING:
                return 'string'
            elif type == DataType.ARRAY:
                return 'list'
            else:
                return 'unknown'
        for meta in schema:
            if meta['name'] in ['id', 'embedding', 'chunk_id', 'article', 'is_active', 'page_number', 'file_links']: #Skip these fields
                continue #TODO: Fix this to achieve better flexibility in the system
            schema_readable[meta['name']] = {}

            schema_readable[meta['name']]['type'] = convert_type(meta['type'])
            if schema_readable[meta['name']]['type'] == 'list':
                schema_readable[meta['name']]['element_type'] = convert_type(meta['element_type'])
                schema_readable[meta['name']]['max_size'] = meta['params']['max_capacity']
            elif schema_readable[meta['name']]['type'] == 'string':
                schema_readable[meta['name']]['max_length'] = meta['params']['max_length']

            schema_readable[meta['name']]['description'] = meta['description']
            schema_readable[meta['name']]['required'] = False
        schema_readable['title']['required'] = True
        return schema_readable
    
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
    
    def similarity_search(self, collection:str, query_embeddings, k: int = 3, search_params=None, output_fields=['title','article', 'url'], filters: dict = None):
        results = {}
        source = []
        if search_params is None:
            search_params = {
                "metric_type": "L2",
                "params": {"nprobe": 5}
            }
        if filters is None:
            filters = {}
        for c in self.persistent_collections + [collection]: #Search from default collections + currently loaded collection
            search_results = Collection(c).search(
                data=[query_embeddings],
                anns_field="embedding",
                param=search_params,
                limit=k,
                expr=filters.get(c, None),
                output_fields=output_fields if type(output_fields) == list else output_fields[c] #If the user specified different output fields
                                                                                                    # for different collections
            )[0]
            for r in search_results:
                results[r.distance] = (r.entity, c)
        if len(results) == 0: #No matching documents
            return -1
        #Sort by distance and return only k results
        myKeys = list(results.keys())
        myKeys.sort()
        myKeys = myKeys[:k]
        sorted_list = [results[i][0] for i in myKeys]
        #Return the collection name of the source document
        source = [{'collection_name': results[i][1], 'url': results[i][0].get('url')} for i in myKeys]
        return sorted_list, source

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

def metadata_extraction(query, model, schema: list|dict):
    '''Extract metadata from user query given a schema using a LLM call
    schema: can be list (names of metadata attributes) or dict (name-description key-value pairs)'''

    prompt = prompt = """Extract metadata from the user's query using the provided schema.
Do not include the metadata if not found.
User's query: {query}
Schema:
{schema}
Always answer in JSON format.
Answer:
"""
    if type(schema) is list:
        schema = ",".join(schema)
    elif type(schema) is dict:
        schema = "\n".join(k + ": " + v for k,v in schema.items())
    else:
        raise TypeError("Schema should be list or dict, got " + str(type(schema)))
    
    full_prompt = prompt.format(query=query, schema=schema)
    result = model.model.generate_text(full_prompt)
    try:
        result = json.loads(result)
    except json.JSONDecodeError: #Wrong format
        print("Metadata Extraction: Couldn't decode JSON - " + result)
        result = -1
    return result

def compile_filter_expression(metadata, loaded_collections: list):
    '''Read collections schemas to compile filtering expressions for Milvus'''
    expressions = {}
    for c in loaded_collections:
        expressions[c] = ""
        short_schema = {}
        schema = Collection(c).describe()['fields']
        for s in schema:
            short_schema[s['name']] = s['type']
        for attr, val in metadata.items():
            if val is None or val == "" or val == []: #Skip empty values
                continue
            meta_type = short_schema.get(attr, -1)
            if meta_type == -1:
                continue

            if short_schema[attr] == DataType.INT8 or short_schema[attr] == DataType.INT16 or short_schema[attr] == DataType.INT32 or short_schema[attr] == DataType.INT64 or short_schema[attr] == DataType.FLOAT: #intege
                expressions[c] += attr + ' == ' + val + " || "
            elif short_schema[attr] == DataType.VARCHAR:
                expressions[c] += attr + f' == "{val}"' + " || "
            elif short_schema[attr] == DataType.ARRAY:
                if type(ast.literal_eval(val)) is list:
                    expressions[c] += f"array_contains_any({attr}, {val}) || "
                else:
                    expressions[c] += f"array_contains_any({attr}, [{val}]) || "
        # Reformat
        expressions[c] = expressions[c].removesuffix(' || ')
    return expressions

#------------------------------------#
def metadata_extraction_v2(query, model, collection_name):
    '''Extract metadata from user query given a schema using a LLM call
    schema: can be list (names of metadata attributes) or dict (name-description key-value pairs)'''

    prompt = prompt = """Extract metadata from the user's query using the provided schema.
Do not include the metadata if not found.
For any metadata whose value is a list, write the list as a string (surrounded by '').
User's query: {query}
Schema:
{schema}
Always answer as a JSON object.
Answer:
"""
    fields = Collection(collection_name).describe()['fields']
    # if type(schema) is list:
    #     schema = ",".join(schema)
    # elif type(schema) is dict:
    #     schema = "\n".join(k + ": " + v for k,v in schema.items())
    # else:
    #     raise TypeError("Schema should be list or dict, got " + str(type(schema)))
    schema = {}
    for field in fields:
        schema[field['name']] = field['description']
    schema = "\n".join(k + ": " + v for k,v in schema.items())

    full_prompt = prompt.format(query=query, schema=schema)
    result = model.model.generate_text(full_prompt)
    try:
        result = json.loads(result)
        for k, v in result.items():
            if type(v) is str:
                result[k] = v.lower()
            elif type(v) is list:
                result[k] = [x.lower() for x in v]
    except json.JSONDecodeError: #Wrong format
        try:
            result = result.replace("`", '').replace("json", '')
            result = json.loads(result)
        except json.JSONDecodeError:
            print("Metadata Extraction: Couldn't decode JSON - " + result)
            result = -1
    return result

def get_document(filename, collection_name):
    '''Get metadata from a file'''
    results = {}
    collection = Collection(collection_name)
    collection.load()
    chunk_id_name = 'chunk_id' if collection_name != 'student_handbook' else 'page_number'
    search_results = collection.query(
        expr=f"document_id == '{filename}'",
        output_fields=['article', chunk_id_name],
    )
    for r in search_results:
                results[r[chunk_id_name]] = r['article']
    if len(results) == 0: #No matching documents
        return -1
    #Sort by distance and return only k results
    myKeys = list(results.keys())
    myKeys.sort()
    sorted_list = [results[i] for i in myKeys]
    return sorted_list
