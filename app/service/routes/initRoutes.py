from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from controllers.exampleController import authController
from dotenv import load_dotenv
import os
import json

from models.model import ChatModel, PhoQueryRouter
from utils import rag_utils, query_routing

main = Blueprint("main", __name__)
os.chdir('../..')

load_dotenv('../.env')
os.chdir('../..')

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
    model = ChatModel(model_id=chat_model_id)
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
        user=os.getenv('MILVUS_USERNAME'), password=os.getenv('MILVUS_PASSWORD'),
        server_name=os.getenv('MILVUS_SERVER_NAME'), server_pem_path=os.getenv('MILVUS_SERVER_PEM')
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
    extracted_metadata = rag_utils.metadata_extraction(query, model, schema)
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
    filter_expressions = json.loads(request.args.get('filter_expressions')) #
    #----------------------------------
    database.load_collection(chosen_collection)
    output_fields = {
        'student_handbook': ['title', 'article', 'page_number'],
        chosen_collection: ['title', 'article']
    }
    query_embeddings = encoder.embedding_function.embed_query("query: " + query)
    search_results = database.similarity_search(chosen_collection, query_embeddings, output_fields=output_fields, k=3, filters=filter_expressions)
    if search_results != -1:
        context = rag_utils.create_prompt_milvus(query, search_results)
    else:
        context = "No related documents found"
    return jsonify({
        'search_results': search_results,
        'context': context
        })

@main.route("/generate", methods=["GET"])
@cross_origin()
def generate():
    ##PARAMS
    query = request.args.get('query') # Tin nhắn người dùng
    context = request.args.get('context') # Context từ api search
    streaming = request.args.get('streaming').lower() == "true"  #True or False 
    max_tokens = 1500 
    #-------------------------------------------
    answer = model.generate(query, context, streaming, max_tokens)
    if streaming:
        return answer #Generator object, nếu không được thì thử thêm yield trước biến answer thử
    else:
        return jsonify({'answer': answer})
