const mongoose = require('mongoose')
// const validator = require('validator')

const DocumentAccessSchema = new mongoose.Schema(
  {
    owner : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    url: {
      type: String,
      required: true
    },
    document_name: {
      type: String,
      required: true
    },
    document_description: {
      type: String,
      required: true
    },
    amount_chunking: {
      type: String,
      default: '0'
    },
    methods: {
      type: String,
      enum: ['Cơ bản'],
      default: 'Cơ bản'
    },
    isactive:  {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      enum: ['Đang Xử Lý', 'Đã Hoàn Tất', 'Không Thành Công', 'Chưa được Xử Lý'],
      default : 'Chưa được Xử Lý'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('Document', DocumentAccessSchema)