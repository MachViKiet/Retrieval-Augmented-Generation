/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {
  // Prints error in console
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    // console.log(err)
  }
  console.log({
    errors: {
      msg: err.message,
      code: err.code
    }
  })
  // Sends error to user
  res.status(err.code).json({
    errors: {
      msg: err.message
    }
  })
}

module.exports = { handleError }
