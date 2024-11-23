import { chunk_file } from '~/apis/KHTN_Chatbot/Document/chunk_file'
import { buildErrObject } from '~/middlewares/utils'
import { read_pdf } from '~/utils/read_pdf'

const Document = require('~/models/document')

const { v4: uuidv4 } = require('uuid')

export const getChunkFromdbByDocumentID = async (id = '') => {

  const result = await Document.findById(id).then(async ({ _doc }) => {
    if (!_doc) {
      return buildErrObject(422, 'NOT_FOUND')
    }

    let content = null
    if (_doc?.document_name_in_storage) {
      content = await read_pdf(_doc?.document_name_in_storage)
    } else {
      content = ''
    }

    let chunks = null
    try {
      const formData = new FormData()
      formData.append('text', content)
      chunks = await chunk_file(formData)
    } catch (error) {
      chunks = []
    }

    const chunksWithID = chunks.map((chunk) => {
      return {
        id: uuidv4(),
        chunk
      }
    })

    return { ..._doc, chunks: chunksWithID }
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}