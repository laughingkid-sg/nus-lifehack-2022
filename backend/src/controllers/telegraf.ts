import axios from "axios"
import { Request, Response } from "express"
import { Markup, Telegraf, Context as TelegramContext } from "telegraf"
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram"
import { ExtraReplyMessage } from "telegraf/typings/telegram-types"
import { createContext } from "vm"
import { neaList } from "../data"
import {
    AppDataSource,
    collectionRepository,
    User,
    userRepository,
} from "../db"
import { CollectionStatus } from "../db/entity/Collection"
import {
    postalUpdated,
    welcomeMsg,
    invalidPostal,
    guidelienes,
    doorstepCollection,
    canRecycle,
    collection,
    about,
} from "../templates"
require("dotenv").config()

const bot = new Telegraf(process.env.BOT_TOKEN!)

bot.telegram.setWebhook(process.env.WEBHOOK_URL!)

let config = {
    method: "post",
    url: process.env.MS_COMPUTERVISION_URL!,
    headers: {
        "Ocp-Apim-Subscription-Key": process.env.MS_COMPUTERVISION_KEY!,
        "Content-Type": "application/json",
    },
    data: {},
}

type tags = {
    name: string
    confidence: number
}

const createUser = async (user: User) => {
    // UPSERT not supported in typeorm mssql

    const exist = await userRepository()
        .createQueryBuilder("user")
        .where("user.telegramId = :telegramId", {
            telegramId: user.telegramId,
        })
        .getOne()

    if (!exist) {
        AppDataSource.createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .orIgnore()
            .execute()
    }
}

const messageSettings: ExtraReplyMessage = {
    parse_mode: "HTML",
    protect_content: true,
    disable_web_page_preview: true
}

bot.telegram
    .setMyCommands([
        {
            command: `about`,
            description: `Find out more about this bot`,
        },
        
        {
            command: `collections`,
            description: `Get a list of upcoming scheduled collections`,
        },
        {
            command: `help`,
            description: `Get help for using the bot`,
        },
        {
            command: `guidelines`,
            description: `Find out about recycling guidelines`,
        },
        {
            command: `points`,
            description: `Check your points`,
        },
        {
            command: `postal`,
            description: `Set your postal code (e.g. /postal 123456)`,
        },
    ])
    .then((result) => {
        console.log(result)
    })

bot.start(async (ctx) => {
    const user: User = {
        telegramId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        handle: ctx.from.username,
    }

    let addtionalSettings: ExtraReplyMessage = JSON.parse(
        JSON.stringify(messageSettings),
    )
    let inlineKeyboardMarkupSettings: InlineKeyboardMarkup = {
        inline_keyboard: [
            [
                {
                    text: "♻️ Doorstep Collection",
                    callback_data: "QAZ",
                },
            ],
            [
                {
                    text: "♻️ Check if item recycleable",
                    callback_data: "EDC",
                },
            ],
            [
                {
                    text: "♻️ Schedule Collection",
                    callback_data: "RFV",
                },
            ],
        ],
    }

    addtionalSettings.reply_markup = inlineKeyboardMarkupSettings

    await createUser(user)

    ctx.reply(welcomeMsg(user.firstName), addtionalSettings)
})

bot.help((ctx) => {
    let addtionalSettings: ExtraReplyMessage = JSON.parse(
        JSON.stringify(messageSettings),
    )
    let inlineKeyboardMarkupSettings: InlineKeyboardMarkup = {
        inline_keyboard: [
            [
                {
                    text: "♻️ Doorstep Collection",
                    callback_data: "QAZ",
                },
            ],
            [
                {
                    text: "♻️ Check if item recycleable",
                    callback_data: "EDC",
                },
            ],
            [
                {
                    text: "♻️ Schedule Collection",
                    callback_data: "RFV",
                },
            ],
        ],
    }

    addtionalSettings.reply_markup = inlineKeyboardMarkupSettings

    ctx.reply(welcomeMsg(ctx.from.first_name), addtionalSettings)
})

bot.on("callback_query", (ctx) => {
    // Explicit usage
    const cbData = ctx.callbackQuery.data
    switch (cbData) {
        case "QAZ":
            ctx.replyWithPhoto(process.env.SAMPLE_PHOTO!, {
                caption: doorstepCollection,
                ...messageSettings,
            })
            ctx.answerCbQuery()
            break
        case "EDC":
            ctx.reply(canRecycle, messageSettings)
            ctx.answerCbQuery()
            break

        case "RFV":
            ctx.reply(collection, messageSettings)
            ctx.answerCbQuery()
            break
        default:
            ctx.answerCbQuery()
            break
    }
})

bot.command("about", async (ctx) => ctx.reply(about, messageSettings))

bot.command("guidelines", async (ctx) => {
    let addtionalSettings: ExtraReplyMessage = JSON.parse(
        JSON.stringify(messageSettings),
    )
    let inlineKeyboardMarkupSettings: InlineKeyboardMarkup = {
        inline_keyboard: [
            [
                {
                    text: "🚮 Blue Bins",
                    url: "www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/waste-minimisation-and-recycling",
                },
                {
                    text: "💻 E-waste",
                    url: "www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/e-waste-management",
                },
            ],
        ],
    }
    addtionalSettings.reply_markup = inlineKeyboardMarkupSettings
    ctx.reply(guidelienes, addtionalSettings)
})

bot.command("postal", async (ctx) => {
    const postal = ctx.message.text.replace("/postal ", "")
    const match = postal.match(/\d{6}/g)
    if (match) {
        await AppDataSource.createQueryBuilder()
            .update(User)
            .set({ postal: postal })
            .where("telegramId  =  :telegramId", {
                telegramId: ctx.message.from.id,
            })
            .execute()

        ctx.reply(postalUpdated, messageSettings)
    } else {
        ctx.reply(invalidPostal, messageSettings)
    }
})
bot.command("points", async (ctx) => {
    const collections = await collectionRepository()
        .createQueryBuilder()
        .where("userTelegramId = :telegramId", {
            telegramId: ctx.message.from.id,
        })
        .andWhere("status = :status", {status: CollectionStatus.COMPLETED})
        .getMany()

    const totalPoints = collections.reduce((total, coll) => {
        const awarded = coll.pointsAwarded ? coll.pointsAwarded : 0
        const claimed = coll.pointClaimed ? coll.pointClaimed : 0

        return total + (awarded - claimed)
    }, 0)

    const finalMessage = `You current have ${totalPoints} points!`
    ctx.reply(finalMessage)
})

bot.command("collections", async (ctx) => {
    const collections = await collectionRepository()
        .createQueryBuilder()
        .where("userTelegramId = :telegramId", {
            telegramId: ctx.message.from.id,
        })
        .andWhere("status = :status", { status: CollectionStatus.SCHEDULED })
        .getMany()

    if (collections.length === 0) {
        ctx.reply(
            "You currently don't have any collections scheduled. You can start by clicking on 'Book a Collection'!",
        )
        return
    }

    const dates = collections
        .map((coll) => "- ".concat(coll.collectionDate))
        .join("\n")
    const message =
        "Below are the timeslots that you have scheduled for collection:\n" +
        dates
    ctx.reply(message)
})

bot.on("photo", async (ctx) => {
    const file = ctx.message.photo[ctx.message.photo.length - 1]
    const url = (await bot.telegram.getFileLink(file.file_id)).href
    config.data = JSON.stringify({ url: url })
    const respone = await axios(config)
    const res = respone.data
    let tags: tags[] = res["tags"]
    console.log(tags)
    let output = ``

    for (let i = 0; i < tags.length; i++) {
        const found = neaList.find((item) => item.name === tags[i].name)
        if (found) {
            output += `I think this is a <b>${found.name}</b>, it should be recycled as <b>${found.type}</b>. \r\n\r\nFor recycling guidelines please check \r\n/guidelines.`
            break
        }
    }

    if (output === ``) {
        output += `I can't seem to classify this item.`
    }

    ctx.reply(output, messageSettings)
})

const telegraf = async (req: Request, res: Response) => {
    await bot.handleUpdate(req.body)
    return res.status(201).send()
}

const confirmationMessage = async (req: Request, res: Response) => {
    const telegramId = req.body["User"]["telegramId"]
    const date = req.body["Collection"]["collectionDate"]
    const collectionId = req.body["Collection"]["id"]
    bot.telegram.sendMessage(
        telegramId,
        `Thank you for scheduling a collection with us on ${collectionId}. Your collection id is ${date}`,
    )
    res.status(200).send()
}

export { telegraf, confirmationMessage }
