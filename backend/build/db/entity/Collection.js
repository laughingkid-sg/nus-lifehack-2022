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
exports.Collection = exports.CollectionStatus = void 0;
const CollectionItem_1 = require("./CollectionItem");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var CollectionStatus;
(function (CollectionStatus) {
    CollectionStatus["PENDING"] = "pending";
    CollectionStatus["CANCELLED"] = "cancelled";
    CollectionStatus["SCHEDULED"] = "scheduled";
    CollectionStatus["COLLECTED"] = "collected";
    CollectionStatus["COMPLETED"] = "completed";
})(CollectionStatus = exports.CollectionStatus || (exports.CollectionStatus = {}));
let Collection = class Collection {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Collection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "collectionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: CollectionStatus.PENDING, nullable: false }),
    __metadata("design:type", String)
], Collection.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Collection.prototype, "pointsAwarded", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Collection.prototype, "pointClaimed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => User_1.User, (user) => user.collections, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "telegramId" }),
    __metadata("design:type", User_1.User)
], Collection.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => CollectionItem_1.CollectionItem, (collectionItem) => collectionItem.collection),
    __metadata("design:type", Array)
], Collection.prototype, "collectionItems", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Collection.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Collection.prototype, "updatedDate", void 0);
Collection = __decorate([
    (0, typeorm_1.Entity)()
], Collection);
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map