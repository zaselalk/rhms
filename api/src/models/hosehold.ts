"use strict";
import { DataTypes, IntegerDataType, Model, Sequelize } from "sequelize";

interface HouseholdAttributes {
  houseid: string;
  password: string;
  name: string;
  familyMember: number;

}

export class Household
  extends Model<HouseholdAttributes>
  implements HouseholdAttributes
{
  public houseid!: string;
  public password!: string;
  public name!: string;
  public familyMember!: number;
 
}

export default (sequelize: Sequelize) => {
  Household.init(
    {
      houseid: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "House Id cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      familyMember:{
        type: DataTypes.INTEGER,
      }
      
    },
    {
      sequelize,
      modelName: "Household",
      tableName: "household",
    }
  );

  return Household;
};
