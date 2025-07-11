'use strict';

import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('resident_clinic', [
      {
        residentId: 1,
        clinicId: 1

      },
      {
        residentId: 2,
        clinicId: 2

      },
      {
        residentId: 2,
        clinicId: 2

      },
      {
        residentId: 4,
        clinicId: 3

      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("resident_clinic", {}, {});
  }
};
