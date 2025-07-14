import { Model, DataTypes } from "sequelize";
import sequelize from "."; // Adjust the import path as necessary

import Resident from "./resident";
import Disease from "./disease";

interface residentDisease {
  residentDiseaseId: number;
  residentId: number;
  diseaseId: number;
  deletedAt?: Date | null; // Optional for soft delete
}

export class ResidentDisease
  extends Model<residentDisease>
  implements residentDisease
{
  public residentDiseaseId!: number;
  public residentId!: number;
  public diseaseId!: number;
  public deletedAt?: Date | null; // Optional for soft delete
}

ResidentDisease.init(
  {
    residentDiseaseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    residentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Resident, // Name of the table
        key: "id",
      },
    },
    diseaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Disease, // Name of the table
        key: "diseaseId",
      },
    },
  },
  {
    sequelize, // passing the `sequelize` instance is required
    modelName: "ResidentDisease", // We need to choose the model name
    tableName: "resident_diseases", // Specify the table name if different
    timestamps: true, // Disable timestamps if not needed
    paranoid: true, // Enable soft deletes
  }
);

export default ResidentDisease;
