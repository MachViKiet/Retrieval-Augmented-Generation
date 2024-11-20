const Chat_session = require('~/models/chat_session')
const { buildErrObject } = require('~/middlewares/utils')

/**
 * Gets profile from database by id
 * @param {string} id - session id
 */
export const getConservationFromDB = async (id = '') => {

  const result = await Chat_session.find({
    owner: id
  }, '-owner').sort({ createdAt: -1 }).then((conservation) => {
    if (!conservation) {
      return buildErrObject(422, 'NOT_FOUND')
    }
    return conservation
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}