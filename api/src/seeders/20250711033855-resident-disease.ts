'use strict';

import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('resident_diseases', [
      {
        residentId: 1,
        diseaseId: 1,
      },
      {
        residentId: 1,
        diseaseId: 2,
      },
      {
        residentId: 2,
        diseaseId: 3,
      },
      {
        residentId: 3,
        diseaseId: 3,
      },
      {
        residentId: 4,
        diseaseId: 4,
      },

    ]);

  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('resident_diseases', [
      { residentId: 1, diseaseId: 1 },
      { residentId: 1, diseaseId: 2 },
      { residentId: 2, diseaseId: 3 },
      { residentId: 3, diseaseId: 3 },
      { residentId: 4, diseaseId: 4 },
    ]);
  }
};
