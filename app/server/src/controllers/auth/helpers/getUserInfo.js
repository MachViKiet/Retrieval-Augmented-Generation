/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const getUserInfo = (req = {}) => {

  let user = {
    name: req.name,
    email: req.email,
    role: req.role
  }

  // if (process.env.NODE_ENV !== 'production') {
  //   user = {
  //     ...user,
  //     verification: req.verification
  //   }
  // }

  return user
}

module.exports = { getUserInfo }
