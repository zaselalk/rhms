"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // add owner_id column referencing resident table
    try {
      await queryInterface.addColumn("Household", "owner_id", {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Residents",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.removeColumn("Household", "owner_id");
    } catch (error) {
      console.log(error);
    }
  },
};
