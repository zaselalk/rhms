import { DataTypes, Model, Sequelize } from "sequelize";

interface ClinicAttributes {
  id: string;
  name: string;
  category: string;
  patient_count: number;
}

export class Clinic extends Model<ClinicAttributes> implements ClinicAttributes {
  public id!: string;
  public name!: string;
  public category!: string;
  public patient_count!: number; 
}

export default (sequelize: Sequelize) => {
  Clinic.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category cannot be empty",
          },
        },
      },
      patient_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Clinic",
      tableName: "clinics",
    }
  );

  return Clinic;
};
