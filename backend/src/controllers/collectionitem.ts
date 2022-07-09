import { DataSource } from "typeorm"
import { CollectionItem } from "./../db/entity/CollectionItem"

import { Request, Response } from "express"
import {
    AppDataSource,
    collectionItemRepository,
    collectionRepository,
} from "../db"

const addItemHandler = async (
    collectionId: string,
    itemId: string,
    qty: number = 1,
    telegramId: string,
) => {
    let itemExistInCollection = await collectionItemRepository()
        .createQueryBuilder("collectionitem")
        .innerJoinAndSelect("collectionitem.collection", "collection")
        .where("collection.id = :collectionId", { collectionId })
        .andWhere("collectionitem.itemId = :itemId", { itemId })
        .select(["collectionitem.id", "collectionitem.qty"])
        .getOne()

    if (itemExistInCollection) {
        itemExistInCollection.qty += qty
        await collectionItemRepository().save(itemExistInCollection)
        return {
            id: itemExistInCollection.id,
            qty: itemExistInCollection.qty,
        }
    } else {
        const newCartItem = await collectionItemRepository()
            .createQueryBuilder("collectionitem")
            .insert()
            .into(CollectionItem)
            .values({
                item: { id: itemId },
                collection: { id: collectionId },
                qty: qty,
            })
            .returning(["id", "qty", "item"])
            .execute()
        console.log(newCartItem)
        return {
            id: newCartItem.raw[0].id,
            item: newCartItem.raw[0].item,
            qty: qty,
        }
    }
}

const removeItemHandler = async (collectionItemId: string, qty: number = 1) => {
    const collectionItem = await collectionItemRepository()
        .createQueryBuilder("collectionitem")
        .where("collectionitem.id = :collectionItemId", { collectionItemId })
        .getOne()

    if (collectionItem!.qty <= qty) {
        await AppDataSource.createQueryBuilder()
            .delete()
            .from(CollectionItem)
            .where("id = :collectionItemId", { collectionItemId })
            .execute()
        return {
            id: collectionItemId,
            qty: 0,
        }
    } else {
        collectionItem!.qty -= qty
    }
    await collectionItemRepository().save(collectionItem!)
    return {
        id: collectionItem?.id,
        qty: collectionItem?.qty,
    }
}

const addItem = async (req: Request, res: Response) => {
    const collectionId = req.body["Collection"]["id"]
    const itemId = req.body["Item"]["id"]
    const qty = req.body["qty"]
    const telegramId = req.body["User"]["id"]
    return res.json(await addItemHandler(collectionId, itemId, qty, telegramId))
}

const removeItem = async (req: Request, res: Response) => {
    try {
        const collectionId = req.body["CollectionItem"]["id"]
        const qty = req.body["qty"]
        return res.json(await removeItemHandler(collectionId, qty))
    } catch (err) {
        return res.status(400).send()
    }
}

export { addItem, removeItem }
