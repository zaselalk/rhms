"use strict";

import { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // add roleId to users table
    await queryInterface.addColumn("users", "roleId", {
      type: DataType.INTEGER,
      allowNull: false,
      // references: {
      //   model: "roles",
      //   key: "id",
      // },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface: QueryInterface) {
    // remove roleId from users table
    await queryInterface.removeColumn("users", "roleId");
  },
};
