'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resident extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resident.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    bloodGroup: DataTypes.STRING,
    sex: DataTypes.STRING,
    clinicNumber: DataTypes.STRING,
    bloodPressure: DataTypes.STRING,
    glucose: DataTypes.STRING,
    heartRate: DataTypes.STRING,
    cholesterol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Resident',
  });
  return Resident;
};