
import { itemRepository } from "../db"

const getItemsHandler = async () => {
    return await itemRepository()
        .createQueryBuilder("items")
        .getMany()
}

export {
    getItemsHandler
}