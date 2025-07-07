import { Model, DataTypes } from "sequelize";
import sequelize from "."; // Adjust the import path as necessary


import Resident from "./resident";
import Disease from "./disease";

interface residentDisease {
    id: number;
    residentId: number;
    diseaseId: number;
}

export class ResidentDisease extends Model<residentDisease> implements residentDisease {
    public id!: number;
    public residentId!: number;
    public diseaseId!: number;
    
    
}

ResidentDisease.init(
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
                model: 'Residents', // Name of the table
                key: 'id',
            },
        },
        diseaseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Diseases', // Name of the table
                key: 'diseaseId',
            },
        },
    },
    {
        sequelize, // passing the `sequelize` instance is required
        modelName: "ResidentDisease", // We need to choose the model name
        tableName: "resident_diseases", // Specify the table name if different
        timestamps: false, // Disable timestamps if not needed
    }
);

export default ResidentDisease;