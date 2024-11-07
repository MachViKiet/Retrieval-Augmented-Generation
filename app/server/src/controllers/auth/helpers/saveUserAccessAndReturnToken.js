const UserAccess = require('~/models/userAccess')
const { getUserInfo } = require('./getUserInfo')
const { generateToken } = require('./generateToken')
const {
  getIP,
  getBrowserInfo,
  buildErrObject
} = require('~/middlewares/utils')

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const saveUserAccessAndReturnToken = async (req = {}, user = {}) => {
  const userAccess = new UserAccess({
    email: user.email,
    ip: getIP(req),
    browser: getBrowserInfo(req),
    country: 'Viet Nam'
  })

  const result = await userAccess.save().then(async () => {
    const userInfo = getUserInfo(user)
    // Returns data with access token
    return ({
      token: generateToken(user._id),
      user: userInfo
    })
  }).catch((err) => {
    return buildErrObject(422, err.message)
  })

  return result
}

module.exports = { saveUserAccessAndReturnToken }
