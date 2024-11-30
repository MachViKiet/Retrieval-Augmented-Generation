import { buildErrObject } from '~/middlewares/utils'

const History = require('~/models/history')

export const updateConservation = async (id = null, data = null) => {
  const result = await History.findByIdAndUpdate(id, data, { new: true }).then(async (_doc) => {
    if (!_doc) {
      return buildErrObject(422, 'NOT_FOUND')
    }

    return _doc
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}