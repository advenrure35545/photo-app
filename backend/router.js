const express = require('express')
const router = express.Router()
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const {secret} = require('./config')

router.get('/', (req, res) => {
    res.send('Hello World!')
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if(email && password) {
        try{
            const user = await User.findOne({email})
            if(user && user.comparePassword(password)){
                const id = user._id
                const token = jwt.sign({id}, secret, {expiresIn: 64000})
                res.send({user, token})
            }else{
                throw Error('invalid password')
            }

        } catch (e) {
            res.status(500).send({msg: e})
        }
    }

})

router.post('/signup', async (req, res) => {
    const { email, password } = req.body

    if(email && password){
        try{
            const user = await User.create({email, password})
            console.log(user)
        } catch (e) {
            console.log(e)
        }
    }


})

router.get('/profile', passport.authenticate('jwt', {session:false}),(req, res) => {
    res.send('HELLO USER))0())')
})

module.exports = router