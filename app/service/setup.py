import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from routes import initRoutes
from errorHandler import InvalidDataError
from flask_cors import CORS

from models.model import ChatModel, PhoQueryRouter
from utils import rag_utils, query_routing

# Load environment variables from .env file
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
load_dotenv()

# get environment variables
username = os.getenv("AUTHOR")
# elastic_password = os.getenv("ELASTIC_PASSWORD")
# elasticsearch_url = os.getenv("ELASTICSEARCH_URL")
# elastic_cert = os.getenv("ELASTIC_CERT")


def createApp():
    app = Flask(__name__)
    cors = CORS(app)

    app.config["CORS_HEADERS"] = "Content-Type"

    app.register_blueprint(initRoutes.main)  # Register blueprint with routes
    # app.register_blueprint(initRoutes)  # Register blueprint with routes

    # Initialize Elasticsearch connection
    # elastic = Elastic()
    # print(f"Connect to Elasticsearch: {elastic.check_connect()}")

    # ------------------ Getting Error Notification --------------------
    def handle_unexpected_error(error):
        print(error)
        return jsonify({"error": "Unexpected error" + error.args[0]}), 500

    @app.errorhandler(InvalidDataError)
    def handle_invalid_data_error(error):
        return jsonify({"error": error.args[0]}), 400

    # -------------- Store connection, embedding in app's config -------------- #
    # model_embedding = SentenceTransformer("intfloat/e5-small-v2")
    # app.config["EMBEDDING_MODEL"] = model_embedding  # setup global variable

    # -------------- Store connection, chunking in app's config --------------- #
    # model_chunking = HuggingFaceBgeEmbeddings(
    # model_name="BAAI/bge-small-en",  #
    # model_kwargs={"device": "cpu"},
    # encode_kwargs= {'normalize_embeddings': True}  # config to normalize
    # )
    # app.config["CHUNKING_MODEL"] = model_chunking  # setup global variable

    # Initial Admin Object + reload database if server shuts down.
    # admin_controler = Admin()

    # app.config["RERANKING_MODEL"] = FlagReranker(
    # "BAAI/bge-reranker-v2-m3", use_fp16=True
    # )
    print("---LOADING ASSETS---")
    model = ChatModel(provider=os.getenv("PROVIDER"), model_id=os.getenv("CHAT_MODEL_ID"))
    app.config["CHAT_MODEL"] = model
    print("Chat model loaded.")
    encoder = rag_utils.Encoder(provider=os.getenv("EMBED_PROVIDER", "local"))
    app.config["ENCODER"] = encoder
    print("Encoder loaded.")
    pho_queryrouter = PhoQueryRouter()
    app.config["PHO_QUERYROUTER"] = pho_queryrouter
    print("Query Router loaded.")
    database = rag_utils.MilvusDB(
        host=os.getenv('MILVUS_HOST', ""), port=os.getenv('MILVUS_PORT', ""),
        user=os.getenv('MILVUS_USERNAME', ""), password=os.getenv('MILVUS_PASSWORD', ""),
        uri=os.getenv('MILVUS_URI', ""), token=os.getenv('MILVUS_TOKEN', "")
    )
    database.load_collection('student_handbook', persist=True)
    app.config["DATABASE"] = database
    print("Database loaded.")
    # return jsonify({})
    print("All assets loaded.")
    return app
