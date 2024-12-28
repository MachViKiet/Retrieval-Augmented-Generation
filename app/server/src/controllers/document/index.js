const { getChunkInDocument } = require('./getChunkInDocument')
const { updateDocument } = require('./updateDocument')
const { uploadFile } = require('./uploadFile')
const { processDocument } = require('./process')

module.exports = {
  getChunkInDocument,
  uploadFile,
  updateDocument,
  processDocument
}