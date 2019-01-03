const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./models/User')
const {secret} = require('./config')

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secret


passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload)
    try {
            const user = await User.find({_id: jwt_payload.id})
        if(user) return done(null, user)
        else return done(null, false)
    } catch (e) {
        return done(err, false)
    }
}))
