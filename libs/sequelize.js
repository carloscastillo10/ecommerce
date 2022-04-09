const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setUpModels = require('./../db/models');

const options = {
    dialect: 'postgres',
    loggin: config.isProd ? false : true, // Mostrar el resultado en comando directo en sql cuando estamos en desarrollo
};

if (config.isProd) {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

const sequelize = new Sequelize(config.dbUrl, options);

setUpModels(sequelize); // Enviarle la conexión

// sequelize.sync() // Crear la estructura en la base de datos

module.exports = sequelize;
