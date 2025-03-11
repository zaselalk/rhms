import { Sequelize } from "sequelize-typescript";
import config from "../config/config";
import { Dialect } from "sequelize";
import { User } from "./user"; // Ensure this imports the model correctly
import PermissionRole from "./permission-role";
import Permission from "./permission";
import UserRoles from "./user-roles";

// Determine environment configuration
const env: string = process.env.NODE_ENV || "development";

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

// Load DB config
const dbConfig: DBConfig = config[env] as DBConfig;

// Initialize Sequelize
const sequelize = new Sequelize({
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

// Add models to Sequelize

// Sync models with the database
async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // Safe in development, removes need for migrations
    console.log("Database connected and models synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

// Run the sync function
syncDatabase();

export default sequelize;
