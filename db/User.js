const Sequelize = require("sequelize");

module.exports = function(sequelize) {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(100)
        },
        password: {
            type: Sequelize.STRING(44)
        },
        created_at: {
            type: Sequelize.STRING(20)
        },
        updated_at: {
            type: Sequelize.STRING(20)
        }
    }, {
        timestamps: false,
        tableName : 'user'
    });
}