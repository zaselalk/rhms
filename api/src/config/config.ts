import { SequelizeOptions } from "sequelize-typescript";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: SequelizeOptions } = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    dialect: "mysql",
  },
};

export default config;
