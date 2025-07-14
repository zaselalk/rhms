"use strict";
import { DataTypes, Model } from "sequelize";
import sequelize from ".";
import Session from "./clinicSession";
import Household from "./household";


interface ResidentAttributes {
  id?: number;
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
  Birthcertificate: string;
  religion: string;
  jobdetail: string;
  gluecose: Number
  deletedAt: Date | null;
}

export class Resident
  extends Model<ResidentAttributes>
  implements ResidentAttributes {
  json(sessions: Session[]) {
    throw new Error("Method not implemented.");
  }
  status(arg0: number) {
    throw new Error("Method not implemented.");
  }
  public id?: number;
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
  public religion!: string;
  public jobdetail!: string;
  public gluecose!: number;
  public Birthcertificate!: string;
  public deletedAt!: Date | null; // soft delete

}

Resident.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
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
      unique: true,
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
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    religion: {
      type: DataTypes.STRING,
    },
    jobdetail: {
      type: DataTypes.STRING,
    },
    gluecose: {
      type: DataTypes.FLOAT,
    },
    Birthcertificate: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null, // for soft delete
    },
    
  },

  {
    sequelize: sequelize,
    modelName: "Resident",
    tableName: "residents",
    timestamps: true,
    paranoid: true, // Enable soft delete
    engine: "InnoDB",
  }

);


export default Resident;
