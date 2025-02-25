from flask import Blueprint, request, jsonify, Response, stream_with_context, current_app
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
    model = ChatModel(provider=os.getenv("PROVIDER"), model_id=os.getenv("CHAT_MODEL_ID"))
    print("Chat model loaded.")
    # global encoder
    # encoder = rag_utils.Encoder(provider=os.getenv("EMBED_PROVIDER", "local"))
    # print("Encoder loaded.")
    # global pho_queryrouter
    # pho_queryrouter = PhoQueryRouter()
    # print("Query Router loaded.")
    global database
    database = rag_utils.MilvusDB(
        host=os.getenv('MILVUS_HOST', ""), port=os.getenv('MILVUS_PORT', ""),
        user=os.getenv('MILVUS_USERNAME', ""), password=os.getenv('MILVUS_PASSWORD', ""),
        uri=os.getenv('MILVUS_URI', ""), token=os.getenv('MILVUS_TOKEN', "")
    )
    database.load_collection('student_handbook', persist=True)
    print("Database loaded.")
    # return jsonify({})
    print("All assets loaded.")
    return

@main.route("/generate/determine_collection", methods=["POST"])
@cross_origin()
def determine_collection():
    ##PARAMS
    query = request.form['query']
    history = json.loads(request.form['history']) # Conversation history
    threshold = 0.5
    #pho_queryrouter = PhoQueryRouter()
    pho_queryrouter = current_app.config['PHO_QUERYROUTER']
    #----------------------------------
    conversation = ""
    for h in history:
        conversation += h['question'] + ". "
    conversation += query
    segmented_query = query_routing.segment_vietnamese(conversation + query)
    if type(segmented_query) is list:
        segmented_conversation = " ".join(segmented_query)
    else:
        segmented_conversation = segmented_query
    prediction = pho_queryrouter.classify(segmented_conversation)[0]
    chosen_collection = prediction['label']
    print("Query Routing: " + chosen_collection + " ----- Score: " + str(prediction['score']) + "\n")

    if prediction['score'] < threshold: #Unsure
        segmented_query = query_routing.segment_vietnamese(query)
        if type(segmented_query) is list:
            segmented_conversation = " ".join(segmented_query)
        else:
            segmented_conversation = segmented_query
        prediction = pho_queryrouter.classify(query_routing.segment_vietnamese(segmented_conversation))[0] #Only guessing from the current message
        chosen_collection = prediction['label']
        # if prediction['score'] < threshold: #Still unsure, return empty collection
        #     chosen_collection = ""
    # database.load_collection(chosen_collection, persist=True)
    del pho_queryrouter
    return jsonify({'collection': chosen_collection})

@main.route("/generate/extract_meta", methods=['POST'])
@cross_origin()
def extract_metadata():
    ##PARAMS
    query = request.form['query']
    chosen_collection = request.form['chosen_collection']
    schema = ['school_year', 'in_effect', 'created_at', 'updated_at']
    history = json.loads(request.form['history']) # Conversation history
    n_new_queries = 2
    model = current_app.config['CHAT_MODEL']
    database = current_app.config['DATABASE']
    #----------------------------------
    conversation = ""
    for h in history:
        conversation += h['question'] + ".\n"
    conversation += query
    #extracted_metadata = rag_utils.metadata_extraction(query, model, schema)
    is_old_extract = True
    if is_old_extract: #OLD METADATA EXTRACTION
        extracted_metadata = rag_utils.metadata_extraction_v2(query, model, chosen_collection, pydantic_schema=database.pydantic_collections[chosen_collection])
        if extracted_metadata != -1: #No metadata found
            filter_expressions = rag_utils.compile_filter_expression(extracted_metadata, database.persistent_collections + [chosen_collection])
        else:
            filter_expressions = {}
        return jsonify(filter_expressions)
    
    rewritten_queries = rag_utils.rewrite_query(conversation=conversation, model=model, k=n_new_queries)
    if rewritten_queries == -1:
        extracted_metadata = rag_utils.metadata_extraction_v2(query, model, chosen_collection, pydantic_schema=database.pydantic_collections[chosen_collection])
        if extracted_metadata != -1: #No metadata found
            filter_expressions = rag_utils.compile_filter_expression(extracted_metadata, database.persistent_collections + [chosen_collection])
        else:
            filter_expressions = {}
        return jsonify(filter_expressions)
    else:
        filter_expressions = []
        for q in rewritten_queries:
            extracted_metadata = rag_utils.metadata_extraction_v2(q, model, chosen_collection, pydantic_schema=database.pydantic_collections[chosen_collection])
            if extracted_metadata != -1: #No metadata found
                expr = rag_utils.compile_filter_expression(extracted_metadata, database.persistent_collections + [chosen_collection])
            else:
                expr = {}
            filter_expressions.append({q: expr})
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
    k = 4
    #encoder = rag_utils.Encoder(provider=os.getenv("EMBED_PROVIDER", "local"))
    encoder = current_app.config['ENCODER']
    database = current_app.config['DATABASE']
    #----------------------------------
    database.load_collection(chosen_collection)
    # output_fields = {
    #     'student_handbook': ['title', 'article'],
    #     chosen_collection: ['title', 'article']
    # }
    if type(filter_expressions) == dict:
        query_embeddings = encoder.embedding_function("query: " + query)
        try:
            search_results, source, distances = database.similarity_search(chosen_collection, query_embeddings, filters=filter_expressions, k=k)
            search_results_vanilla, source_vanilla, distances_vanilla = database.similarity_search(chosen_collection, query_embeddings, k=k)

            search_results = search_results + search_results_vanilla
            source = source + source_vanilla
            distances = distances + distances_vanilla
            results = {k: (article, s) for k, article, s in zip(distances, search_results, source)}

            distances.sort()
            distances = distances[:k]
            search_results_final = [results[k][0] for k in distances]
            source_final = [results[k][1] for k in distances]
        except Exception as e:
            print("Error with filter search")
            print(e)
            search_results_final, source_final, _ = database.similarity_search(chosen_collection, query_embeddings)
        if search_results_final != -1:
            context = rag_utils.create_prompt_milvus(query, search_results_final)
        else:
            context = "No related documents found"
            source_final = []
    elif type(filter_expressions) == list: #Filter expressions contain rewritten queries - perform hybrid search
        search_results_final, source_final, _ = database.hybrid_search(
            collection=chosen_collection, 
            query_embeddings=[encoder.embedding_function("query: " + list(q.keys())[0]) for q in filter_expressions], 
            k=k,
            limit_per_req=4,
            filters=[list(q.values())[0] for q in filter_expressions]
            )
        if search_results_final != -1:
            context = rag_utils.create_prompt_milvus(query, search_results_final)
        elif search_results_final == -2: #Error in hybrid search, revert to vanilla search
            search_results_vanilla, source_vanilla, distances_vanilla = database.similarity_search(chosen_collection, query_embeddings, k=k)
            context = rag_utils.create_prompt_milvus(query, search_results_vanilla)
        else:
            context = "No related documents found"
            source_final = []
    del encoder
    return jsonify({
        'context': context,
        'source': source_final
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
    model = current_app.config['CHAT_MODEL']
    database = current_app.config['DATABASE']
    #-------------------------------------------
    theme_context = database.describe_collection(theme)['description']
    answer = model.generate(query, context, streaming, max_tokens, history=history, user_profile=user_profile, theme_context=theme_context)
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
    database = current_app.config['DATABASE']
    #-------------------------------------------
    schema = database.get_collection_schema(collection_name, readable=True)
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
            r = requests.post(f"http://{os.getenv('AIRFLOW_HOST')}:{os.getenv('AIRFLOW_PORT')}/api/v1/dags/{os.getenv('AIRFLOW_DAGID_INSERT')}/dagRuns", json={
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

@main.route("/delete_file", methods=["POST"])
@cross_origin()
def delete_file():
    ##PARAMS
    document_id = request.form['document_id']
    collection_name = request.form['collection_name']
    database = current_app.config['DATABASE']
    #-------------------------------------------
    status, msg = database.delete_document(document_id=document_id, collection_name=collection_name)
    if status:
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'failed', 'message': msg}), 500

@main.route("/chunk_file", methods=["POST"])
@cross_origin()
def chunk_file():
    ##PARAMS
    data = request.form['text']
    #-------------------------------------------
    splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=75)
    chunks = splitter.split_text(data)
    return jsonify(chunks)

@main.route("/collection", methods=["POST"])
@cross_origin()
def create_collection():
    ##PARAMS
    name = request.form['name']
    description = request.form['description']
    metadata = {
        "title": {"description": "", "datatype": "string", "params": {"max_length": 700}},
        "article": {"description": "", "datatype": "string", "params": {"max_length": 5000}},
        "embedding": {"description": "", "datatype": "vector", "params": {"dim": 1024}},
        "url": {"description": "", "datatype": "string", "params": {"max_length": 300}},
        "chunk_id": {"description": "", "datatype": "int", "params": {}},
        "created_at": {"description": "", "datatype": "string", "params": {"max_length": 50}},
        "updated_at": {"description": "", "datatype": "string", "params": {"max_length": 50}},
        "is_active": {"description": "", "datatype": "bool", "params": {}}, #Float,int,string,list,bool
    }
    custom_meta = json.loads(request.form['metadata'])
    metadata.update(custom_meta)
    database = current_app.config['DATABASE']
    #-------------------------------------------
    database.create_collection(name, description, metadata)
    return jsonify({'collection_name': name})

@main.route("/insert_file/enhance", methods=["POST"])
@cross_origin()
def enhance_document():
    ##PARAMS
    article = request.form['article']
    collection_name = request.form['collection_name']
    model = current_app.config['CHAT_MODEL']
    database = current_app.config['DATABASE']
    #-------------------------------------------
    #TODO: Enhance document
    pydantic_schema = database.pydantic_collections[collection_name]
    result = rag_utils.enhance_document(article=article, model=model, collection_name=collection_name, pydantic_schema=pydantic_schema)
    if result != -1:
        splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=75)
        chunks = splitter.split_text(result['article'])
        result['chunks'] = chunks
        metadata = {}
        for k,v in result.items():
            if k == 'article' or k == 'chunks':
                continue
            metadata[k] = v
            #result.pop(k)
        result['metadata'] = metadata
        return jsonify(result)

@main.route("/dry_search", methods=["POST"])
@cross_origin()
def dry_search():
    #------------------DETERMINE COLLECTION------------------
    ##PARAMS
    query = request.form['query']
    history = [] # Conversation history
    threshold = 0.5
    #pho_queryrouter = PhoQueryRouter()
    pho_queryrouter = current_app.config['PHO_QUERYROUTER']
    #----------------------------------
    conversation = ""
    for h in history:
        conversation += h['question'] + ". "
    conversation += query
    segmented_query = query_routing.segment_vietnamese(conversation + query)
    if type(segmented_query) is list:
        segmented_conversation = " ".join(segmented_query)
    else:
        segmented_conversation = segmented_query
    prediction = pho_queryrouter.classify(segmented_conversation)[0]
    chosen_collection = prediction['label']
    print("Query Routing: " + chosen_collection + " ----- Score: " + str(prediction['score']) + "\n")

    if prediction['score'] < threshold: #Unsure
        segmented_query = query_routing.segment_vietnamese(query)
        if type(segmented_query) is list:
            segmented_conversation = " ".join(segmented_query)
        else:
            segmented_conversation = segmented_query
        prediction = pho_queryrouter.classify(query_routing.segment_vietnamese(segmented_conversation))[0] #Only guessing from the current message
        chosen_collection = prediction['label']
        # if prediction['score'] < threshold: #Still unsure, return empty collection
        #     chosen_collection = ""
    # database.load_collection(chosen_collection, persist=True)
    #-------------------EXTRACT METADATA-------------------
    ##PARAMS
    query = request.form['query']
    
    history = [] # Conversation history
    n_new_queries = 2
    model = current_app.config['CHAT_MODEL']
    database = current_app.config['DATABASE']
    #----------------------------------
    conversation = ""
    for h in history:
        conversation += h['question'] + ".\n"
    conversation += query
    #extracted_metadata = rag_utils.metadata_extraction(query, model, schema)
    is_old_extract = True
    if is_old_extract: #OLD METADATA EXTRACTION
        extracted_metadata = rag_utils.metadata_extraction_v2(query, model, chosen_collection, pydantic_schema=database.pydantic_collections[chosen_collection])
        if extracted_metadata != -1: #No metadata found
            filter_expressions = rag_utils.compile_filter_expression(extracted_metadata, database.persistent_collections + [chosen_collection])
        else:
            filter_expressions = {}
    else:
        rewritten_queries = rag_utils.rewrite_query(conversation=conversation, model=model, k=n_new_queries)
        if rewritten_queries == -1:
            extracted_metadata = rag_utils.metadata_extraction_v2(query, model, chosen_collection, pydantic_schema=database.pydantic_collections[chosen_collection])
            if extracted_metadata != -1: #No metadata found
                filter_expressions = rag_utils.compile_filter_expression(extracted_metadata, database.persistent_collections + [chosen_collection])
            else:
                filter_expressions = {}
        else:
            filter_expressions = []
            for q in rewritten_queries:
                extracted_metadata = rag_utils.metadata_extraction_v2(q, model, chosen_collection, pydantic_schema=database.pydantic_collections[chosen_collection])
                if extracted_metadata != -1: #No metadata found
                    expr = rag_utils.compile_filter_expression(extracted_metadata, database.persistent_collections + [chosen_collection])
                else:
                    expr = {}
                filter_expressions.append({q: expr})
    #-------------------SEARCHING-------------------
    ##PARAMS
    k = 4
    #encoder = rag_utils.Encoder(provider=os.getenv("EMBED_PROVIDER", "local"))
    encoder = current_app.config['ENCODER']
    database = current_app.config['DATABASE']
    #----------------------------------
    database.load_collection(chosen_collection)
    # output_fields = {
    #     'student_handbook': ['title', 'article'],
    #     chosen_collection: ['title', 'article']
    # }
    output_fields = {
        'student_handbook' : ['document_id'],
        chosen_collection: ['document_id']
    }
    
    if type(filter_expressions) == dict:
        query_embeddings = encoder.embedding_function("query: " + query)
        try:
            search_results, source, distances = database.similarity_search(chosen_collection, query_embeddings, filters=filter_expressions, k=k, output_fields=output_fields)
            search_results_vanilla, source_vanilla, distances_vanilla = database.similarity_search(chosen_collection, query_embeddings, k=k, output_fields=output_fields)

            if search_results == -1:
                search_results, source, distances = [], [], []
            else:
                filter_bias = 0.7
                distances = [d*filter_bias for d in distances]

            search_results = search_results + search_results_vanilla
            source = source + source_vanilla
            distances = distances + distances_vanilla
            results = {k: (article, s) for k, article, s in zip(distances, search_results, source)}

            distances.sort()
            distances = distances[:k]
            search_results_final = [results[k][0] for k in distances]
            source_final = [results[k][1] for k in distances]
        except Exception as e:
            print("Error with filter search")
            print(e)
            search_results_final, source_final, _ = database.similarity_search(chosen_collection, query_embeddings, output_fields=output_fields)
    elif type(filter_expressions) == list: #Filter expressions contain rewritten queries - perform hybrid search
        search_results_final, source_final, _ = database.hybrid_search(
            collection=chosen_collection, 
            query_embeddings=[encoder.embedding_function("query: " + list(q.keys())[0]) for q in filter_expressions], 
            k=k,
            limit_per_req=4,
            filters=[list(q.values())[0] for q in filter_expressions],
            output_fields=output_fields
            )
    if search_results_final != -1:
        document_ids = [d.get('document_id') for d in search_results_final]
    elif search_results_final == -2: #Error in hybrid search, revert to vanilla search
        search_results_vanilla, source_vanilla, distances_vanilla = database.similarity_search(chosen_collection, query_embeddings, k=k, output_fields=output_fields)
        document_ids = [d.get('document_id') for d in search_results_final]
    else:
        context = "No related documents found"
        source_final = []
    del encoder
    return jsonify({
        'document_ids': document_ids,
        'source': source_final
        })