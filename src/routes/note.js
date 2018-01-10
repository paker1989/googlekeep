const express = require('express')

const router = express.Router()

const saveNote = (req, res) => {
  // const buffer = new Buffer(req.body)
  // console.log(buffer.toString('utf-8'))
  console.log(req.body)
  res.send({
    message: 'note saved'
  })
}

router.post('/saveNote', saveNote)

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
