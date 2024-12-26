const History = require('~/models/history')
const Chat_session = require('~/models/chat_session')
const { buildErrObject } = require('~/middlewares/utils')

/**
 * Gets profile from database by id
 * @param {string} id - session id
 * @param {string} user - user Object
 */
export const getHistoryByChatSessionID = async (user = {}, id = '') => {
  const result = await History.find({
    sender: user._id,
    session_id: id
  }, '-sender').sort({ createdAt: 1 }).then(async (history) => {
    if (!history) {
      return buildErrObject(422, 'NOT_FOUND')
    }
    const session = await Chat_session.findById(id)
    return {...session._doc, history }
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}