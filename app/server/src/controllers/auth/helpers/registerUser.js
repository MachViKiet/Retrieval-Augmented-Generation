const uuid = require('uuid')
const User = require('~/models/user')
const { buildErrObject } = require('~/middlewares/utils')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = async (req = {}) => {
  const user = new User({
    name: req.name,
    email: req.email,
    password: req.password,
    verification: uuid.v4(),
    verified: process.env.NODE_ENV === 'production'
  })

  const res = user.save().then(item => item).catch((err) => buildErrObject(422, err.message))

  return res

}

module.exports = { registerUser }
