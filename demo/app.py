import os
import streamlit as st
from model import ChatModel
import rag_util
#from collections import descriptions

st.title("LLM Chatbot RAG Assistant")

@st.cache_resource
def load_model():
    # TODO : Tạo LLM
    model = ChatModel()    
    return model

@st.cache_resource
def load_encoder():
    # TODO : Tạo embedding model
    encoder = rag_util.Encoder()
    return encoder
#######################
descriptions = """List of collections:
recruitment: News about job postings, internships programs.
scholarship: Scholarship postings, scholarship results.
timetable: Learning plans/schedules for the semester/school year. Notifications to change classrooms.
academic_affairs: News posted by the academic affairs faculty. Forms, subjects registration, faculty operations.
events: Contests, Seminars.
"""
##INITIALIZE MODEL, DATABASE, ENCODER
host = '158.175.181.136'
port = '8080'
password = '4XYg2XK6sMU4UuBEjHq4EhYE8mSFO3Qq'
user = 'root'
server_pem_path =  'cert.pem'
database = rag_util.MilvusDB(
    host=host,
    port=port,
    password=password,
    user=user,
    server_pem_path=server_pem_path
    )
database.load_collection('student_handbook', persist=True)
model = load_model()  # load our models once and then cache it
encoder = load_encoder()
################################
def save_file(uploaded_file):
    """helper function to save documents to disk"""
    file_path = os.path.join(FILES_DIR, uploaded_file.name)
    with open(file_path, "wb") as f:
        f.write(uploaded_file.getbuffer())
    return file_path

with st.sidebar:
    max_new_tokens = st.number_input("max_new_tokens", 128, 4096, 512)
    k = st.number_input("k", 1, 10, 3)
    uploaded_files = st.file_uploader(
        "Upload PDFs for context", type=["PDF", "pdf"], accept_multiple_files=True
    )
    
    file_paths = []
    for uploaded_file in uploaded_files:
        file_paths.append(save_file(uploaded_file))
        
    # TODO : Viết flow upload file ở đây
    # Tham khảo file rag_util
    # if uploaded_files != []:  # upload file 
        # docs = rag_util.load_and_split_pdfs(file_paths)
        # DB = rag_util.FaissDb(docs=docs, embedding_function=encoder.embedding_function)


if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Ask me anything!"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        user_prompt = st.session_state.messages[-1]["content"]
        
        # TODO :  Viết flow của generate dữ liệu ở đây
        # Determine collection to search - apart from the persistent collections
        collection_names = database._handler.list_collections()
        context = rag_util.determine_collection(user_prompt, model, descriptions, collection_names)
        database.load_collection(context, persist=False)
        print("Collection to be searched: " + context)

        query_embeddings = encoder.embedding_function.embed_query(user_prompt)
        search_results = database.similarity_search(context, query_embeddings)
        context = rag_util.create_prompt_milvus(user_prompt, search_results)
        #Generate
        answer = model.generate(user_prompt, context)
        response = st.write(answer)
        
    st.session_state.messages.append({"role": "assistant", "content": answer})
