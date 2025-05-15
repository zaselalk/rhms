import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkInsert("clinics", [
        { id: 1, name: "Medical" },
        { id: 2, name: "Dental" },
        { id: 3, name: "NCD" },
        { id: 4, name: "Mental health" },
        { id: 5, name: "Anitinatal" },
        { id: 6, name: "Postranatal" },
        { id: 7, name: "Family Planning" },
        { id: 8, name: "Well Women" },
        { id: 9, name: "Mituru Piyasa" },
        { id: 10, name: "Youn Piyasa" },
        { id: 11, name: "Nutrition" },
        { id: 12, name: "Exercise Clinic" },
        { id: 13, name: "Counselling clinic" },
      ]);
    } catch (error) {
      console.error("Error seeding clinics:", error);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("clinics", {}, {});
  },
};
