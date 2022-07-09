"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionItem = void 0;
const typeorm_1 = require("typeorm");
const Collection_1 = require("./Collection");
const Item_1 = require("./Item");
let CollectionItem = class CollectionItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CollectionItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], CollectionItem.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Collection_1.Collection, (collection) => collection.collectionItems, { nullable: false }),
    __metadata("design:type", Collection_1.Collection)
], CollectionItem.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Item_1.Item, (item) => item.collectionItems, { nullable: false }),
    __metadata("design:type", Item_1.Item)
], CollectionItem.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CollectionItem.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CollectionItem.prototype, "updatedDate", void 0);
CollectionItem = __decorate([
    (0, typeorm_1.Entity)()
], CollectionItem);
exports.CollectionItem = CollectionItem;
//# sourceMappingURL=CollectionItem.js.map