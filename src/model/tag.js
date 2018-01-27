const mongoose = require('mongoose')
const TagSchema = require('../schemas/photos')

module.exports = mongoose.model('Tag', TagSchema)

