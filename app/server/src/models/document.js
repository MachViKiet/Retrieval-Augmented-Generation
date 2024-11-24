const mongoose = require('mongoose')
// const validator = require('validator')

const DocumentSchema = new mongoose.Schema(
  {
    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collection_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' },
    url: {
      type: String,
      required: true
    },
    document_name: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    document_name_in_storage: {
      type: String
    },
    document_description: {
      type: String,
      default: 'Tài Liệu Trường Khoa Học Tự Nhiên'
    },
    amount_chunking: {
      type: String,
      default: '0'
    },
    chunks: {
      type: Array,
      default: []
    },
    methods: {
      type: String,
      enum: ['basic'],
      default: 'basic'
    },
    isactive:  {
      type: Boolean,
      default: false
    },
    metadata: {
      type: Object,
      default: null
    },
    state: {
      type: String,
      enum: ['processed', 'pending', 'processing', 'failed'],
      default : 'pending'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('Document', DocumentSchema)