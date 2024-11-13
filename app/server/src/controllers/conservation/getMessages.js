const { matchedData } = require('express-validator')
const { handleError } = require('~/middlewares/utils')
/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getMessages = async (req, res) => {
  try {
    req = matchedData(req)
    // Get message from js
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getMessages }