import { DataTypes, Model } from "sequelize";
import sequelize from "."; // Assuming the sequelize instance is already configured
import Clinic from "./clinic"; // Importing the Clinic model

interface SessionAttributes {
  sessionId: number;
  clinicId: number;
  name: string;
}

export class Session extends Model<SessionAttributes> implements SessionAttributes {
  public sessionId!: number;
  public clinicId!: number;
  public name!: string;
}

Session.init(
  {
    sessionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clinic, // Foreign key reference to Clinic
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Session name cannot be empty",
        },
      },
    },
  },
  {
    sequelize: sequelize, // Pass the sequelize instance
    modelName: "Session",
    tableName: "sessions",
    timestamps: false, // No timestamps by default
  }
);

// Optional: Adding association to Clinic
Session.belongsTo(Clinic, { foreignKey: "clinicId" });

export default Session;
