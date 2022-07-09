import { Collection } from "./../db/entity/Collection"

import { Request, Response } from "express"
import { collectionRepository } from "../db"
import { confirmCollection, getCollectionHandler } from "./collection"
import { getItemsHandler } from "./item"

const initWebApp = async (req: Request, res: Response) => {
    const telegramId = req.body["User"]["telegramId"]
    const collectionList = await getCollectionHandler(telegramId)
    const itemsList = await getItemsHandler()

    if (!collectionList) {
        const result = await collectionRepository()
            .createQueryBuilder("collection")
            .insert()
            .into(Collection)
            .values({
                user: { telegramId },
            })
            .returning(["id"])
            .execute()
        const id = result.raw[0].id
        const collectionList = {
            id,
            status: "pending",
            collectionItems: [],
        }
        return res.json({ itemsList, collectionList })
    }

    return res.json({ itemsList, collectionList })
}

const closeCollection = async (req: Request, res: Response) => {
    const collectionId = req.body["Collection"]["Id"]
    const date = req.body["Collection"]["Date"]
    // return await confirmCollection(collectionId, date);
    try {
        await confirmCollection(collectionId, date)
        res.status(200).send()
    } catch (err) {
        res.status(500).send()
    }
}

export { initWebApp, closeCollection }
