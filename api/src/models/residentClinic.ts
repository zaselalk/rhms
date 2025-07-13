"use strict";
import { DataTypes, Model } from "sequelize";
import sequelize from ".";

interface ResidentClinicAttributes {
  id?: number;
  residentId: number;
  clinicId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ResidentClinic
  extends Model<ResidentClinicAttributes>
  implements ResidentClinicAttributes
{
  public id?: number;
  public residentId!: number;
  public clinicId!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}

ResidentClinic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    residentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "residents",
        key: "id",
      },
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clinics",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ResidentClinic",
    tableName: "resident_clinic",
  }
);

export default ResidentClinic;
