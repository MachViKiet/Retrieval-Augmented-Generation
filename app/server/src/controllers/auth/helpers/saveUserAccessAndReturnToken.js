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
  const token = generateToken(user._id)

  const userAccess = new UserAccess({
    email: user.email,
    user: user._id,
    ip: getIP(req),
    browser: getBrowserInfo(req),
    country: 'Viet Nam',
    token: token,
    socketid: null
  })

  const result = await userAccess.save().then(async () => {
    const userInfo = getUserInfo(user)
    // Returns data with access token
    return ({
      token: token,
      user: userInfo
    })
  }).catch((err) => {
    return buildErrObject(422, err.message)
  })

  return result
}

module.exports = { saveUserAccessAndReturnToken }
