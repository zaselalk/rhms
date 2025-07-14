import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "."; // Assuming the sequelize instance is already configured
import Clinic from "./clinic"; // Importing the Clinic model
import Session from "./clinicSession"; // Importing the Session model (assumed to exist)
import Resident from "./resident"; // Importing the Patient model (assumed to exist)

interface ClinicAttendanceAttributes {
  clinicId: number;
  sessionId: number;
  patientId: number;
  attendance: boolean;
}

export class ClinicAttendance
  extends Model<ClinicAttendanceAttributes>
  implements ClinicAttendanceAttributes
{
  public clinicId!: number;
  public sessionId!: number;
  public patientId!: number;
  public attendance!: boolean;
}

ClinicAttendance.init(
  {
    clinicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Clinic, // Foreign key reference to Clinic
        key: "id",
      },
    },
    sessionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Session, // Foreign key reference to Session
        key: "id",
      },
    },
    patientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Resident, // Foreign key reference to Patient
        key: "id",
      },
    },
    attendance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize, // Pass the sequelize instance
    modelName: "ClinicAttendance",
    tableName: "clinic_attendances",
    timestamps: false, // No timestamps by default
  }
);

// Optional: Adding associations for Sequelize to recognize the relations
ClinicAttendance.belongsTo(Clinic, { foreignKey: "clinicId" });
ClinicAttendance.belongsTo(Session, { foreignKey: "sessionId" });
ClinicAttendance.belongsTo(Resident, { foreignKey: "nic" });

export default ClinicAttendance;
