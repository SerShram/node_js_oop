const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_2024", "root", "", {
    host: "localhost",
    dialect: "mysql",
    // logging: false
});

const User = require('./User')(sequelize);
const Authkey = require('./Authkey')(sequelize);

module.exports = {
    sequelize : sequelize,
    user : User,
    authkey : Authkey
}
