const { feedback } = require('./feedback')
const { login } = require('./login')
const { register } = require('./register')
const { roleAuthorization } = require('./roleAuthorization')

module.exports = {
  login,
  register,
  roleAuthorization,
  feedback
}