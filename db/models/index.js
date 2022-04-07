// Encargado de enviar la coneccion hacia los modelos

const { User, UserSchema } = require('./user.model');

function setUpModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
}

module.exports = setUpModels;
