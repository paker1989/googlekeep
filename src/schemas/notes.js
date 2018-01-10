import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  content: String,
  title: String,
  noteType: {
    type: String,
    enum: ['note', 'checkList'],
    default: 'note'
  },
  photos: [String],
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
    }
  }
})

export default NoteSchema
