const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  noteType: {
    type: String,
    enum: ['note', 'checkList'],
    default: 'note'
  },
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo', default: [] }],
  colorIndex: {
    type: Number,
    default: 0
  },
  meta: {
    // Add later
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User'
    // },
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
    },
    isHighLighted: {
      type: Boolean,
      default: false
    }
  }
})

NoteSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

NoteSchema.statics = {
  fetch(cb) {
    return this
      .find({})
      .populate('photos')
      .sort('meta.updateAt')
      .exec(cb)
  },
  fetchById({ noteId }, cb) {
    return this
      .findById({ _id: noteId })
      .populate('photos')
      .exec(cb)
  }
}

module.exports = NoteSchema
