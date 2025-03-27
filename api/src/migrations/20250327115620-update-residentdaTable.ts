'use strict';

import sequelize, { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    await queryInterface.removeColumn('residents', 'glucose');
    await queryInterface.renameColumn('residents', 'sex', 'gender');
    await queryInterface.removeColumn('residents', 'clinicNumber');
    await queryInterface.renameColumn('residents', 'divtionId', 'divisionId');
    await queryInterface.renameColumn('residents', 'civilStatus', 'maritalState');
    await queryInterface.renameColumn('residents', 'education_status', 'educationLevel');
    await queryInterface.renameColumn('residents', 'addictedNotes', 'addicted');
    await queryInterface.removeColumn('residents', 'alergyNote');
    await queryInterface.addColumn('residents', 'alergies', {
      type: sequelize.ARRAY(sequelize.STRING),
      defaultValue: [],
    });

    await queryInterface.addColumn('residents', 'chronicalDesease', {
      type: sequelize.ARRAY(sequelize.STRING),
      defaultValue: [],
    });


  },

  async down(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    await queryInterface.addColumn('residents', 'glucose', {
      type: Sequelize.STRING,
    });
    await queryInterface.renameColumn('residents', 'gender', 'sex');
    await queryInterface.addColumn('residents', 'clinicNumber', {
      type: sequelize.STRING,
    });
    await queryInterface.renameColumn('residents', 'divisionId', 'divtionId');
    await queryInterface.renameColumn('residents', 'maritalState', 'civilStatus');
    await queryInterface.renameColumn('residents', 'educationLevel', 'education_status');
    await queryInterface.renameColumn('residents', 'addicted', 'addictedNotes');
    await queryInterface.addColumn('residents', 'alergyNotes', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'currentDiseases', {
      type: sequelize.STRING,
    });
  }
};
