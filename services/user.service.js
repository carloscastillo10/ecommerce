const boom = require('@hapi/boom');
const { use } = require('../routes/users.router');
const { models } = require('./../libs/sequelize');

class UserService {
    constructor() {}

    async create(data) {
        const newUsuer = await models.User.create(data);
        return newUsuer;
    }

    async find() {
        const response = await models.User.findAll();
        return response;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found');
        }
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const response = await user.update(changes);
        return response;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UserService;
