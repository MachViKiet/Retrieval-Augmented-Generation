import chromadb
class ChromaDB:    
    def __init__(self) -> None:
        self.client = chromadb.Client()
    
    def create_collection(self, collection_name):
        collection = self.client.get_or_create_collection(collection_name)
        return collection
    def add_documents(self, collection, documents, metadatas, ids=None):
        if ids is None:
            ids = [str(i+1) for i in range(len(documents))]
        collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
    def search(self, collection, query, n_results):
        return collection.query(
            query_texts=query,
            n_results=n_results
        )