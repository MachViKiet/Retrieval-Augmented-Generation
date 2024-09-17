import py_vncorenlp
from jpype import isJVMStarted

if not isJVMStarted():
    path = r"C:\Users\NguyenDuyDangKhoa\Documents\vscode_playground\Retrieval-Augmented-Generation\notebook\vncorenlp"
    rdrsegmenter = py_vncorenlp.VnCoreNLP(annotators=["wseg"], save_dir=path)

def segment_vietnamese(text):
    result = rdrsegmenter.word_segment(text)
    result = ' '.join([''.join(x) for x in result])
    return result