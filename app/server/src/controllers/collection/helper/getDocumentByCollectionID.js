const Collection = require('~/models/collection')
const { buildErrObject } = require('~/middlewares/utils')
const { ObjectId } = require('mongodb')
/**
 * Gets document from database by collection id
 * @param {string} id - collection id
 */
export const getDocumentByCollectionID = async (id = '') => {
  const result = await Collection.aggregate([
    {
      $match: {
        _id: new ObjectId(id) // Điều kiện tìm kiếm user có userID = 124
      }
    },
    {
      $lookup: {
        from: 'documents',
        localField: '_id',
        foreignField: 'collection_id',
        as: 'documents' // Tên trường sau khi join
      }
    }
  ]).then((document) => {
    if (!document || document.length == 0) {
      return buildErrObject(422, 'NOT_FOUND')
    }
    return document[0]
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}