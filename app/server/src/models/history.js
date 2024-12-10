const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema(
  {
    sender : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    session_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Chat_session'
    },
    question : {
      type: String,
      require: true
    },
    anwser : {
      type: String,
      require: true
    },
    source: {
      type: Array,
      default: []
    },
    resource: {
      type: Object,
      default: {
        type: 'none'
      }
    },
    rating: {
      type: Number,
      default: -1
    },
    state : {
      type: String,
      require: true
    },
    duration : {
      type: String,
      require: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('History', HistorySchema)