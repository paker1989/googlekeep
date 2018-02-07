const express = require('express')
const router = express.Router()
const Tag = require('../model/tag')

function handleError(err, res) {
  if (err) {
    res.send({ err })
  }
}

const getTags = (req, res) => {
  const userId = req.body.userId
  // to handle userId
  Tag.find({}, (err, tags) => {
    if (err) {
        handleError(err, res)
    } else {
      res.send({ tags })
    }
  })
}

/**
 * @param {*} req 
 * @param {*} res 
 * @return { err | tag}
 */
const addTag = (req, res) => {
  const userId = req.body.userId
  const tagName = req.body.tag
  const newTag = new Tag({
    name: tagName, 
  })
  newTag.save((err, tag) => {
    if (err) {
      handleError(err, res)
    } else {
      res.send({ tag })
    }
  })
}

router.post('/getTags', getTags)
router.post('/addTag', addTag)

module.exports = router