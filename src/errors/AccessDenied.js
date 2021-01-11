class AccessDenied extends Error {
    constructor(statusCode, message = [], isOperational = true, stack = "") {
        super()
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.errorCode = 401
        this.name = "AccessDenied"
        this.message = message
        Error.captureStackTrace(this, AccessDenied)
    }
}

module.exports = AccessDenied
