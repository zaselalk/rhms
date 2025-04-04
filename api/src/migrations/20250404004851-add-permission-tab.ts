"use strict";

import { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // create column permission
    await queryInterface.addColumn("roles", "permission", {
      type: DataType.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface: QueryInterface) {
    // remove column permission
    await queryInterface.removeColumn("roles", "permission");
  },
};
