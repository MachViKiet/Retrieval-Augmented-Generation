const User = require('~/models/user')
const { buildErrObject } = require('~/middlewares/utils')

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = async (id = '') => {

  const result = await User.findById(id, '-_id -createdAt -password').then((user) => {
    if (!user) {
      return buildErrObject(422, 'NOT_FOUND')
    }
    return user
  }).catch((err) => {
    throw buildErrObject(422, err.message)
  })

  return result


  // return new Promise((resolve, reject) => {
  //   User.findById(id, '-_id -updatedAt -createdAt', async (err, user) => {
  //     try {
  //       await itemNotFound(err, user, 'NOT_FOUND')
  //       resolve(user)
  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // })
}

module.exports = { getProfileFromDB }
