const mongoose = require('mongoose')

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
  photos: [String],
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

NoteSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

NoteSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  }
}

module.exports = NoteSchema
