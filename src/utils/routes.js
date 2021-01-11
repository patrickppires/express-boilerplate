const glob = require("glob")
const logger = require("../config/logger")

const findAndProcessRoutes = (routePattern) => {
    return glob.sync(`./src/api/**/*${routePattern}`, { absolute: true })
}

const discovery = (app) => {
    logger.debug("Discovering routes")
    const routes = findAndProcessRoutes("-rest.js")
    logger.debug(routes)
    routes.forEach((route) => require(route)(app))
}

module.exports = discovery
