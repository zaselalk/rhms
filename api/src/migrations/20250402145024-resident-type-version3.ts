'use strict';
import sequelize, { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    await queryInterface.removeColumn("residents", "height");

    await queryInterface.removeColumn("residents", "weight");

    await queryInterface.addColumn("residents", "height", {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
    await queryInterface.addColumn("residents", "weight", {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof sequelize) {

    await queryInterface.removeColumn("residents", "height");
    await queryInterface.removeColumn("residents", "weight");

    await queryInterface.addColumn("residents", "height", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
    await queryInterface.addColumn("residents", "weight", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
