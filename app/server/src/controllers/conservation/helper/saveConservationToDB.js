import { buildErrObject } from '~/middlewares/utils'

const History = require('~/models/history')

export const saveConservationToDB = async (conservation = {}) => {
  const history = new History({
    _id: conservation._id,
    sender : conservation.sender,
    session_id: conservation.session_id,
    question : conservation.question,
    anwser: conservation.anwser,
    duration: conservation.duration,
    source: conservation.source,
    rating: conservation.rating,
    state: conservation.state
  })

  const result = await history.save().then(async (data) => {
    return data
  }).catch((err) => {
    return buildErrObject(422, err.message)
  })

  return result
}