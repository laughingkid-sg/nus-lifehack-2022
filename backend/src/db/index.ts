import { DataSource } from "typeorm"
import { Collection, entities, User, CollectionItem, Item } from "./entity"
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
    entities: [User, CollectionItem, Collection, Item],
    subscribers: [],
    migrations: [],
})

const DB = async () => {
    return await AppDataSource.initialize()
}

const userRepository = () => {
    return AppDataSource.getRepository(User)
}


const collectionRepository = () => {
    return AppDataSource.getRepository(Collection)
}


const itemRepository = () => {
    return AppDataSource.getRepository(Item)
}

const collectionItemRepository = () => {
    return AppDataSource.getRepository(CollectionItem)
}


export { DB, userRepository, collectionRepository,  itemRepository, collectionItemRepository, AppDataSource}
export * from "./entity/index"