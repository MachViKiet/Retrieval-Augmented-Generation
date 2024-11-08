const mongoose = require('mongoose')
// const validator = require('validator')

const CollectionAccessSchema = new mongoose.Schema(
  {
    collection_name: {
      type: String,
      required: true
    },
    collection_description: {
      type: String,
      default: '0'
    },
    amount_document: {
      type: String,
      default: '0'
    },
    type: {
      type: String,
      enum: ['obliged', 'option'],
      default: 'option'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('Collection', CollectionAccessSchema)