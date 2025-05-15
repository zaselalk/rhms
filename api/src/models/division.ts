import { DataTypes, Model } from "sequelize";
import sequelize from ".";

interface DivisionAttributes {
  divisionId?: number;
  divisionName: string;
}

export class Division extends Model<DivisionAttributes> implements DivisionAttributes {
  public divisionId!: number;
  public divisionName!: string;
}

Division.init(
  {
    divisionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    divisionName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "unique_division_name",
        msg: "Division name must be unique",
      },
      validate: {
        notEmpty: {
          msg: "Division name cannot be empty",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Division",
    tableName: "divisions",
    timestamps: false,
  }
);

export default Division;
