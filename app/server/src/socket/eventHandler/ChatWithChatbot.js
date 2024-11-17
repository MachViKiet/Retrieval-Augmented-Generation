/**
 * Updated by Mach Vi Kiet's author on November 15 2024
 */

import { useKHTN_Chatbot } from '~/apis/KHTN_Chatbot'
import { getTime } from '~/utils/getTime'
const { ObjectId } = require('mongodb')

const chatbot = useKHTN_Chatbot()

export const ChatWithChatBot = (socket) => {
  socket.on('/ChatWithChatBot', async (message) => {

    const startTime = (new Date()).getTime()
    const message_id = new ObjectId()

    socket.emit('/ChatWithChatBot/userMessage', {
      '_id': message_id,
      'sender': socket.user._id,
      'question': message,
      'anwser': null,
      'state': 'in progress',
      'create_at': getTime(),
      'duration': startTime - new Date().getTime()
    })

    try {

      socket.emit('/ChatWithChatBot/isProcessing', [{
        step_name: 'chosen_collections',
        notice: 'Xác định nội dung câu hỏi',
        state: false,
        data: null,
        time: null
      }])

      const start_point_1 = (new Date()).getTime()
      const chosen_collections = await chatbot.determine_collection(message).then((res) => {
        return res.collection
      })
      const end_point_1 = (new Date()).getTime()


      socket.emit('/ChatWithChatBot/isProcessing', [{
        step_name: 'chosen_collections',
        notice: 'Xác định nội dung câu hỏi',
        state: true,
        data: chosen_collections,
        time: end_point_1 - start_point_1
      }, {
        step_name: 'filter_expressions',
        notice: 'Rút trích dữ liệu trong câu hỏi',
        state: false,
        data: null,
        time: null
      }])

      const start_point_2 = (new Date()).getTime()
      const filter_expressions = await chatbot.extract_meta(message, chosen_collections).then((res) => {
        return res
      })
      const end_point_2 = (new Date()).getTime()

      socket.emit('/ChatWithChatBot/isProcessing', [{
        step_name: 'chosen_collections',
        notice: 'Xác định nội dung câu hỏi',
        state: true,
        data: chosen_collections,
        duration: end_point_1 - start_point_1
      }, {
        step_name: 'filter_expressions',
        notice: 'Rút trích dữ liệu trong câu hỏi',
        state: true,
        data: filter_expressions,
        duration: end_point_2 - start_point_2
      }, {
        step_name: 'search',
        notice: 'Tìm kiếm tài liệu trong kho',
        state: false,
        data: null,
        time: null
      }])

      const start_point_3 = (new Date()).getTime()

      const context = await chatbot.search(message, chosen_collections, JSON.stringify(filter_expressions)).then((res) => {
        return res.context
      })
      const end_point_3 = (new Date()).getTime()


      socket.emit('/ChatWithChatBot/isProcessing', [{
        step_name: 'chosen_collections',
        notice: 'Xác định nội dung câu hỏi',
        state: true,
        data: chosen_collections,
        duration: end_point_1 - start_point_1
      }, {
        step_name: 'filter_expressions',
        notice: 'Rút trích dữ liệu trong câu hỏi',
        state: true,
        data: filter_expressions,
        duration: end_point_2 - start_point_2
      }, {
        step_name: 'search',
        notice: 'Tìm kiếm tài liệu trong kho',
        state: true,
        data: context,
        duration: end_point_3 - start_point_3
      }, {
        step_name: 'generate',
        notice: 'Tìm kiếm tài liệu trong kho',
        state: false,
        data: null,
        time: null
      }])

      const start_point_4 = (new Date()).getTime()

      const finalResponse = await chatbot.generate(message, context, true).then((res) => {
        return res // StreamObject
      })
      const end_point_4 = (new Date()).getTime()


      socket.emit('/ChatWithChatBot/isProcessing', [{
        step_name: 'chosen_collections',
        notice: 'Xác định nội dung câu hỏi',
        state: true,
        data: chosen_collections,
        duration: end_point_1 - start_point_1
      }, {
        step_name: 'filter_expressions',
        notice: 'Rút trích dữ liệu trong câu hỏi',
        state: true,
        data: filter_expressions,
        duration: end_point_2 - start_point_2
      }, {
        step_name: 'search',
        notice: 'Tìm kiếm tài liệu trong kho',
        state: true,
        data: context,
        duration: end_point_3 - start_point_3
      }, {
        step_name: 'generate',
        notice: 'Tạo văn bản',
        state: true,
        data: null,
        duration: end_point_4 - start_point_4
      }])

      socket.emit('/ChatWithChatBot/Processed', {
        chosen_collections, filter_expressions,
        context, finalResponse,
        create_at: getTime(),
        duration: startTime - new Date().getTime()
      })

      const reader = finalResponse.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false
      let result = ''

      const point_5 = (new Date()).getTime()
      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        result += decoder.decode(value, { stream: true })
        socket.emit('/ChatWithChatBot/streamMessages', {
          duration: startTime - new Date().getTime(),
          create_at: getTime(),
          messages: result
        })
      }

      socket.emit('/ChatWithChatBot/EndStream', {
        duration: startTime - new Date().getTime(),
        stream_time: (new Date().getTime()) - point_5,
        create_at: getTime(),
        stream_message: result
      })

      socket.emit('/ChatWithChatBot/EndProcess', {
        '_id': message_id,
        'sender': socket.user._id,
        'question': message,
        'anwser': result,
        'state': 'success',
        'create_at': getTime(),
        'duration': startTime - new Date().getTime()
      })

    } catch (error) {

      socket.emit('/ChatWithChatBot/EndProcess', {
        '_id': message_id,
        'sender': socket.user._id,
        'question': message,
        'anwser': 'Hệ thống Chatbot hiện không hoạt động !',
        'state': 'success',
        'create_at': getTime(),
        'duration': startTime - new Date().getTime()
      })

    }
  })


  return socket
}