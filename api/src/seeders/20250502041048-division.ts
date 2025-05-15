import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkInsert("divisions", [
        { divisionName: "Katugahahena" },
        { divisionName: "Pahalawila" },
        { divisionName: "Diagala" },
        { divisionName: "Kotagedara" },
      ]);
    } catch (error) {
      console.log("Error seeding divisions:", error);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkDelete("divisions", {
        divisionName: ["katugahahena", "Pahalawila", "Diagala", "Kotagedara"],
      });
    } catch (error) {
      console.error("Error deleting divisions:", error);
    }
  },
};
