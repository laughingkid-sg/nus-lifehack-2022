"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItem = exports.addItem = void 0;
const CollectionItem_1 = require("./../db/entity/CollectionItem");
const db_1 = require("../db");
const addItemHandler = (collectionId, itemId, qty = 1, telegramId) => __awaiter(void 0, void 0, void 0, function* () {
    let itemExistInCollection = yield (0, db_1.collectionItemRepository)()
        .createQueryBuilder("collectionitem")
        .innerJoinAndSelect("collectionitem.collection", "collection")
        .where("collection.id = :collectionId", { collectionId })
        .andWhere("collectionitem.itemId = :itemId", { itemId })
        .select(["collectionitem.id", "collectionitem.qty"])
        .getOne();
    if (itemExistInCollection) {
        itemExistInCollection.qty += qty;
        yield (0, db_1.collectionItemRepository)().save(itemExistInCollection);
        return {
            id: itemExistInCollection.id,
            qty: itemExistInCollection.qty
        };
    }
    else {
        const newCartItem = yield (0, db_1.collectionItemRepository)()
            .createQueryBuilder("collectionitem")
            .insert()
            .into(CollectionItem_1.CollectionItem)
            .values({
            item: { id: itemId },
            collection: { id: collectionId },
            qty: qty,
        })
            .returning(["id", "qty", "item"])
            .execute();
        console.log(newCartItem);
        return {
            id: newCartItem.raw[0].id,
            item: newCartItem.raw[0].item,
            qty: qty
        };
    }
});
const removeItemHandler = (collectionItemId, qty = 1) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionItem = yield (0, db_1.collectionItemRepository)()
        .createQueryBuilder("collectionitem")
        .where("collectionitem.id = :collectionItemId", { collectionItemId })
        .getOne();
    if (collectionItem.qty <= qty) {
        yield db_1.AppDataSource.createQueryBuilder().delete().from(CollectionItem_1.CollectionItem).where("id = :collectionItemId", { collectionItemId }).execute();
    }
    else {
        collectionItem.qty -= qty;
    }
    yield (0, db_1.collectionItemRepository)().save(collectionItem);
    return {
        id: collectionItem === null || collectionItem === void 0 ? void 0 : collectionItem.id,
        qty: collectionItem === null || collectionItem === void 0 ? void 0 : collectionItem.qty
    };
});
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionId = req.body['Collection']['id'];
    const itemId = req.body['Item']['id'];
    const qty = req.body['qty'];
    const telegramId = req.body['User']['id'];
    return res.json(yield addItemHandler(collectionId, itemId, qty, telegramId));
});
exports.addItem = addItem;
const removeItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.body['CollectionItem']['id'];
        const qty = req.body['qty'];
        return res.json(yield removeItemHandler(collectionId, qty));
    }
    catch (err) {
        return res.status(400).send();
    }
});
exports.removeItem = removeItem;
//# sourceMappingURL=collectionitem.js.map