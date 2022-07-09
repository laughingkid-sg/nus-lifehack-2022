import { collectionRepository } from "../db"
import { CollectionStatus } from "../db/entity/Collection"

const getCollectionHandler = async (telegramId: number) => {
    return collectionRepository()
        .createQueryBuilder("collection")
        .innerJoin("collection.user", "user")
        .leftJoinAndSelect("collection.collectionItems", "collectionItems")
        .leftJoinAndSelect("collectionItems.item", "item")
        .where("user.telegramId = :telegramId", {telegramId: telegramId})
        .andWhere("collection.status = :status", {
            status: CollectionStatus.PENDING,
        })
        .orderBy("collection.updatedDate", "DESC")
        .getOne()

        // Returning everything for simplicity
}

export {
    getCollectionHandler
}