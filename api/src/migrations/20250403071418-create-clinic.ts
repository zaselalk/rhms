import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  // Create the 'clinics' table
  await queryInterface.createTable('clinics', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Automatically increment the ID
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // name column cannot be null
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  // Drop the 'clinics' table
  await queryInterface.dropTable('clinics');
};
