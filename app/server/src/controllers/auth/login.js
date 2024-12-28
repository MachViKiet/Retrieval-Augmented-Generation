const { matchedData } = require('express-validator')

const {
  findUser,
  userIsBlocked,
  passwordsDoNotMatch,
  saveUserAccessAndReturnToken
} = require('~/controllers/auth/helpers')

const { handleError, buildErrObject } = require('~/middlewares/utils')
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

    if (user?.verified) {
      const isPasswordMatch = await checkPassword(data.password, user)
      if (!isPasswordMatch ) {
        handleError(res, await passwordsDoNotMatch(user))
      } else {
        res.status(200).json(await saveUserAccessAndReturnToken(req, user))
      }
    } else {
      handleError(res, buildErrObject(422, 'The account has not been email verified.'))
      return
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { login }
