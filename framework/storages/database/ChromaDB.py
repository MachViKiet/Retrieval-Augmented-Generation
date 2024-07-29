import chromadb
class ChromaDB:    
    def __init__(self) -> None:
        self.client = chromadb.Client()
    
    def create_collection(self, collection_name):
        collection = self.client.create_collection(collection_name)
        return collection
    def add_documents(self, collection, documents, metadatas):
        collection.add(
            documents=documents,
            metadatas=metadatas,
        )
    def search(self, collection, query, n_results):
        collection.query(
            query,
            n_results=n_results
        )