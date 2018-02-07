const mongoose = require('mongoose')
const resourceIO = require('../util/resourceIO')
const Photo = require('../model/photo')


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
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', default: [] }],
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

 /**
  * @description: remove all photos before remove target note
  */
NoteSchema.pre('remove', function (next) {
  if (this.photos.length > 0) {
    Photo.find({ _id: { $in: this.photos } }).exec((err, photos) => {
      if (err) return next(new Error('failed to retrieve photos'))

      resourceIO.deletePhotos(photos).then((deleteIds) => {
        Photo.remove({ _id: { $in: deleteIds } }, (error) => {
          if (error) {
            next(new Error('delete photo from mongo failed'))
          } else {
            next()
          }
        })
      }, () => {
        next(new Error('delete photo from server failed'))
      })
    })
  } else {
    next()
  }
})

NoteSchema.statics = {
  fetch(cb) {
    return this
      .find({})
      .populate('photos')
      .populate('tags')
      .sort('meta.updateAt')
      .exec(cb)
  },
  fetchById({ noteId }, cb) {
    return this
      .findById({ _id: noteId })
      .populate('photos')
      .populate('tags')
      .exec(cb)
  }
}

module.exports = NoteSchema
