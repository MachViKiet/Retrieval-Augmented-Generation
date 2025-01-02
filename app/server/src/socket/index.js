/* eslint-disable no-console */
/**
 * Updated by Mach Vi Kiet's author on November 15 2024
*/

'use strict'
const { ChatWithChatBot } = require('./eventHandler/ChatWithChatbot')
const { ProcessDocument } = require('./eventHandler/ProcessDocument')
const { requireAuth } = require('./requireAuth')

const io = require('socket.io')()

// import { Server } from 'socket.io'

// // const io = new Server({
// //   path: '/socket.io'
// // })
io.use(requireAuth)
io.on('connection', (socket) => {
  ChatWithChatBot(socket)
  ProcessDocument(socket)
})

io.on('connect_error', (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message)

  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description)

  // some additional context, for example the XMLHttpRequest object
  console.log(err.context)
})


module.exports = io