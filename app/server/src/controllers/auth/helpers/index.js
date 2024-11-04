const { findUser } = require('./findUser')
const { checkLoginAttemptsAndBlockExpires } = require('./checkLoginAttemptsAndBlockExpires')
const { passwordsDoNotMatch } = require('./passwordsDoNotMatch')
const { saveUserAccessAndReturnToken } = require('./saveUserAccessAndReturnToken')
const { userIsBlocked } = require('./userIsBlocked')
const { returnRegisterToken } = require('./returnRegisterToken')
const { registerUser } = require('./registerUser')
const { setUserInfo } = require('./setUserInfo')

module.exports = {
  checkLoginAttemptsAndBlockExpires,
  findUser,
  passwordsDoNotMatch,
  saveUserAccessAndReturnToken,
  userIsBlocked,
  returnRegisterToken,
  registerUser,
  setUserInfo
}