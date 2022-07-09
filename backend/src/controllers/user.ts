import { Collection } from './../db/entity/Collection';

import { Request, Response } from "express"
import { collectionRepository } from "../db";
import { getCollectionHandler } from "./collection";
import { getItemsHandler } from "./item"

const initWebApp = async (req: Request, res: Response) => {
    const telegramId = req.body['User']['telegramId']
    const collectionList  = await getCollectionHandler(telegramId)
    const itemsList = await getItemsHandler();

    if (!collectionList) {
        const result = await collectionRepository()
            .createQueryBuilder("colleciton")
            .insert()
            .into(Collection)
            .values({
                user: {telegramId}
            })
            .returning(["id"])
            .execute()
        const id = result.raw[0].id
        const collectionList = {
                id,
                status: "pending",
                collectionItems: []
        }
        return res.json({ itemsList, collectionList})
    }

    return res.json({ itemsList, collectionList })
}

export {
    initWebApp
}