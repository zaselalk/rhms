import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("households", [
      // New entries based on the given division list
      {
        house_no: "12A",
        grama_division: "Kotagedara",
        longitude: 80.2,
        latitude: 6.0,
        owner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "14B",
        grama_division: "Navuththuduwa",
        longitude: 92.2,
        latitude: 61.0,
        owner_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "21A",
        grama_division: "Bopitiya",
        longitude: 60.2,
        latitude: 16.0,
        owner_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "22A",
        grama_division: "Maddegedara",
        longitude: 81.5,
        latitude: 7.3,
        owner_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "24B",
        grama_division: "Pahalawela",
        longitude: 83.1,
        latitude: 7.5,
        owner_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "25C",
        grama_division: "Kolahekada",
        longitude: 84.0,
        latitude: 8.2,
        owner_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "27A",
        grama_division: "Narawila",
        longitude: 85.3,
        latitude: 8.5,
        owner_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "28B",
        grama_division: "Yatadola",
        longitude: 86.4,
        latitude: 9.1,
        owner_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "30C",
        grama_division: "Henpita",
        longitude: 87.5,
        latitude: 9.3,
        owner_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "32A",
        grama_division: "Pallegoda",
        longitude: 88.2,
        latitude: 10.0,
        owner_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("households", {
      house_no: [
        "12A",
        "14B",
        "21A",
        "22A",
        "24B",
        "25C",
        "27A",
        "28B",
        "30C",
        "32A",
      ],
    });
  },
};
