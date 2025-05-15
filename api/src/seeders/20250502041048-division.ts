import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert("divisions", [
      { divisionName: "Katugahahena" },
      { divisionName: "Pahalawila" },
      { divisionName: "Diagala" },
      { divisionName: "Kotagedara" },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("divisions", {
      divisionName: ["katugahahena", "Pahalawila", "Diagala", "Kotagedra"],
    });
  },
};
