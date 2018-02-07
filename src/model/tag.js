const mongoose = require('mongoose')
const TagSchema = require('../schemas/tags')

module.exports = mongoose.model('Tag', TagSchema)

