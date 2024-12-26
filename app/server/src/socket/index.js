/**
 * Updated by Mach Vi Kiet's author on November 15 2024
*/

'use strict'
const { ChatWithChatBot } = require('./eventHandler/ChatWithChatbot')
const { ProcessDocument } = require('./eventHandler/ProcessDocument')
const { requireAuth } = require('./requireAuth')

const io = require('socket.io')()
io.use(requireAuth)
io.on('connection', (socket) => {
  ChatWithChatBot(socket)
  ProcessDocument(socket)
})


module.exports = io