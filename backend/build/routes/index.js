"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = __importDefault(require("./telegraf"));
const user_1 = __importDefault(require("./user"));
const collectionItem_1 = __importDefault(require("./collectionItem"));
exports.default = [
    telegraf_1.default,
    user_1.default,
    collectionItem_1.default
];
//# sourceMappingURL=index.js.map