"use strict";

import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  name: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public name!: string;
  public email!: string;
  public password!: string;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
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
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};



