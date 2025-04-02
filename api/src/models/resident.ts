"use strict";
import { A } from "react-router/dist/development/route-data-H2S3hwhf";
import { DataTypes, Model, Sequelize } from "sequelize";

interface ResidentAttributes {
  firstName: string;
  lastName: string;
  nic: string;
  email: string;
  password: string;
  birthday: Date;
  bloodGroup: string;
  gender: string;
  bloodPressure: string;
  heartRate: string;
  address: string;
  contactNumber: string;
  divisionId: number;
  maritalState: string;
  educationLevel: string;
  addicted: Array<string>;
  alergies: Array<string>;
  chronicalDesease: Array<string>;
  height: string;
  weight: string;
}

export class Resident
  extends Model<ResidentAttributes>
  implements ResidentAttributes {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public birthday!: Date;
  public bloodGroup!: string;
  public gender!: string;
  public bloodPressure!: string;
  public heartRate!: string;
  public nic!: string;
  public address!: string;
  public contactNumber!: string;
  public divisionId!: number;
  public maritalState!: string;
  public educationLevel!: string;
  public addicted!: Array<string>;
  public alergies!: Array<string>;
  public chronicalDesease!: Array<string>;
  public height!: string;
  public weight!: string;
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
      gender: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Sex cannot be empty",
          },
        },
      },
      bloodPressure: {
        type: DataTypes.STRING,
      },

      heartRate: {
        type: DataTypes.STRING,
      },

      nic: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      contactNumber: {
        type: DataTypes.STRING,
      },
      divisionId: {
        type: DataTypes.INTEGER,
      },
      maritalState: {
        type: DataTypes.STRING,
      },
      educationLevel: {
        type: DataTypes.STRING,
      },
      addicted: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      alergies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      chronicalDesease: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      height: {
        type: DataTypes.STRING,
      },
      weight: {
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
};
