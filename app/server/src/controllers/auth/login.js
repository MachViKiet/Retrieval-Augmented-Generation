const { matchedData } = require('express-validator')

const {
  findUser,
  userIsBlocked,
  passwordsDoNotMatch,
  // saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken
} = require('~/controllers/auth/helpers')

const { handleError } = require('~/middlewares/utils')
const { checkPassword } = require('~/middlewares/auth')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await findUser(data.email)
    await userIsBlocked(user)
    const isPasswordMatch = await checkPassword(data.password, user)
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch(user))
    } else {
      // all ok, register access and return token
      res.status(200).json(await saveUserAccessAndReturnToken(req, user))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { login }
