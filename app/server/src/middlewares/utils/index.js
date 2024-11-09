const { buildErrObject } = require('./buildErrObject')
const { buildSuccObject } = require('./buildSuccObject')
const { itemNotFound } = require('./itemNotFound')
const { handleError } = require('./handleError')
const { getBrowserInfo } = require('./getBrowserInfo')
const { getIP } = require('./getIP')
const { isIDGood } = require('./isIDGood')

module.exports = {
  buildErrObject,
  buildSuccObject,
  itemNotFound,
  handleError,
  getBrowserInfo,
  getIP,
  isIDGood
}