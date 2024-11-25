import { useKHTN_Chatbot } from '~/apis/KHTN_Chatbot'
import { buildErrObject } from '~/middlewares/utils'

const Document = require('~/models/document')
const Collection = require('~/models/collection')

const { v4: uuidv4 } = require('uuid')

export const getChunkFromdbByDocumentID = async (id = '') => {
  console.log('heloe \n\n\n')
  const result = await Document.findById(id).then(async ({ _doc }) => {
    if (!_doc) {
      return buildErrObject(422, 'NOT_FOUND')
    }

    console.log('heloe \n\n\n')


    let chunks = null

    console.log('heloe \n\n\n')


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

        chunks = useKHTN_Chatbot.get_chunk_file(_doc._id, collection_name)
          .catch(() => { throw buildErrObject(422, 'Không thể đọc chunk từ db') })
        chunks = chunks.map((chunk) => ({ id: uuidv4(), chunk }))
      }

    } catch (error) {
      chunks = []
    }

    console.log(chunks)

    return { ..._doc, chunks: chunks }
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}