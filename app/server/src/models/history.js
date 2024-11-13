const mongoose = require('mongoose')
// const validator = require('validator')

// {
//   "id": Math.floor(10000 + Math.random() * 900000),
//   "role": "bot",
//   "message": GetURLFromMarkdown(finalResponse),
//   "information" : {
//     "context" : context,
//     "filter_expressions" : filter_expressions,
//     "chosen_collections" : chosen_collections,
//     "timestamp" : (new Date()).getTime(),
//     "duration": endTime - startTime
//   }

const HistorySchema = new mongoose.Schema(
  {
    owner : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    role : {
      type: String,
      enum: ['bot', 'user'],
      default : 'bot'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('History', HistorySchema)