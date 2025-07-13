import { Model, DataTypes } from "sequelize";
import sequelize from "."; // Adjust the import path as necessary

import Resident from "./resident";
import Disease from "./disease";

interface residentDisease {
  residentDiseaseId: number;
  residentId: number;
  diseaseId: number;
}

export class ResidentDisease
  extends Model<residentDisease>
  implements residentDisease
{
  public residentDiseaseId!: number;
  public residentId!: number;
  public diseaseId!: number;
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
    timestamps: false, // Disable timestamps if not needed
  }
);

export default ResidentDisease;
