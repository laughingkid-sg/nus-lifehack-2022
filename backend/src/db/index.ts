import { DataSource } from "typeorm"
import { entities } from "./entity"
require("dotenv").config()


const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DATABASE_DBHOST!,
    port: 1433,
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    synchronize: true,
    logging: true,
    entities: entities,
    subscribers: [],
    migrations: [],
})

const DB = async () => {
    return await AppDataSource.initialize()
}

export { DB }
export * from "./entity/index"