import { DataTypes, Model } from "sequelize";
import sequelize from "."; // Assuming the sequelize instance is already configured
import Clinic from "./clinic"; // Importing the Clinic model

interface SessionAttributes {
  sessionId: number;
  clinicId: number;
  name: string;
  sessionDate: Date; // Added sessionDate attribute
}

export class Session
  extends Model<SessionAttributes>
  implements SessionAttributes
{
  public sessionId!: number;
  public clinicId!: number;
  public name!: string;
  public sessionDate!: Date; // Added sessionDate property
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
    sessionDate: {
      type: DataTypes.DATEONLY, // Stores only date (no time)
      allowNull: false,
      validate: {
        isDate: {
          msg: "Please provide a valid date for the session",
          args: true,
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "clinic_sessions",
    timestamps: false,
  },
);

// Adding association to Clinic
Session.belongsTo(Clinic, { foreignKey: "clinicId" });

export default Session;
