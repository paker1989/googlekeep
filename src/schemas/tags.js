const mongoose = require('mongoose')
const Note = require('../model/note')
const Schema = mongoose.Schema

const TagSchema = new mongoose.Schema({
  name: String,
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note', default: [] }],
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

// TagSchema.pre('remove', function (next) {
//   if (this.notes.length > 0) {
//     Note.find({ _id: { $in: this.notes } }).exec((err, notes) => {
//       if (err) return next(new Error('failed to retrieve photos'))
//       notes.forEach((note) => {
//         console.log(note.tags)
//         const index = note.tags.indexOf(this._id)
//         note.tags = note.tags.splice(index, 1)
//         note.save()
//       })
//     })
//   } else {
//     next()
//   }
// })

module.exports = TagSchema
