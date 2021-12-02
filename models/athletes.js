'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Athletes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Athletes.belongsTo(models.Countries, { as: "countries", foreignKey: "countryId" })
            Athletes.belongsTo(models.Sports, { as: "sports", foreignKey: "sportId" })
        }
    };
    Athletes.init({
        name: DataTypes.STRING,
        countryId: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        date: DataTypes.DATEONLY,
        sportId: DataTypes.INTEGER,
        gold: DataTypes.INTEGER,
        silver: DataTypes.INTEGER,
        bronze: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Athletes',
    });
    return Athletes;
};