const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
  name: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
    // isArchived: {
    //   type: Boolean,
    //   default: false
    // }
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
