# Chỗ viết file main thực thi chương trình
import pandas as pd
from framework.storages.database.ChromaDB import ChromaDB
from framework.models.language_models.IBMModel import IBMModel

# Khởi tạo database, tạo collection
db = ChromaDB()
collection = db.create_collection('test')

# Đọc dữ liệu csv
df = pd.read_csv("documentation/TT 29 TDKT.csv")
# Truy xuất metadata theo đúng format
## TODO: Sau này nên có hàm hỗ trợ việc này (utils)
metas = [
    {
        "Title": val[0],
        "Chunk ID": val[1]
    }
    for val in df.values
]

# Thêm tài liệu vào collection và vector hóa nội dung
db.add_documents(collection, documents=list(df['Content'].values), metadatas=metas)
print("Đã đọc tài liệu + Tạo vector database in-memory (ChromaDB)")
print("Kho dữ liệu có", collection.count(), "dòng")

## Khởi tạo mô hình và gọi hàm 
# Các tham số cần thiết
# TODO: Cần có cách tốt hơn để đọc những tham số này (security reasons)
model_id = "mistralai/mistral-large"
apikey = "XY6YolsO_sW5fIzdKlQyZqUNt0uBfylcWrxxJ46UIhIw"
credentials = {
    "url": "https://us-south.ml.cloud.ibm.com",
    "apikey": apikey
}
parameters = {
    "decoding_method": "greedy", #Đổi sang sampling thì mô hình sẽ "sáng tạo" hơn
    "max_new_tokens": 300, #Chiều dài tối đa cho output - để đề phòng mô hình nói nhiều
    "repetition_penalty": 1 #Giá trị từ 1-2 (1 thì mô hình luôn trả lời y chang, 2 thì ngược lại)
}
project_id = "b2ce1b2d-0641-4d0e-95cb-39f7dca76da1"

model = IBMModel(model_id, credentials, project_id, parameters)
print("Khởi tạo mô hình thành công")
# Tìm kiếm dựa trên query + prompt engineering
## TODO: Có sự chuẩn hóa output của kết quả tìm kiếm - results
## TODO: Có hàm hỗ trợ viết prompt (prompt engineering) (utils)
query = "Đối tượng áp dụng thông tư"
results = db.search(collection, query, n_results=3)
print("Tìm kiếm trong kho dữ liệu thành công")
context = ""
results = results['documents'][0]
for r in results:
    context = context + r + '\n\n'
prompt = f"""Bạn là một trợ lý ảo. Hãy trả lời câu hỏi của người dùng dựa trên ngữ cảnh được cung cấp bên dưới. Hãy trả lời bằng tiếng Việt. Nếu bạn không thể trả lời câu hỏi với ngữ cảnh được cho, hãy trả lời tôi không biết.
Tuyệt đối không đưa thông tin sai sự thật. Luôn trả lời bằng giọng điệu tích cực và không chứa hàm ý tấn công đến bất kỳ một cá nhân chủng tộc nào.

NGỮ CẢNH:
{context}

CÂU HỎI: {query}
"""

response = model.generate(prompt)
print("Câu hỏi query:", query)
print("---------------")
print(response)