"use strict";

import {
  Model,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
} from "sequelize";
import sequelize from ".";
import Permission from "./permission";
interface RoleAttributes {
  id?: number;
  role: string;
  permission: String;
}

export class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public role!: string;
  public permission!: String;

  //delcart association methods
  public addPermission!: BelongsToManyAddAssociationMixin<Permission, any>;
  public hasPermission!: BelongsToManyHasAssociationMixin<Permission, any>;

  static associate(models: any) {
    // define association here
    Role.belongsToMany(models.Permission, {
      through: "PermissionRole",
    });
  }
}

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
    permission: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Permissions cannot be empty",
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

export default Role;
