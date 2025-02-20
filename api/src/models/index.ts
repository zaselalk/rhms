import { Dialect, Sequelize } from "sequelize";
import config from "../config/config";

const env: string = process.env.NODE_ENV || "development";

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const dbConfig: DBConfig = config[env] as DBConfig;

const sequelize: Sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

export default sequelize;
