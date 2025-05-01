import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("households", [
      {
        house_no: "12/A",
        grama_division: "Nuvuththuduwa",
        longitude: 80.2,
        latitude: 6.0,
        owner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "14/B",
        grama_division: "Nuvuththuduwa",
        longitude: 92.2,
        latitude: 61.0,
        owner_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "21/A",
        grama_division: "Bopitiya",
        longitude: 60.2,
        latitude: 16.0,
        owner_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("households", {
      house_no: ["12/A", "14/B", "21/A"],
    });
  },
};
