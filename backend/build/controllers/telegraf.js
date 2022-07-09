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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.telegraf = void 0;
const axios_1 = __importDefault(require("axios"));
const telegraf_1 = require("telegraf");
const data_1 = require("../data");
const db_1 = require("../db");
const templates_1 = require("../templates");
require("dotenv").config();
const messageSettings = {
    parse_mode: "HTML",
    protect_content: true,
};
let config = {
    method: "post",
    url: process.env.MS_COMPUTERVISION_URL,
    headers: {
        "Ocp-Apim-Subscription-Key": process.env.MS_COMPUTERVISION_KEY,
        "Content-Type": "application/json",
    },
    data: {},
};
// Create User
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // UPSERT not supported in typeorm mssql
    const exist = yield (0, db_1.userRepository)()
        .createQueryBuilder("user")
        .where("user.telegramId = :telegramId", {
        telegramId: user.telegramId,
    })
        .getOne();
    if (!exist) {
        db_1.AppDataSource.createQueryBuilder()
            .insert()
            .into(db_1.User)
            .values(user)
            .orIgnore()
            .execute();
    }
});
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.telegram
    .setMyCommands([
    {
        command: `postal`,
        description: `Set your postal code (e.g. /postal 123456)`,
    },
    {
        command: `help`,
        description: `Get help for using the bot`,
    },
    {
        command: `about`,
        description: `Find about more about this bot`,
    },
    {
        command: `guidelines`,
        description: `Find about more recycling guidelines`,
    },
])
    .then((result) => {
    console.log(result);
});
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        telegramId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        handle: ctx.from.username
    };
    yield createUser(user);
    ctx.reply((0, templates_1.welcomeMsg)(user.firstName), { parse_mode: "HTML", protect_content: true });
}));
bot.command("postal", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const postal = ctx.message.text.replace("/postal ", "");
    const match = postal.match(/\d{6}/g);
    if (match) {
        yield db_1.AppDataSource.createQueryBuilder()
            .update(db_1.User)
            .set({ postal: postal })
            .where("telegramId  =  :telegramId", {
            telegramId: ctx.message.from.id,
        })
            .execute();
        ctx.reply(templates_1.postalUpdated, messageSettings);
    }
    else {
        ctx.reply(templates_1.invalidPostal, messageSettings);
    }
}));
bot.on("photo", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const file = ctx.message.photo[ctx.message.photo.length - 1];
    const url = (yield bot.telegram.getFileLink(file.file_id)).href;
    config.data = JSON.stringify({ url: url });
    const respone = yield (0, axios_1.default)(config);
    const res = respone.data;
    let tags = res["tags"];
    console.log(tags);
    let output = ``;
    for (let i = 0; i < tags.length; i++) {
        const found = data_1.neaList.find(item => item.name === tags[i].name);
        if (found) {
            output += `I think this is a <b>${found.name}</b>, it should be recycled as a <b>${found.type}</b>.<br>For recycling guidelines please check /guidelines`;
            break;
        }
    }
    if (output === ``) {
        output += `I can't seem to classify this item.`;
    }
    ctx.reply(output, messageSettings);
}));
const telegraf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield bot.handleUpdate(req.body);
    return res.status(201).send();
});
exports.telegraf = telegraf;
//# sourceMappingURL=telegraf.js.map