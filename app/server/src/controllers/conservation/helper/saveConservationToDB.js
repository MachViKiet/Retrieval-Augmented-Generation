import { buildErrObject } from '~/middlewares/utils'

const History = require('~/models/history')

export const saveConservationToDB = async (conservation = {}) => {
  const history = new History({
    sender : conservation.sender,
    session_id: conservation.session_id,
    question : conservation.question,
    anwser: conservation.anwser,
    duration: conservation.duration,
    state: conservation.state
  })

  const result = await history.save().then(async (data) => {
    return data
  }).catch((err) => {
    return buildErrObject(422, err.message)
  })

  return result
}