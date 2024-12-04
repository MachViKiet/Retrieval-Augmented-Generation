from flask import Blueprint, request, jsonify, Response, stream_with_context
from flask_cors import cross_origin
from controllers.exampleController import authController
from werkzeug.utils import secure_filename
from langchain_text_splitters import RecursiveCharacterTextSplitter

from dotenv import load_dotenv
import os
import json
import requests
from requests.auth import HTTPBasicAuth

from models.model import ChatModel, PhoQueryRouter
from utils import rag_utils, query_routing

main = Blueprint("main", __name__)
os.chdir('../..')

load_dotenv('../.env')

@main.route("/", methods=["GET"])
@cross_origin()
def init():
    return jsonify({"text": "Server is running"})


@main.route("/auth", methods=["GET"])
@cross_origin()
def auth():
    auth = authController()
    return jsonify(auth)

# @main.route("/load", methods=["GET"])
# @cross_origin()
def preload():
    # chat_model_id = request.args.get('model_id', default="meta-llama/llama-3-1-70b-instruct")
    print("---LOADING ASSETS---")
    chat_model_id = "meta-llama/llama-3-1-70b-instruct"
    global model
    #model = ChatModel(model_id=chat_model_id)
    model = ChatModel(provider=os.getenv("PROVIDER"))
    print("Chat model loaded.")
    global encoder
    encoder = rag_utils.Encoder()
    print("Encoder loaded.")
    global pho_queryrouter
    pho_queryrouter = PhoQueryRouter()
    print("Query Router loaded.")
    global database
    database = rag_utils.MilvusDB(
        host=os.getenv('MILVUS_HOST'), port=os.getenv('MILVUS_PORT'),
        user=os.getenv('MILVUS_USERNAME', ""), password=os.getenv('MILVUS_PASSWORD', ""),
    )
    database.load_collection('student_handbook', persist=True)
    print("Database loaded.")
    # return jsonify({})
    print("All assets loaded.")
    return

@main.route("/generate/determine_collection", methods=["GET"])
@cross_origin()
def determine_collection():
    query = request.args.get('query')
    chosen_collection = pho_queryrouter.classify(query_routing.segment_vietnamese(query))[0]['label']
    # database.load_collection(chosen_collection, persist=True)
    return jsonify({'collection': chosen_collection})

@main.route("/generate/extract_meta", methods=['GET'])
@cross_origin()
def extract_metadata():
    query = request.args.get('query')
    chosen_collection = request.args.get('chosen_collection')
    schema = ['school_year', 'in_effect', 'created_at', 'updated_at']
    #extracted_metadata = rag_utils.metadata_extraction(query, model, schema)
    extracted_metadata = rag_utils.metadata_extraction_v2(query, model, chosen_collection)
    if extracted_metadata != -1: #No metadata found
        filter_expressions = rag_utils.compile_filter_expression(extracted_metadata, database.persistent_collections + [chosen_collection])
    else:
        filter_expressions = {}
    return jsonify(filter_expressions)

@main.route("/generate/search", methods=["GET"])
@cross_origin()
def search():
    ##PARAMS
    query = request.args.get('query') # Tin nhắn người dùng
    chosen_collection = request.args.get('chosen_collection') #Context từ api search
    try:
        filter_expressions = json.loads(request.args.get('filter_expressions')) #
    except json.JSONDecodeError:
        filter_expressions = None
    #----------------------------------
    database.load_collection(chosen_collection)
    output_fields = {
        'student_handbook': ['title', 'article'],
        chosen_collection: ['title', 'article']
    }
    query_embeddings = encoder.embedding_function("query: " + query)
    try:
        search_results, source = database.similarity_search(chosen_collection, query_embeddings, filters=filter_expressions)
    except:
        search_results, source = database.similarity_search(chosen_collection, query_embeddings)
    if search_results != -1:
        context = rag_utils.create_prompt_milvus(query, search_results)
    else:
        context = "No related documents found"
        source = []
    return jsonify({
        'context': context,
        'source': source
    })

@main.route("/generate", methods=["POST"])
@cross_origin()
def generate():
    ##PARAMS
    query = request.form['query'] # Tin nhắn người dùng
    context = request.form['context'] # Context từ api search
    streaming = request.form['streaming'].lower() == "true"  #True or False 
    history = json.loads(request.form['history']) # Conversation history
    theme = request.form['collection_name'] # Collection name
    user_profile = request.form['user_profile'] # User profile
    max_tokens = 1500 
    #-------------------------------------------
    theme_context = database.describe_collection(theme)['description']
    answer = model.generate(query, context, streaming, max_tokens, history=history, user_profile=user_profile)
    if streaming:
        return answer #Generator object, nếu không được thì thử thêm yield trước biến answer thử
    else:
        return jsonify({'answer': answer})

@main.route("/get_file", methods=["GET","POST"])
@cross_origin()
def get_file():
    ##PARAMS
    if request.method == 'POST':
        filename = request.form['document_id']
        collection_name = request.form['collection_name']
    elif request.method == 'GET':
        filename = request.args.get['document_id'] 
        collection_name = request.args.get['collection_name']
    #-------------------------------------------
    chunks = rag_utils.get_document(filename, collection_name)
    return jsonify(chunks)

@main.route("/get_collection_schema", methods=["GET"])
@cross_origin()
def get_collection_schema():
    ##PARAMS
    collection_name = request.args.get('collection_name')
    #-------------------------------------------
    schema = database.get_collection_schema(collection_name)
    return jsonify(schema)

@main.route("/insert_file", methods=["POST"])
@cross_origin()
def insert_file():
    ##PARAMS
    chunks = json.loads(request.form['chunks'])
    collection_name = request.form['collection_name']
    filename = request.form['filename']    
    metadata = json.loads(request.form['metadata'])
    
    print('Du lieu: ',collection_name, filename, metadata)
    #-------------------------------------------
    #Save chunks to local storage
    if secure_filename(filename):
        with open(os.getenv('AIRFLOW_TEMP_FOLDER') + '/' + filename, 'w+', encoding='utf-8') as f:
            json.dump(chunks, f)
            r = requests.post(f'http://{os.getenv('AIRFLOW_HOST')}:{os.getenv('AIRFLOW_PORT')}/api/v1/dags/{os.getenv('AIRFLOW_DAGID_INSERT')}/dagRuns', json={
                "conf": {
                    "filename": filename,
                    "collection_name": collection_name,
                    "metadata": metadata
                }},
                auth=HTTPBasicAuth(os.getenv('AIRFLOW_USERNAME'), os.getenv('AIRFLOW_PASSWORD')))
            response = r.json()
            print(r.status_code,r.json())
            return jsonify({
                'dag_run_id': response['dag_run_id'],
                'dag_id': response['dag_id'],
                'state': response['state']
            })
    else:
        return jsonify({'status': 'failed'})
    
    return jsonify({'status': 'success'})

@main.route("/chunk_file", methods=["POST"])
@cross_origin()
def chunk_file():
    ##PARAMS
    data = request.form['text']
    #-------------------------------------------
    splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=75)
    chunks = splitter.split_text(data)
    return jsonify(chunks)