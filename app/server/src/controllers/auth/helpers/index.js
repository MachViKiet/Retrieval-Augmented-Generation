const { findUser } = require('./findUser')
const { checkLoginAttemptsAndBlockExpires } = require('./checkLoginAttemptsAndBlockExpires')
const { passwordsDoNotMatch } = require('./passwordsDoNotMatch')
const { saveUserAccessAndReturnToken } = require('./saveUserAccessAndReturnToken')
const { userIsBlocked } = require('./userIsBlocked')
const { returnRegisterToken } = require('./returnRegisterToken')
const { registerUser } = require('./registerUser')
const { getUserInfo } = require('./getUserInfo')
const { checkPermissions } = require('./checkPermissions')

module.exports = {
  checkLoginAttemptsAndBlockExpires,
  findUser,
  passwordsDoNotMatch,
  saveUserAccessAndReturnToken,
  userIsBlocked,
  returnRegisterToken,
  registerUser,
  getUserInfo,
  checkPermissions
}