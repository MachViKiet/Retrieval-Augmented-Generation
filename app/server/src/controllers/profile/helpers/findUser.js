const User = require('~/models/user')
const { buildErrObject } = require('~/middlewares/utils/buildErrObject')

/**
 * Finds user by id
 * @param {string} id - user id
 */
const findUser = (id = '') => {
  User.findById(id, 'password email').then((item) => {
    if (!item) {
      throw buildErrObject(404, 'USER_DOES_NOT_EXIST')
    }
    return
  }).catch((err) => {
    return buildErrObject(422, err.message, 'Lỗi Tìm Thông Tin User ' + err.message )
  })
}

module.exports = { findUser }
