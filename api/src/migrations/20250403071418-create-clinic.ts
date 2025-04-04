import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
  // Create the 'clinics' table
  try {
    await queryInterface.createTable("clinics", {
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
  } catch (error) {
    console.log(error);
  }
};

export const down = async (queryInterface: QueryInterface) => {
  // Drop the 'clinics' table
  try {
    await queryInterface.dropTable("clinics");
  } catch (error) {
    console.log(error);
  }
};
