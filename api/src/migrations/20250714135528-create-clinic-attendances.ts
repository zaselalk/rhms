'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('clinic_attendances', {
      clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'clinics',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'clinic_sessions',
          key: 'sessionId', // Correct PK column name for sessions
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'residents',
          key: 'nic',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('clinic_attendances');
  },
};
