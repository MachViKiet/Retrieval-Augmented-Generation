const {
  validateTokenAndUpdate
} = require('~/controllers/auth/helpers')

const { handleError } = require('~/middlewares/utils')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const validateEmail = async (req, res) => {
  try {
    const id = req.query?._id
    if ( id ) {
      return res.status(200).json( await validateTokenAndUpdate(id))
    }
    return res.status(200).json({
      message: 'ID Không tồn tại'
    })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { validateEmail }
