'use strict';
import { QueryInterface, DataTypes } from "sequelize";
  
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(QueryInterface: QueryInterface) {
    await QueryInterface.createTable('residents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
        
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      bloodGroup: {
        allowNull: false,
        type: DataTypes.STRING
      },
      sex: {
        allowNull: false,
        type: DataTypes.STRING
      },
      clinicNumber: {
        
        type: DataTypes.STRING
      },
      bloodPressure: {
        
        type: DataTypes.STRING
      },
      glucose: {
        type: DataTypes.STRING
      },
      heartRate: {
        type: DataTypes.STRING
      },
      cholesterol: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('residents');
  }
};
