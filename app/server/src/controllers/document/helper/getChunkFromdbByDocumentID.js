import { useKHTN_Chatbot } from '~/apis/KHTN_Chatbot'
import { buildErrObject } from '~/middlewares/utils'

const Document = require('~/models/document')
const Collection = require('~/models/collection')

export const getChunkFromdbByDocumentID = async (id = '') => {

  const result = await Document.findById(id).then(async ({ _doc }) => {
    if (!_doc) {
      return buildErrObject(422, 'NOT_FOUND')
    }

    let chunks = null

    try {
      if (!(_doc.state == 'pending')) {
        throw 'Đang xử lý'
      }

      if (_doc?.document_type && _doc?.document_type == 'Upload') {
        chunks = _doc?.chunks
      } else {
        // chunks = []
        const collection_name = await Collection.findById(_doc.collection_id)
          .then((_collection) => _collection.name )
          .catch(() => { throw buildErrObject(422, 'Không thể đọc collection') })

        useKHTN_Chatbot.get_chunk_file(collection_name)
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