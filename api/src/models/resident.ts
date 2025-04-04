"use strict";
import { DataTypes, Model } from "sequelize";
import sequelize from ".";
import { J } from "react-router/dist/development/route-data-H2S3hwhf";
import Household from "./hosehold";

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
  addicted: String[];
  alergies: String[];
  chronicalDesease: String[];
  height: number;
  weight: number;
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
  public addicted!: String[];
  public alergies!: String[];
  public chronicalDesease!: String[];
  public height!: number;
  public weight!: number;
}


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
      type: DataTypes.JSON,
      defaultValue: [],
    },
    alergies: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    chronicalDesease: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    height: {
      type: DataTypes.NUMBER,
    },
    weight: {
      type: DataTypes.NUMBER,
    },
  },

  {
    sequelize: sequelize,
    modelName: "Resident",
    tableName: "residents",
  }

);

  // Resident.hasMany(Household,{
  //   foreignKey: "owner_id",
  //   as: "households",
  //   onDelete: "SET NULL",
  // })



export default Resident;
