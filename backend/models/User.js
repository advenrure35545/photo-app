const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    }
})


userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 5)

    this.password = hash

})

userSchema.method('comparePassword', async function (payload) {
    return await bcrypt.compare(payload, this.password)
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel