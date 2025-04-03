
import { Model, DataTypes } from "sequelize";
import sequelize from ".";


interface HouseholdAttributes {
  houseid:number;
  password: string;
  houseowner: string;
  grama_division: string;
  income_range: number;
  location: string;
  familyMember: number;

}

export class Household
  extends Model<HouseholdAttributes>
  implements HouseholdAttributes
{
  public houseid!: number;
  public password!: string;
  public houseowner!: string;
  public grama_division!: string;
  public income_range!: number;
  public location!: string;
  public familyMember!: number;
 
}


  Household.init(
    {
      houseid: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "House Id cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      houseowner: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
      familyMember:{
        type: DataTypes.INTEGER,
      },
      grama_division: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Grama Division cannot be empty",
          },
        },
      },
      income_range: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Income Range cannot be empty",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Location cannot be empty",
          },
        },
      },
      
    },
    {
      sequelize,
      modelName: "household",
      tableName: "household",
      timestamps: true,
    }
  );

  export default Household;

