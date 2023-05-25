import { DataSource } from "typeorm";
import { config } from "./ormconfig";

export const myDataSource = new DataSource(
    config
)