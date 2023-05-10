import { DataSource } from "typeorm";
import { config } from "./dbConfig";

export const myDataSource = new DataSource(
    config
)