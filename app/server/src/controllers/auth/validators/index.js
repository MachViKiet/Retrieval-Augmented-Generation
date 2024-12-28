const { validateLogin } = require('./validateLogin')
const { validateRegister } = require('./validateRegister')
const { validateVerifyEmail } = require('./validateVerifyEmail')

module.exports = {
  validateLogin,
  validateRegister,
  validateVerifyEmail
}