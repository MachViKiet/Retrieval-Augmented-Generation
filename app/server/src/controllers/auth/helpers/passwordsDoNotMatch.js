// const { saveLoginAttemptsToDB } = require('./saveLoginAttemptsToDB')
// const { blockUser } = require('./blockUser')
const { buildErrObject } = require('~/middlewares/utils')
const LOGIN_ATTEMPTS = 5

/**
 * Adds one attempt to loginAttempts, then compares loginAttempts with the constant LOGIN_ATTEMPTS, if is less returns wrong password, else returns blockUser function
 * @param {Object} user - user object
 */
const passwordsDoNotMatch = async (user = {}) => {
  const run = async () => {
    try {
      // user.loginAttempts += 1
      // await saveLoginAttemptsToDB(user)
      if (user.loginAttempts <= LOGIN_ATTEMPTS) {
        return buildErrObject(409, 'WRONG_PASSWORD')
      }
      // await blockUser(user)
    } catch (error) {
      // TODO :
      return error
    }
  }
  const res = await run()
  return res
}

module.exports = { passwordsDoNotMatch }
