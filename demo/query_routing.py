import py_vncorenlp
from jpype import isJVMStarted
import os

os.environ['JAVA_HOME'] = r'C:\Program Files\Java\jdk-23'

if not isJVMStarted():
    path = r"C:\Users\NguyenDuyDangKhoa\Documents\vscode_playground\Retrieval-Augmented-Generation\static\vncorenlp"
    rdrsegmenter = py_vncorenlp.VnCoreNLP(annotators=["wseg"], save_dir=path)

def segment_vietnamese(text):
    result = rdrsegmenter.word_segment(text)
    result = ' '.join([''.join(x) for x in result])
    return result