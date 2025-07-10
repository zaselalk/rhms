import { DataTypes, Model, Optional } from "sequelize";
import sequelize from ".";

// Define the attributes of a Clinic
export interface ClinicAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Define creation attributes (id, timestamps optional on creation)
export interface ClinicCreationAttributes extends Optional<ClinicAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt"> {}

// Define the Clinic model class
export class Clinic extends Model<ClinicAttributes, ClinicCreationAttributes> implements ClinicAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

// Initialize the model
Clinic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Clinic name cannot be empty",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Clinic",
    tableName: "clinics",
    timestamps: true,
    paranoid: true, // Enables soft delete
  }
);

export default Clinic;
