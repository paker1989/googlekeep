const mongoose = require('mongoose')
const resourceIO = require('../util/resourceIO')

const PhotoSchema = new mongoose.Schema({
  url: String,
  naturalHeight: Number,
  naturalWidth: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  }
})

PhotoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

PhotoSchema.pre('remove', function (next) {
  console.log('photo remove')
  resourceIO.deletePhoto(this).then(() => {
    next()
  }, (err) => {
    next(err)
  })
})

// PhotoSchema.statics = {
//   fetch(cb) {
//     return this
//       .find({})
//       .sort('meta.updateAt')
//       .exec(cb)
//   }
// }

module.exports = PhotoSchema
