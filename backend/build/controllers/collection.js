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
exports.confirmCollection = exports.getCollectionHandler = void 0;
const Collection_1 = require("./../db/entity/Collection");
const db_1 = require("../db");
const Collection_2 = require("../db/entity/Collection");
const getCollectionHandler = (telegramId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.collectionRepository)()
        .createQueryBuilder("collection")
        .innerJoin("collection.user", "user")
        .leftJoinAndSelect("collection.collectionItems", "collectionItems")
        .leftJoinAndSelect("collectionItems.item", "item")
        .where("user.telegramId = :telegramId", { telegramId: telegramId })
        .andWhere("collection.status = :status", {
        status: Collection_2.CollectionStatus.PENDING,
    })
        .orderBy("collection.updatedDate", "DESC")
        .getOne();
    // Returning everything for simplicity
});
exports.getCollectionHandler = getCollectionHandler;
const confirmCollection = (collectionId, date) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.collectionRepository)()
        .createQueryBuilder("collection")
        .update(Collection_1.Collection)
        .set({
        collectionDate: date,
        status: Collection_2.CollectionStatus.SCHEDULED
    })
        .where("id = :collectionId", { collectionId }).execute();
});
exports.confirmCollection = confirmCollection;
//# sourceMappingURL=collection.js.map