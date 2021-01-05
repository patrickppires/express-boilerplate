const app = require("./app")
const logger = require("./config/logger")

const port = process.env.APP_PORT || 5000

let server = null
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//     logger.info('Connected to MongoDB');
//     server = app.listen(config.port, () => {
//         logger.info(`Listening to port ${config.port}`);
//     });
// });
try {
    server = app.listen(port, () => {
        logger.info(`Listening to port ${port}`)
    })
} catch (error) {
    console.log(error)
}

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed")
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error)
    exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

process.on("SIGTERM", () => {
    logger.info("SIGTERM received")
    if (server) {
        server.close()
    }
})
