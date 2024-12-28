const { matchedData } = require('express-validator')

const { registerUser, getUserInfo, returnRegisterToken } = require('./helpers')

const { handleError } = require('../../middlewares/utils')
const { emailExists } = require('../emailer')

const {
  prepareToSendEmail
} = require('../../middlewares/emailer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    // const locale = req.getLocale()

    req = matchedData(req)

    const doesEmailExists = await emailExists(req.email)

    if (!doesEmailExists) {
      const item = await registerUser(req)
      const userInfo = getUserInfo(item)
      const response = returnRegisterToken(item, userInfo)
      prepareToSendEmail(item)
      res.status(201).json(response)
      return
    }

    handleError(res, doesEmailExists)

  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { register }
