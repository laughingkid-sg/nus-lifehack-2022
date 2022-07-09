"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = exports.CollectionItem = exports.Item = exports.User = exports.Collection = void 0;
const Collection_1 = require("./Collection");
Object.defineProperty(exports, "Collection", { enumerable: true, get: function () { return Collection_1.Collection; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Item_1 = require("./Item");
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return Item_1.Item; } });
const CollectionItem_1 = require("./CollectionItem");
Object.defineProperty(exports, "CollectionItem", { enumerable: true, get: function () { return CollectionItem_1.CollectionItem; } });
const entities = [Collection_1.Collection, User_1.User, Item_1.Item, CollectionItem_1.CollectionItem];
exports.entities = entities;
//# sourceMappingURL=index.js.map