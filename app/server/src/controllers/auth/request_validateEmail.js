const {
  validateTokenAndSendRequest
} = require('~/controllers/auth/helpers')

const { handleError } = require('~/middlewares/utils')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const request_validateEmail = async (req, res) => {
  try {
    const id = req.query?.email
    if ( id ) {
      return res.status(200).json( await validateTokenAndSendRequest(id))
    }
    return res.status(200).json({
      message: 'ID Không tồn tại'
    })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { request_validateEmail }
