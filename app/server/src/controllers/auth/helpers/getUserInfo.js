/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const getUserInfo = (req = {}) => {

  let user = {
    _id: req._id,
    name: req.name,
    email: req.email,
    role: req.role,
    verified: req.verified,
    phone: req.phone,
    birth: req.birth,
    degree: req.degree,
    majors: req.majors,
    methods: req.methods,
    goals: req.goals,
    preferences: req.preferences,
    blockExpires: req.blockExpires
  }

  if (process.env.NODE_ENV !== 'production') {
    user = {
      ...user,
      verification: req.verification
    }
  }
  return user
}

module.exports = { getUserInfo }
