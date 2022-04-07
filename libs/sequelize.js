const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setUpModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser); // Proteger la informacion
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    loggin: true, // Mostrar el resultado en comando directo en sql
});

setUpModels(sequelize); // Enviarle la conexión

sequelize.sync() // Crear la estructura en la base de datos

module.exports = sequelize;
