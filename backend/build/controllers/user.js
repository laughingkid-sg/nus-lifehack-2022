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
exports.closeCollection = exports.initWebApp = void 0;
const Collection_1 = require("./../db/entity/Collection");
const db_1 = require("../db");
const collection_1 = require("./collection");
const item_1 = require("./item");
const initWebApp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const telegramId = req.body['User']['telegramId'];
    const collectionList = yield (0, collection_1.getCollectionHandler)(telegramId);
    const itemsList = yield (0, item_1.getItemsHandler)();
    if (!collectionList) {
        const result = yield (0, db_1.collectionRepository)()
            .createQueryBuilder("colleciton")
            .insert()
            .into(Collection_1.Collection)
            .values({
            user: { telegramId }
        })
            .returning(["id"])
            .execute();
        const id = result.raw[0].id;
        const collectionList = {
            id,
            status: "pending",
            collectionItems: []
        };
        return res.json({ itemsList, collectionList });
    }
    return res.json({ itemsList, collectionList });
});
exports.initWebApp = initWebApp;
const closeCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionId = req.body["Collection"]["Id"];
    const date = req.body["Collection"]["Date"];
    return yield (0, collection_1.confirmCollection)(collectionId, date);
});
exports.closeCollection = closeCollection;
//# sourceMappingURL=user.js.map