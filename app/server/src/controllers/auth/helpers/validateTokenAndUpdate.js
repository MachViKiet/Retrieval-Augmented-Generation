import { buildErrObject } from '../../../middlewares/utils'
import User from '../../../models/user'

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
export const validateTokenAndUpdate = async (_id = '') => {

  return User.findOneAndUpdate({ verification: _id }, { $set: { verified: true } }, { new: true })
    .then(() => ({
      'message': 'Đăng Kí Thành Công'
    })).catch((e) => {
      throw buildErrObject(422, e.message)
    })
}

export default validateTokenAndUpdate
