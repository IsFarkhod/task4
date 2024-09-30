const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taskDB', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;