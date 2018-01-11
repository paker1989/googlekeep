const express = require('express')
const Note = require('../model/note')
const router = express.Router()

const saveNoteText = (req, res) => {
  const note = req.body.note
  if(note._id) {
    // to do 
  }
  else {
    const newNote = new Note(note)
    newNote.save(function(err, note) {
      if(err) {
        console.log(err)
        res.send({
          message: 'err occurs'
        })
      }
      else {
        res.send({ note })
      }
    })
  }
}

const fetchNotes = (req, res) => {
  const userId = req.body.userId
  if(userId) {
    // to do
  }
  else {
    Note.fetch(function(err, notes) {
      if(err) {
        res.send({ err })
      }
      else {
        res.send({ notes })
      }
    })
  }
}

router.post('/saveNoteText', saveNoteText)
router.post('/fetchNotes', fetchNotes)

module.exports = router

// console.log(req.headers)
// const buffers = []
// req.on('data', (chunk) => {
//   buffers.push(chunk)
// })
// .on('end', () => {
//   const buffer = Buffer.concat(buffers)
//   console.log(buffer.toString('utf-8'))
// })
