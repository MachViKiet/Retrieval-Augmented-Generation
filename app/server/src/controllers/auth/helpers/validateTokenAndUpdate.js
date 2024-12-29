const { buildErrObject } = require('~/middlewares/utils')
const User = require('~/models/user')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const validateTokenAndUpdate = async (_id = '') => {

  return User.findOneAndUpdate({ verification: _id }, { $set: { verified: true } }, { new: true })
    .then(() => ({
      'message': 'Đăng Kí Thành Công'
    })).catch((e) => {
      throw buildErrObject(422, e.message)
    })
}

module.exports = { validateTokenAndUpdate }
