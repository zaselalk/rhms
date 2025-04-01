'use strict';
import sequelize, { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
   await queryInterface.addColumn('residents', 'nic',{
      type: sequelize.STRING,
   });
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    await queryInterface.removeColumn('residents', 'nic');
    
  }
};
