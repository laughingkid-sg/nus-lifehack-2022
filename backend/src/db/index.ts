import { DataSource } from "typeorm"
import { entities } from "./entity"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: entities,
    subscribers: [],
    migrations: [],
})

const DB = async () => {
    return AppDataSource.initialize()
}

export { DB }
