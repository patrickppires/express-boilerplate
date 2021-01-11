class NotFound extends Error {
    constructor(message, isOperational = true, stack = "") {
        super()
        this.statusCode = 404
        this.isOperational = isOperational
        this.name = "ResourceNotFound"
        this.message = message || "Not found"
        Error.captureStackTrace(this, NotFound)
    }
}

module.exports = NotFound
