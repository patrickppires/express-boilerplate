const BASE_URL = "/api/v1/user"
const ApiError = require("../../errors/ApiError")
const db = require("../../config/sequelize")
const User = db.User

const registerNewUser = async (req, res, next) => {
    console.log(User)
    return User.create(req.body)
        .then((user) => res.status(201).json(user))
        .catch((err) => next(new ApiError(err)))
}

const getAllUsers = async (req, res, next) => {
    return User.findAll()
        .then((user) => res.status(201).json(user))
        .catch((err) => next(new ApiError(err)))
}

module.exports = (router) => {
    router.get(`${BASE_URL}`, getAllUsers)
    router.post(`${BASE_URL}`, registerNewUser)
}
