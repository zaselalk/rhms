import { DataTypes, Model } from "sequelize";
import sequelize from "."; // your configured sequelize instance
import Clinic from "./clinic";

interface SessionAttributes {
  sessionId: number;
  clinicId: number;
  name: string;
  sessionDate: Date;
  deletedAt?: Date | null;  // for soft delete timestamp
}

export class Session
  extends Model<SessionAttributes>
  implements SessionAttributes
{
  public sessionId!: number;
  public clinicId!: number;
  public name!: string;
  public sessionDate!: Date;
  public deletedAt?: Date | null; // optional
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
        model: Clinic,
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
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Please provide a valid date for the session",
          args: true,
        },
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "clinic_sessions",
    timestamps: true, // enable timestamps for createdAt/updatedAt
    paranoid: true,   // enables soft delete (uses deletedAt)
  }
);

Session.belongsTo(Clinic, { foreignKey: "clinicId" });

export default Session;
