const { handleError, buildErrObject } = require('~/middlewares/utils')
const { check, validationResult } = require('express-validator')
/**
 * Validates register request
 */
const validateRegister = [
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID')
    // eslint-disable-next-line no-unused-vars
    .custom((value) => {
      // if (!(value.endsWith('@clc.fitus.edu.vn') || value.endsWith('hcmus.edu.vn'))) {
      //   throw new Error('Email phải có tên miền @hcmus.edu.vn hoặc @clc.fitus.edu.vn')
      // }
      return true
    })
  ,
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
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

module.exports = { validateRegister }
