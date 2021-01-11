const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const config = require("../config/database.js")

const db = {}
const sequelize = new Sequelize(config)

const defaultPath = `${__dirname}/../models/`

db.sequelize = sequelize
db.Sequelize = Sequelize

fs.readdirSync(defaultPath)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== path.basename(__filename) &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        db[file.substr(0, file.lastIndexOf("."))] = require(path.join(
            defaultPath,
            file
        ))(sequelize, Sequelize)
    })

module.exports = db
