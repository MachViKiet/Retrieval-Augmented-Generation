const { handleError, buildErrObject } = require('~/middlewares/utils')
const { check, validationResult } = require('express-validator')
/**
 * Validates register request
 */
/**
 * Validates login request
 */
const validateVerifyEmail = [
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase()
      }
      return next()
    } catch (err) {
      return handleError(res, buildErrObject(422, err.array()))
    }
    // validateResult(req, res, next)
  }
]

module.exports = { validateVerifyEmail }
