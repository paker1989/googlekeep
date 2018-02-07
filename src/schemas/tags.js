const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new mongoose.Schema({
  name: String,
  meta: {
    // createdBy: {
    //   type: Schema.Types.ObjectId
    // },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

TagSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = TagSchema
