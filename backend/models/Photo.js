const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    link: {
        type: String,
        required: true
    },
    comments: [{
        user: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }]
})

const photoModel = mongoose.model('photo', photoSchema)

module.exports = photoModel