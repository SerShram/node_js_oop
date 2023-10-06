const Sequelize = require("sequelize");

module.exports = function(sequelize) {
    return sequelize.define('Authkey', {
        authkey: {
            type: Sequelize.STRING(44),
            primaryKey: true
        },
        userid: {
            type: Sequelize.INTEGER(11),
        },
        created_at: {
            type: Sequelize.INTEGER(11),
        },
        updated_at: {
            type: Sequelize.INTEGER(11),
        }
    }, {
        timestamps: false,
        tableName : 'authkey'
    });
}