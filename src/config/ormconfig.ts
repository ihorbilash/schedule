import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import dotenv from 'dotenv'

dotenv.config({path:'.env'});

export const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //synchronize: true,
  //logging: true,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migration/*{.ts,.js}"]
}