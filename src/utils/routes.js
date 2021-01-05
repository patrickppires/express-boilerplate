const glob = require("glob")
const logger = require("../config/logger")

const findAndProcessRoutes = (routePattern) => {
    return new Promise((resolve, reject) => {
        return glob(
            `./src/api/**/*${routePattern}`,
            { absolute: true },
            (err, matches) => {
                if (err) {
                    reject(err)
                }
                return resolve(matches)
            }
        )
    })
}

const discovery = (app) => {
    logger.debug("Discovering routes")
    findAndProcessRoutes("-rest.js").then((routes) => {
        logger.debug(routes)
        routes.forEach((route) => require(route)(app))
    })
}

module.exports = discovery
