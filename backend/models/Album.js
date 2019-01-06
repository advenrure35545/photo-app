const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
      type: String,
      max: 100
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    photos: [{
        ref: {
            type: mongoose.Types.ObjectId,
            ref: 'photos'
        }
    }]
})

const albumModel = mongoose.model('album', albumSchema)

module.exports = albumModel