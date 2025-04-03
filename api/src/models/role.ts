"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";
interface RoleAttributes {
  id?: number;
  role: string;
}

export class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public role!: string;
}

export default (sequelize: Sequelize) => {
  // role has many-to-many relationship with permission through permission_role

  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Role cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
    }
  );

  return Role;
};
