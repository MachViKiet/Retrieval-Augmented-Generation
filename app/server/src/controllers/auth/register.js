const { matchedData } = require('express-validator')

const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

const { handleError } = require('../../middlewares/utils')
const { emailExists } = require('../emailer')

// const {
//   // sendRegistrationEmailMessage
// } = require('../../middleware/emailer')

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
      console.log('item', item)
      const userInfo = setUserInfo(item)
      const response = returnRegisterToken(item, userInfo)
      // sendRegistrationEmailMessage(locale, item)
      res.status(201).json(response)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { register }
