import mongoose from 'mongoose'
import NoteSchema from '../schemas/notes'

export default mongoose.model('Note', NoteSchema)

