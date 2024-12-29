/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
const buildErrObject = (code = '', message = '', notice = null) => {
  return {
    code,
    message,
    notice
  }
}

module.exports = { buildErrObject }
