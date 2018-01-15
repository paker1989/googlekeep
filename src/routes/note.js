const express = require('express')
const upload = require('./multerConfig')
const Note = require('../model/note')
const path = require('path')

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

const savePhoto = (req, res) => {
  console.log(req.file)
  console.log(req.body)
  let noteId = req.body.noteId
  
  if(!req.file) {
    res.send({
      err: new Error('photo not saved!')
    })
    return
  }

  const filepath = path.join('/static', req.file.filename)
  console.log('filepath')
  console.log(req.file.filename)
  console.log(filepath)
  console.log(path.join('/static', 'filename.jpg'))
  if (noteId) {
    Note.findById({ _id: noteId}, function(err, note) {
      if(err) {
        res.send({ err })
        return
      } else {
        note.photos.push(filepath)
        note.save(function(err, note) {
          if(err) {
            res.send({
              err: new Error(`update note's photo reference failed`)
            })
          } else {
            res.send({ filepath, noteId })
          }
        })
      }
    })
  } else {
    const newNote = new Note({
      photos: [filepath]
    })
    newNote.save(function(err, note) {
      if(err) {
        res.send({
          err: new Error('new note saved failed')
        }) 
      } else {
        noteId = note._id
        res.send({ filepath, noteId })
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
router.post('/savePhoto', upload.single('newPhoto'), savePhoto)

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
