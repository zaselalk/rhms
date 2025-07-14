import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "."; // Make sure this points to your Sequelize instance

// Define attributes for the Disease model
interface DiseaseAttributes {
  diseaseId: number;
  diseaseName: string;
  deletedAt?: Date | null; // soft delete
  
}

// Make diseaseId optional for creation (since it's auto-incremented)
interface DiseaseCreationAttributes extends Optional<DiseaseAttributes, "diseaseId"> {}

// Extend the model
class Disease extends Model<DiseaseAttributes, DiseaseCreationAttributes>
  implements DiseaseAttributes {
  public diseaseId!: number;
  public diseaseName!: string;
  public deletedAt?: Date | null; // soft delete

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Disease.init(
  {
    diseaseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Disease",
    tableName: "diseases",
    timestamps: true,
    paranoid: true, // Enable soft delete
  }
);

export default Disease;
