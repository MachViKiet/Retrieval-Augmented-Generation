import { buildErrObject } from '~/middlewares/utils'
const Chat_session = require('~/models/chat_session')

export const updateChatSession = async (id, data = null) => {
  const result = await Chat_session.findByIdAndUpdate(id, data, { new: true }).then(async (_doc) => {
    if (!_doc) {
      return buildErrObject(422, 'NOT_FOUND')
    }

    return _doc
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}