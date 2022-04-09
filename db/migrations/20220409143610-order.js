'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./../models/order.model');

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(ORDER_TABLE, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'created_at',
                defaultValue: Sequelize.NOW,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable(ORDER_TABLE);
    },
};
