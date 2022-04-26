const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    singToken(user) {
        const payload = {
            sub: user.id,
            role: user.role,
        };
        const token = jwt.sign(payload, config.jwtAccessSecret);

        return {
            user,
            token,
        };
    }

    async sendRecoveryPassword(email) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtRecoverySecret, {
            expiresIn: '15min',
        });
        const link = `https://vaiots-service-5tpnz4rmpa-uc.a.run.app/recovery?token=${token}`;

        await service.update(user.id, { recoveryToken: token }); // Update token recovery

        const emailInformation = {
            from: config.smptEmail,
            to: `${user.email}`,
            subject: 'Email para recuperar contraseña',
            html: `<b>Hol@ ${user.customer.name}, ingresa a este link => ${link} para recuperar la contraseña</b>`,
        };

        const response = await this.sendMail(emailInformation);
        return response;
    }

    async changePassword(token, newPassword) {
        try {
            const payload = await jwt.verify(token, config.jwtRecoverySecret);
            const user = await service.findOne(payload.sub);
            if (user.recoveryToken !== token) {
                throw boom.unauthorized();
            }
            const hash = await bcrypt.hash(newPassword, 10);
            await service.update(user.id, {
                recoveryToken: null,
                password: hash,
            });
            return { message: 'password changed' };
        } catch (error) {
            throw boom.unauthorized();
        }
    }

    async sendMail(emailInformation) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: config.smptEmail,
                pass: config.smtpPassword,
            },
        });

        await transporter.sendMail(emailInformation);

        return { message: 'mail sent' };
    }
}

module.exports = AuthService;
