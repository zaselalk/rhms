'use strict';

import sequelize, { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface:QueryInterface) {
    // add owner_id column referencing resident table
    await queryInterface.addColumn('Household', 'owner_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Residents',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.removeColumn('Household', 'owner_id');
  }
};
