const User = require('~/models/user')
const { itemNotFound } = require('~/middlewares/utils')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = async (email = '') => {
  const run = async (email) => {
    const items = await User.findOne({ email }).then(async (item) => {
      await itemNotFound(false, item, 'USER_DOES_NOT_EXIST')
      return new User(item)
    }).catch(async (err) => {
      await itemNotFound(err, null, 'USER_DOES_NOT_EXIST')
      return err
    })
    return items
  }
  const res = await run(email)
  return res
}

module.exports = { findUser }
