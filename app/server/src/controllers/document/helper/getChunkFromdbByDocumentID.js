import { useKHTN_Chatbot } from '~/apis/KHTN_Chatbot'
import { buildErrObject } from '~/middlewares/utils'

const Document = require('~/models/document')
const Collection = require('~/models/collection')

const { v4: uuidv4 } = require('uuid')

export const getChunkFromdbByDocumentID = async (id = '') => {
  const result = await Document.findById(id).then(async ({ _doc }) => {
    if (!_doc) {
      return buildErrObject(422, 'NOT_FOUND')
    }

    let chunks = null

    try {
      if ((_doc.state == 'processing')) {
        throw 'Đang xử lý'
      }
      if (_doc?.document_type && _doc?.document_type == 'Upload') {
        chunks = _doc?.chunks
      } else {
        const collection_name = await Collection.findById(_doc.collection_id)
          .then((_collection) => _collection.name )
          .catch(() => { throw buildErrObject(422, 'Không thể đọc collection') })

        const formData = new FormData
        formData.append('collection_name', collection_name )
        formData.append('document_id', _doc._id )
        chunks = await useKHTN_Chatbot().get_chunk_file(formData)
          .catch(() => { throw buildErrObject(422, 'Không thể đọc chunk từ db') })
        chunks = chunks.map((chunk) => ({ id: uuidv4(), chunk }))
      }

    } catch (error) {
      chunks = []
    }

    return { ..._doc, chunks: chunks }
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}