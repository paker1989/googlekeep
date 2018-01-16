const mongoose = require('mongoose')
const PhotoSchema = require('../schemas/photos')

module.exports = mongoose.model('Photo', PhotoSchema)

