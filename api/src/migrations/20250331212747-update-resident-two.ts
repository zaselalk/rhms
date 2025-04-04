'use strict';
import sequelize, { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    try {
      await queryInterface.addColumn('residents', 'nic', {
        type: sequelize.STRING,
      });
    } catch (e) {
      console.log(e);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    try {
      await queryInterface.removeColumn('residents', 'nic');
    } catch (e) {
      console.log(e);
    }

  }
};
