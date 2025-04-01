'use strict';

import sequelize, { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    // await queryInterface.renameColumn('residents', 'sex', 'gender');
    // await queryInterface.removeColumn('residents', 'clinicNumber');
    await queryInterface.removeColumn('residents', 'cholesterol');

    // await queryInterface.addColumn('residents', 'nic', {
    //   type: sequelize.STRING,
    // });
    await queryInterface.addColumn('residents', 'address', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'contactNumber', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'divisionId', {
      type: sequelize.INTEGER,
    });
    await queryInterface.addColumn('residents', 'maritalState', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'educationLevel', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'addicted', {
      type: sequelize.JSON,
    });
    await queryInterface.addColumn('residents', 'alergies', {
      type: sequelize.JSON,
    });
    await queryInterface.addColumn('residents', 'chronicalDesease', {
      type: sequelize.JSON,
    });
    await queryInterface.addColumn('residents', 'height', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'weight', {
      type: sequelize.STRING,
    });

  },

  async down(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    // await queryInterface.renameColumn('residents', 'gender', 'sex');
    // await queryInterface.addColumn('residents', 'clinicNumber', {
    //   type: sequelize.STRING,
    // });
    // await queryInterface.removeColumn('residents', 'cholesterol');
    // await queryInterface.removeColumn('residents', 'nic');
    await queryInterface.removeColumn('residents', 'address');
    await queryInterface.removeColumn('residents', 'contactNumber');
    await queryInterface.removeColumn('residents', 'divisionId');
    await queryInterface.removeColumn('residents', 'maritalState');
    await queryInterface.removeColumn('residents', 'educationLevel');
    await queryInterface.removeColumn('residents', 'addicted');
    await queryInterface.removeColumn('residents', 'alergies');
    await queryInterface.removeColumn('residents', 'chronicalDesease');
    await queryInterface.removeColumn('residents', 'height');
    await queryInterface.removeColumn('residents', 'weight');


  }
};
