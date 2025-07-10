import { DataTypes, Model, Optional } from "sequelize";
import sequelize from ".";

interface DivisionAttributes {
  divisionId: number;
  divisionName: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Optional attributes for creation
interface DivisionCreationAttributes extends Optional<DivisionAttributes, "divisionId" | "createdAt" | "updatedAt" | "deletedAt"> {}

export class Division extends Model<DivisionAttributes, DivisionCreationAttributes> implements DivisionAttributes {
  public divisionId!: number;
  public divisionName!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Division",
    tableName: "divisions",
    timestamps: true,
    paranoid: true, // Enables soft delete
  }
);

export default Division;
