const notFoundError = require("../errors/NotFound")

const errorHandler = (errorFormatter) => (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    errorFormatter(req, res, err)
}

const getMessage = (error) => {
    try {
        return JSON.parse(error.message)
    } catch (e) {
        return error.message
    }
}

const formatError = (req, res, error) => {
    return res.status(error.statusCode).json({
        error: error.name,
        message: getMessage(error),
        timestamp: new Date(),
    })
}

const notFoundErrorHandler = (req, res, next) =>
    next(new notFoundError("Resource not found"))

const errorGlobalHandler = (app, customErrorHandler) => {
    app.get("*", notFoundErrorHandler)
    app.head("*", notFoundErrorHandler)
    app.post("*", notFoundErrorHandler)
    app.put("*", notFoundErrorHandler)
    app.options("*", notFoundErrorHandler)
    app.delete("*", notFoundErrorHandler)
    app.patch("*", notFoundErrorHandler)

    app.use(errorHandler(customErrorHandler || formatError))
}

module.exports = errorGlobalHandler
