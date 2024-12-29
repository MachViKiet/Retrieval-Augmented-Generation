/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(err?.message)
  }

  if (err?.notice && err.notice != null) {
    // eslint-disable-next-line no-console
    console.log ('Notification Errors:', err.notice)
  }

  res.status(err?.code).json({
    errors: {
      msg: err?.message
    }
  })
}

module.exports = { handleError }
