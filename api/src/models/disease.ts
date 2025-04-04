import { DataTypes, Model, Sequelize } from "sequelize";

interface diseaseAttributes {
  diseaseId: number;
  diseaseName: string;
}

export class Disease
  extends Model<diseaseAttributes>
  implements diseaseAttributes
{
  public diseaseId!: number;
  public diseaseName!: string;
}

export default (sequelize: Sequelize) => {
  Disease.init(
    {
      diseaseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    }
  );

  return Disease;
};
