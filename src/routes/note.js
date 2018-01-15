/* eslint no-shadow: off, no-underscore-dangle: off */
const express = require('express')
const upload = require('./multerConfig')
const Note = require('../model/note')
const url = require('url')
const _ = require('lodash')

const router = express.Router()

const saveNoteText = (req, res) => {
  const note = req.body.note
  if (note._id) {
    Note.findById({ _id: note._id }, (err, existingNote) => {
      if (err) {
        res.send({ err })
      } else {
        _.extend(existingNote, note)
        existingNote.save((err) => {
          if (err) {
            res.send({
              err: new Error('update note\'s photo reference failed')
            })
          } else {
            res.send({ note: existingNote })
          }
        })
      }
    })
  } else {
    const newNote = new Note(note)
    newNote.save((err, note) => {
      if (err) {
        res.send({
          err: new Error('update note\'s photo reference failed')
        })
      } else {
        res.send({ note })
      }
    })
  }
}

const savePhoto = (req, res) => {
  let noteId = req.body.noteId

  if (!req.file) {
    res.send({
      err: new Error('photo not saved!')
    })
    return
  }

  const filepath = url.resolve('/static/', req.file.filename)
  if (noteId) {
    Note.findById({ _id: noteId }, (err, note) => {
      if (err) {
        res.send({ err })
      } else {
        note.photos.push(filepath)
        note.save((err) => {
          if (err) {
            res.send({
              err: new Error('update note\'s photo reference failed')
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
    newNote.save((err, note) => {
      if (err) {
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
  if (userId) {
    // to do
  } else {
    Note.fetch((err, notes) => {
      if (err) {
        res.send({ err })
      } else {
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
