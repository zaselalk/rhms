'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Residents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      bloodGroup: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      clinicNumber: {
        type: Sequelize.STRING
      },
      bloodPressure: {
        type: Sequelize.STRING
      },
      glucose: {
        type: Sequelize.STRING
      },
      heartRate: {
        type: Sequelize.STRING
      },
      cholesterol: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Residents');
  }
};