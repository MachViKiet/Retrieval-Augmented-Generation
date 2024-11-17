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

  return user
}

module.exports = { getUserInfo }
