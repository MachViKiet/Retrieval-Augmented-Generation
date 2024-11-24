const { getChunkInDocument } = require('./getChunkInDocument')
const { updateDocument } = require('./updateDocument')
const { uploadFile } = require('./uploadFile')
const { process } = require('./process')

module.exports = {
  getChunkInDocument,
  uploadFile,
  updateDocument,
  process
}