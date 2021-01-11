const express = require("express")
const helmet = require("helmet")
const xss = require("xss-clean")
const compression = require("compression")
const cors = require("cors")
const { config } = require("winston")
const passport = require("passport")
const { jwtStrategy } = require("./config/passport")
const { authLimiter } = require("./middlewares/rate-limiter")
const morgan = require("./config/morgan")
const errorGlobalHandler = require("./middlewares/error")
const db = require("./config/sequelize")

const routes = require("./utils/routes")

const app = express()

db.sequelize.sync()

if (config.env !== "test") {
    app.use(morgan.successHandler)
    app.use(morgan.errorHandler)
}

app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(xss())
app.use(compression())

app.use(cors())
app.options("*", cors())

app.use(passport.initialize())
passport.use("jwt", jwtStrategy)

routes(app)

errorGlobalHandler(app)

module.exports = app
