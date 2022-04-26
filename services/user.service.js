const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class UserService {
    constructor() {}

    async create(data) {
        const hash = await bcrypt.hash(data.password, 10);
        const newUsuer = await models.User.create({
            ...data, // Clonar el objeto
            password: hash, // Reemplazar la propiedad 'password' por el hash
        });
        delete newUsuer.dataValues.password;
        return newUsuer;
    }

    async find() {
        const response = await models.User.findAll({
            include: ['customer'],
        });
        return response;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found');
        }
        delete user.dataValues.password;
        return user;
    }

    async findByEmail(email) {
        const response = await models.User.findOne({
            where: { email },
            include: ['customer']
        });
        return response;
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
