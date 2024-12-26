import { insert_file } from '~/apis/KHTN_Chatbot/Document/insert_file'
import { buildErrObject } from '~/middlewares/utils'

const Document = require('~/models/document')
const Collection = require('~/models/collection')

export const processDocument = async (id = null, chunks = null) => {
  const result = await Document.findById(id).then(async (_doc) => {
    if (!_doc) {
      return buildErrObject(422, 'NOT_FOUND')
    }

    if (_doc?.state != 'pending') {
      return buildErrObject(422, 'Tài Liệu đã hoặc đang được xử lý')
    }

    if (!_doc?.metadata || _doc.metadata == {}) {
      return buildErrObject(422, 'METADATA_NOT_EMPTY')
    }

    const collection_name = await Collection.findById(_doc.collection_id)
      .then((collection) => collection.name)

    const data = {
      chunks: chunks.length,
      collection_name: collection_name,
      filename: _doc.originalName,
      metadata: JSON.stringify({
        created_at: _doc.createdAt,
        updated_at: _doc.updatedAt,
        title: _doc.document_name,
        url: _doc.url,
        document_id: _doc._id,
        ..._doc.metadata
      })
    }

    const formData = new FormData()
    formData.append('chunks', JSON.stringify(chunks) )
    formData.append('collection_name', collection_name)
    formData.append('filename', _doc.originalName)
    formData.append('metadata', JSON.stringify({
      created_at: _doc.createdAt,
      updated_at: _doc.updatedAt,
      title: _doc.document_name,
      url: _doc.url,
      document_id: _doc._id,
      ..._doc.metadata
    }))

    console.log('Dữ liệu gởi đi để xử lý', data)

    const result = await insert_file(formData)
      .then((data) => data)
      .catch((err) => { throw buildErrObject(422, err) })
    console.log(result)
    await Document.findByIdAndUpdate(_doc._id, {
      state: result?.state,
      dag_id: result?.dag_id,
      dag_run_id: result?.dag_run_id,
    })

    return result
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}