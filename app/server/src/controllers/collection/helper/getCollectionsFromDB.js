const Collection = require('~/models/collection')
const { buildErrObject } = require('~/middlewares/utils')

/**
 * Gets collection from database by id
 */
export const getCollectionsFromDB = async () => {

  const result = await Collection.find({}).sort({ createdAt: 1 }).then((collections) => {
    if (!collections) {
      return buildErrObject(422, 'NOT_FOUND')
    }
    return collections
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}