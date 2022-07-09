import { CollectionItem } from './../db/entity/CollectionItem';

import { Request, Response } from "express"
import { collectionItemRepository, collectionRepository } from "../db"

const addItemHandler = async (collectionId: string, itemId: string, qty : number = 1, telegramId: string) => {
    let itemExistInCollection = await collectionItemRepository()
        .createQueryBuilder("collectionitem")
        // .innerJoinAndSelect("collectionitem.collectionId", "collection")
        // .where("collection.id = :collectionId", { collectionId })
        .andWhere("collectionitem.itemId = :itemId", {itemId})
        .select(["collectionitem.id", "collectionitem.qty"])
        .getOne();

    if (itemExistInCollection) {
        itemExistInCollection.qty += qty;
        console.log(itemExistInCollection.qty)
        await collectionItemRepository().save(itemExistInCollection)
        return {
            id: itemExistInCollection.id,
            item: itemExistInCollection.item.id,
            qty: itemExistInCollection.qty
        }
    }  else {
        const newCartItem = await collectionItemRepository()
            .createQueryBuilder("collectionitem")
            .insert()
            .into(CollectionItem)
            .values({
                item: { id: itemId },
                collection: {id : collectionId},
                qty: qty,
            })
            .returning(["id", "qty", "itemId"])
            .execute()
        return {
            id: newCartItem.raw[0].id,
            item: newCartItem.raw[0].item.id,
            qty: qty
        }
    }
}

const addItem = async (req: Request, res: Response) => {
    const collectionId = req.body['Collection']['id']
    const itemId = req.body['Item']['id']
    const qty = req.body['Item']
    const telegramId = req.body['User']['id']
    return addItemHandler(collectionId, itemId, qty, telegramId)
}

const removeItme = async (req: Request, res: Response) => {

}

export {
    addItem
}