import { DataTypes, Model, Sequelize } from "sequelize";

interface ClinicAttributes {
  id: string;
  name: string;
}

export class Clinic extends Model<ClinicAttributes> implements ClinicAttributes {
  public id!: string;
  public name!: string;
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
    },
    {
      sequelize,
      modelName: "Clinic",
      tableName: "clinics",
      timestamps: false, 
    }
  );

  return Clinic;
};
