"use strict";

import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

interface UserAttributes {
  name: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public name!: string;
  public email!: string;
  public password!: string;

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
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
      hooks: {
        beforeCreate: async (user: User) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );

  return User;
};
