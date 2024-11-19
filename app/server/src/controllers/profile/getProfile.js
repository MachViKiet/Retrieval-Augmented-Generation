const { isIDGood, handleError } = require('~/middlewares/utils')
const { getProfileFromDB } = require('./helpers')

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProfile = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const user_info = await getProfileFromDB(id)
    res.status(200).json(user_info)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getProfile }
