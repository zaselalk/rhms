'use strict';
import { DataTypes, Model, Sequelize } from "sequelize";

interface ResidentAttributes {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  age: string,
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
  public age!: string;
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
        validate: {
          notEmpty: {
            msg: "Last Name cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Email format is invalid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
          len: {
            args: [6, 20],
            msg: "Password must be between 6 and 20 characters",
          },
        },
      },
      age: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Age cannot be empty",
          },
        },
      },
      bloodGroup: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Blood Group cannot be empty",
          },
        },
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
        validate: {
          notEmpty: {
            msg: "Clinic Number cannot be empty",
          },
        },
      },
      bloodPressure: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Blood Pressure cannot be empty",
          },
        },
      },
      glucose: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Glucose cannot be empty",
          },
        },
      },
      heartRate: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Heart Rate cannot be empty",
          },
        },
      },
      cholesterol: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Cholesterol cannot be empty",
          },
        },
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