const User = require('~/models/user')
const { buildErrObject } = require('~/middlewares/utils')

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = async (req = {}, id = '') => {
  const user = await User.findByIdAndUpdate( id, req, {
    new: true,
    runValidators: true,
    select: '-password -verification -_id -createdAt'
  }).then((user) => {
    if (!user) throw buildErrObject(422, 'NOT_FOUND')
    return user
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return user
}

module.exports = { updateProfileInDB }
