import { buildErrObject } from '~/middlewares/utils'

const Document = require('~/models/document')

export const getChunkFromdbByDocumentID = async (id = '') => {
  const result = await Document.findById(id).then(({ _doc }) => {
    if (!_doc) {
      return buildErrObject(422, 'NOT_FOUND')
    }

    return { ..._doc, chunks: [] }
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}