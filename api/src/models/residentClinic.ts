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
        },
        clinicId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "resident_clinic",
    }
);

export default ResidentClinic;

