const User = require('~/models/user')
const { buildErrObject } = require('~/middlewares/utils')

/**
 * Checks User model if user with an specific email exists
 * @param {string} email - user email
 */
const emailExists = async (email = '') => {
  const userInf = await User.findOne({
    email
  }).then((item) => item === null ? false : buildErrObject(422, 'EMAIL_ALREADY_EXISTS'))
    .catch((err) => buildErrObject(422, err.message))

  return userInf
}

module.exports = { emailExists }
