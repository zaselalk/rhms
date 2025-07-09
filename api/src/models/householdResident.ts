// models/householdResident.ts
import { DataTypes, Model } from "sequelize";
import sequelize from ".";
import Resident from "./resident";
import Household from "./household";

interface HouseholdResidentAttributes {
  
  residentId: number;
  householdId: number;
  relation: string;
}

class HouseholdResident
  extends Model<HouseholdResidentAttributes>
  implements HouseholdResidentAttributes
{
  public id!: number;
  public residentId!: number;
  public householdId!: number;
  public relation!: string;
}

HouseholdResident.init(
  {
    
    residentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Resident, key: "id" },
    },
    householdId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Household, key: "id" },
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "HouseholdResident",
    tableName: "household_residents",
    timestamps: false,
  }
);

export default HouseholdResident;
