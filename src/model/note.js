const mongoose = require('mongoose')
const NoteSchema = require('../schemas/notes')

module.exports = mongoose.model('Note', NoteSchema)

