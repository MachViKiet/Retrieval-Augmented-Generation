import { buildErrObject } from '../../../middlewares/utils'
import Document from '../../../models/document'
import Collection from '../../../models/collection'
import mongoose from 'mongoose'
import { useKHTN_Chatbot } from '~/apis/KHTN_Chatbot'

export const deleteDocumentAndUpdateCollection = async (id = null) => {
  const KHTN_Chatbot = useKHTN_Chatbot()
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const deletedDocument = await Document.findOneAndDelete({ _id: id }, { session })
    if (!deletedDocument) {
      throw { message: 'Document not found' }
    }

    // Bước 2: Cập nhật số lượng sách của tác giả
    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: deletedDocument.collection_id }, // Điều kiện tìm kiếm
      { $inc: { amount_document: -1 } }, // Cập nhật amount_document giảm 1
      { new: true, session } // Gộp new: true và session trong một đối tượng
    )

    const formData = new FormData()
    formData.append('document_id', deletedDocument._id )
    formData.append('collection_name', updatedCollection.name )
    await KHTN_Chatbot.delete_file(formData)

    await session.commitTransaction()
    session.endSession()
    return { message: 'DELETE_SUCCESS' }
  }
  catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw buildErrObject(505, error.message)
  }
}

export default deleteDocumentAndUpdateCollection