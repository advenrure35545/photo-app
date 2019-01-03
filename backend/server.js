const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const {port} = require('./config.js')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use(passport.initialize())
require('./secure')
app.use(require('./router'))

app.listen(port, () => {
    mongoose.connect('mongodb://localhost/photo-app', { autoIndex: false, useNewUrlParser: true  })
    console.log(`Server is running on port ${port}`)
})