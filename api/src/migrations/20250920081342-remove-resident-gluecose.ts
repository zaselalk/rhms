"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.removeColumn("residents", "gluecose");
      await queryInterface.removeColumn("residents", "clinicNumber");
    } catch (error) {
      console.error("Error applying columns to residents table:", error);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.addColumn("residents", "gluecose", {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      });
      await queryInterface.addColumn("residents", "clinicNumber", {
        type: DataTypes.STRING,
        defaultValue: "",
      });
    } catch (error) {
      console.error("Error reverting changes from residents table:", error);
      throw error;
    }
  },
};
