import { DataTypes, Model, Sequelize } from "sequelize";

interface HouseholdAttributes {
  name: string;
  id :string;
  family_member:number;
 
}

export class household extends Model<HouseholdAttributes> implements HouseholdAttributes {
  
  public id!: string;
  public name!: string;
  public family_member: number = 1;
 
}

export default (sequelize: Sequelize) => {
  household.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        family_member: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
      sequelize,
      modelName: "Household",
      tableName: "households",
    }
  );

  return household;
};
