const mongoose = require('mongoose')

const ChatSessionSchema = new mongoose.Schema(
  {
    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User', require : true },
    session_name : {
      type: String,
      default: 'New Chat'
    },
    session_description : {
      type: String,
      default: 'Do Something ...'
    },
    amount_question : {
      type: Number,
      require: true
    },
    in_progress : {
      type: Object
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('Chat_session', ChatSessionSchema)