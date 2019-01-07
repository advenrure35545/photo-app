const express = require('express')
const router = express.Router()
const User = require('./models/User')
const Album = require('./models/Album')
const Photo = require('./models/Photo')
const jwt = require('jsonwebtoken')
const passport = require('passport')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
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

router.get('/user/:id', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({_id: id})
        if(!user){
            res.status(404)
        }else{
            const name = `${user.firstName} ${user.lastName}`
            const email = user.email
            const age = user.age
            res.json({name, email, age})
        }
    } catch (e) {
        res.status(500).send({msg: e})
    }
})

router.post('/user/:id/albums/add', passport.authenticate('jwt', {session:false}), async(req, res) => {
    const id = req.params.id
    const { title, description } = req.body

    try {
        const album = await Album.create({title, description, user: id})
        if(!album){
            res.status(404)
        }else {
            res.json(album)
        }
    } catch (e) {
        res.status(500).json({msg: e})
    }
})

router.get('/user/:id/albums', passport.authenticate('jwt', {session:false}), async(req, res) => {
    const id = req.params.id

    try {
        const albums = await Album.find({})
        if(!albums){
            res.status(404)
        }else {
            res.json(albums)
        }
    } catch (e) {
        res.status(500)
    }

})

router.get('/album/:id/', passport.authenticate('jwt', {session:false}), async (req, res) => {
    try {
        const album = await Album.findOne({_id: req.params.id})
        if(!album){
            res.status(500)
        }
        const photos = albuma.photos
        res.json(photos)
    } catch (e) {
        res.status(404)
    }
})

router.post('/photos/add', passport.authenticate('jwt', {session:false}), upload.single('avatar'), async(req, res) => {
    const { title, album } = req.body
    const img  = req.file

    try {
        const photo = await Photo.create({title: title, link: 'https://avatars.mds.yandex.net/get-pdb/25978/3d6f5902-98ba-4f0d-a2b7-d62a8acad5f2/s1200'})
        if(!photo) res.status(500)
        await Album.updateOne({_id: album}, {$push: {photos: {ref: photo._id}}})
        res.json(photo)
    } catch (e) {
        res.status(404)
    }

})

router.get('/photos/new', passport.authenticate('jwt', {session:false}), async(req, res) => {
    const limVal = req.query.limit || 30

    try {
        const photos = await Photo.find({}).limit(limVal)
        if(!photos){
            res.status(404)
        }else{
            res.json(photos)
        }
    } catch (e) {
        res.status(404)
    }
})



module.exports = router