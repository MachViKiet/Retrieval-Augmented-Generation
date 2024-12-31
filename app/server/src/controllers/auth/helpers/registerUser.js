import { v4 } from 'uuid'
import User from '../../../models/user'
import { buildErrObject } from '../../../middlewares/utils'

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
export const registerUser = async (req = {}) => {
  const user = new User({
    name: req.name,
    email: req.email,
    password: req.password,
    verification: v4(),
    verified: process.env.NODE_ENV === 'production'
  })

  const res = user.save().then(item => item).catch((err) => buildErrObject(422, err.message))

  return res

}

export default registerUser
