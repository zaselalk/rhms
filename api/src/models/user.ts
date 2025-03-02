import { Model, DataTypes } from "sequelize";
import sequelize from ".";

/* Define the User model properties
  Extra properties like id, createdAt, and updatedAt are added by default
  Note: id not defined here, as it is added by default
*/
interface UserAttributes {
  name: string;
  email: string;
  password?: string;
}

/**
 * Define the User model
 * The model is used to interact with the users table in the database
 */
export class User extends Model<UserAttributes> implements UserAttributes {
  public name!: string;
  public email!: string;
  public password?: string;
}

/**
 * Initialize the User model, if you added extra properties to the User model,
 * make sure to create migrations to update the database schema
 */
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
