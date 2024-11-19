const User = require('~/models/user')
const { buildErrObject } = require('~/middlewares/utils')

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getUserByToken = async (id = '') => {

  const result = await User.findById(id, '-_id email name role').then((user) => {
    if (!user) {
      return buildErrObject(422, 'NOT_FOUND')
    }
    return user
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result
}

module.exports = { getUserByToken }
