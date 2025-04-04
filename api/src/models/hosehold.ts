import { Model, DataTypes } from "sequelize";
import sequelize from ".";
import Resident from "./resident";

interface HouseholdAttributes {
  id: number;
  house_no: string;
  grama_division: string;
  longitude: string;
  latitude: string;
  owner_id?: number;
}

export class Household
  extends Model<HouseholdAttributes>
  implements HouseholdAttributes
{
  public id!: number;
  public house_no!: string;
  public grama_division!: string;
  public longitude!: string;
  public latitude!: string;
  public owner_id?: number;
}

Household.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  
    house_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "House No cannot be empty",
        },
      },
    },

    grama_division: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Grama Division cannot be empty",
        },
      },
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Longitude cannot be empty",
        },
      },
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Latitude cannot be empty",
        },
      },
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: "Owner ID must be an integer",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "household",
    tableName: "households",
    timestamps: true,
  }
);

Household.belongsTo(Resident, { foreignKey: "owner_id", as: "owner" });

export default Household;
