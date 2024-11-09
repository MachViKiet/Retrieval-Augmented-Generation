const mongoose = require('mongoose')

const RQuestionSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    example_answer: {
      type: String,
      default: '0'
    },
    type: {
      type: String,
      default: 'academic_affairs'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('RQuestions', RQuestionSchema)