import os
import streamlit as st
# from model import ChatModel
# import rag_util


FILES_DIR = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "files")
)


st.title("LLM Chatbot RAG Assistant")


@st.cache_resource
def load_model():
    
    # TODO : Tạo LLM
    # model = ChatModel(model_id="google/gemma-2b-it", device="cuda")
    
    model = None # TODO xóa
    return model

@st.cache_resource
def load_encoder():
    
    # TODO : Tạo sentence-transformers
    # encoder = rag_util.Encoder(
    #     model_name="sentence-transformers/all-MiniLM-L12-v2", device="cpu"
    # )
    
    encoder = None  # TODO xóa
    return encoder


model = load_model()  # load our models once and then cache it
encoder = load_encoder()


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
        # Tham khảo file model
        # context = (
        #     None if uploaded_files == [] else DB.similarity_search(user_prompt, k=k)
        # )
        # answer = model.generate(
        #     user_prompt, context=context, max_new_tokens=max_new_tokens
        # )
        
        answer = 'Hello bro, i cannot connect to server'  # TODO xóa
        response = st.write(answer)
        
    st.session_state.messages.append({"role": "assistant", "content": answer})
