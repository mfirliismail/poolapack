'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Athletes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            countryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Countries",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            year: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATEONLY
            },
            sportId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Sports",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            gold: {
                type: Sequelize.INTEGER
            },
            silver: {
                type: Sequelize.INTEGER
            },
            bronze: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Athletes');
    }
};