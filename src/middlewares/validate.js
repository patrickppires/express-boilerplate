const Joi = require("joi")
const httpStatus = require("http-status")
const pick = require("../utils/pick")
const ValidatorError = require("../errors/ValidatorError")

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"])
    const object = pick(req, Object.keys(validSchema))
    const { error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object)

    if (error) {
        const messages = error.details.map((errorDetail) => ({
            [errorDetail.context.key]: [errorDetail.message],
        }))

        return next(
            new ValidatorError(
                httpStatus.UNPROCESSABLE_ENTITY,
                JSON.stringify(messages)
            )
        )
    }
    Object.assign(req, value)
    return next()
}

module.exports = validate
