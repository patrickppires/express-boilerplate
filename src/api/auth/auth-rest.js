const BASE_URL = "/api/v1/user"

const validate = require("../../middlewares/validate")

const authValidations = require("./auth-validations")

module.exports = (router) => {
    router.post(BASE_URL, validate(authValidations.login), (req, res) =>
        res.json({ msg: "test" })
    )
}
