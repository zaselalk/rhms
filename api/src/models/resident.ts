'use strict';
import { DataTypes, Model, Sequelize } from "sequelize";

interface ResidentAttributes {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  birthday: Date,
  bloodGroup: string,
  sex: string,
  clinicNumber: string,
  bloodPressure: string,
  glucose: string,
  heartRate: string,
  cholesterol: string
}

export class Resident extends Model<ResidentAttributes> implements ResidentAttributes {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public birthday!: Date;
  public bloodGroup!: string;
  public sex!: string;
  public clinicNumber!: string;
  public bloodPressure!: string;
  public glucose!: string;
  public heartRate!: string;
  public cholesterol!: string;
}

export default (sequelize: Sequelize) => {
  Resident.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "First Name cannot be empty",
          },
        },

      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,

      },
      password: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATE,

      },
      bloodGroup: {
        type: DataTypes.STRING,

      },
      sex: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Sex cannot be empty",
          },
        },
      },
      clinicNumber: {
        type: DataTypes.STRING,

      },
      bloodPressure: {
        type: DataTypes.STRING,

      },
      glucose: {
        type: DataTypes.STRING,

      },
      heartRate: {
        type: DataTypes.STRING,

      },
      cholesterol: {
        type: DataTypes.STRING,

      },
    },
    {
      sequelize,
      modelName: "Resident",
      tableName: "residents",
    }
  );

  return Resident;


}