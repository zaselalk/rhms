"use strict";

import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkInsert("resident_diseases", [
        { residentId: 1, diseaseId: 1 }, // Kasun - Diabetes
        { residentId: 2, diseaseId: 2 }, // Nimal - Hypertension
        { residentId: 3, diseaseId: 3 }, // Tharindu - Asthma
        { residentId: 4, diseaseId: 4 }, // Sajini - Cancer
        { residentId: 5, diseaseId: 2 }, // Dilan - Hypertension
        { residentId: 6, diseaseId: 1 }, // Harshini - Diabetes
        { residentId: 7, diseaseId: 1 }, // Ruwan - Diabetes
        { residentId: 8, diseaseId: 5 }, // Iresha - Tuberculosis
        { residentId: 9, diseaseId: 3 }, // Amal - Asthma
        { residentId: 10, diseaseId: 4 }, // Chamari - Cancer
     
      ]);
    } catch (error) {
      console.error("Error seeding resident_diseases:", error);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkDelete("resident_diseases", {
        residentId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });
    } catch (error) {
      console.error("Error deleting resident_diseases:", error);
    }
  },
};
