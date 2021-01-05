const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const { tokenTypes } = require("./tokens")
// const { User } = require("../models")
const { APP_SECRET } = process.env

const jwtOptions = {
    secretOrKey: `${APP_SECRET}`,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error("Invalid token type")
        }
        const user = true // fix after create models
        if (!user) {
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStrategy,
}
