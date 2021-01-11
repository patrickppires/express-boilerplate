const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    })

    User.beforeCreate((user) => {
        return bcrypt
            .hash(user.password, 10)
            .then((hash) => (user.password = hash))
    })

    return User
}
