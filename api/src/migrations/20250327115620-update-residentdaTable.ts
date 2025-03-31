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
    await queryInterface.removeColumn('residents', 'addicted');
    await queryInterface.addColumn('residents', 'addicted', {
      type: sequelize.ARRAY(sequelize.STRING),
      defaultValue: [],
    });
    await queryInterface.removeColumn('residents', 'alergies')
    await queryInterface.addColumn('residents', 'alergies', {
      type: sequelize.ARRAY(sequelize.STRING),
      defaultValue: [],
    });
    await queryInterface.removeColumn('residents', 'chronicalDesease')
    await queryInterface.addColumn('residents', 'chronicalDesease', {
      type: sequelize.ARRAY(sequelize.STRING),
      defaultValue: [],
    });
    await queryInterface.removeColumn('residents', 'cholesterol',);
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
    await queryInterface.removeColumn('residents', 'addicted');
    await queryInterface.addColumn('residents', 'addictedNotes', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'alergyNotes', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'currentDiseases', {
      type: sequelize.STRING,
    });
    await queryInterface.addColumn('residents', 'cholesterol', {
      type: sequelize.STRING,
    });
  }
};
