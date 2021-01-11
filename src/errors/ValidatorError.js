class ValidatorError extends Error {
    constructor(
        statusCode = 422,
        message = [],
        isOperational = true,
        stack = ""
    ) {
        super()
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.errorCode = 422
        this.name = "ValidatorError"
        this.message = message
        Error.captureStackTrace(this, ValidatorError)
    }
}

module.exports = ValidatorError
