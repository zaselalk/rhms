import { DataTypes, Model, Sequelize } from "sequelize";
import { AllowNull } from "sequelize-typescript";
import sequelize from ".";

interface ClinicAttributes {
  id?: number;
  name: string;
}

export class Clinic
  extends Model<ClinicAttributes>
  implements ClinicAttributes
{
  public id!: number;
  public name!: string;
}

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
    sequelize: sequelize, // Pass the `sequelize` instance to the model
    modelName: "Clinic",
    tableName: "clinics",
    timestamps: false,
  },
);

export default Clinic;
