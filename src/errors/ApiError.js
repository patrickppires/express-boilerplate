class ApiError extends Error {
    constructor(message, isOperational = true, stack = "") {
        super(message)
        this.statusCode = 500
        this.isOperational = isOperational
        this.errorCode = 500
        this.name = "ApiError"
        Error.captureStackTrace(this, ApiError)
    }
}

module.exports = ApiError
