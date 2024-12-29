const { feedback } = require('./feedback')
const { login } = require('./login')
const { register } = require('./register')
const { request_validateEmail } = require('./request_validateEmail')
const { roleAuthorization } = require('./roleAuthorization')
const { validateEmail } = require('./validateEmail').default

module.exports = {
  login,
  register,
  roleAuthorization,
  feedback,
  validateEmail,
  request_validateEmail
}