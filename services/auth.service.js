const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw (boom.unauthorized(), false);
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw (boom.unauthorized(), false);
        }
        delete user.dataValues.password;
        return user;
    }

    singToken(user) {
        const payload = {
            sub: user.id,
            role: user.role,
        };
        const token = jwt.sign(payload, config.jwtSecret);

        return {
            user,
            token,
        };
    }
}

module.exports = AuthService;
