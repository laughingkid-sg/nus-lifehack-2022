// import { Telegraf } from "telegraf"
// import { ExtraReplyMessage } from "telegraf/typings/telegram-types"
// import { getCollectionHandler } from "./controllers/collection"
// import { getItemsHandler } from "./controllers/item"
// import { AppDataSource, User, DB, userRepository } from "./db"
// import { postalUpdated, welcomeMsg } from "./templates"
// import { invalidPostal } from "./templates/errors"
// import axios from "axios"
// import { neaList } from "./data"

// let config = {
//     method: "post",
//     url: process.env.MS_COMPUTERVISION_URL!,
//     headers: {
//         "Ocp-Apim-Subscription-Key": process.env.MS_COMPUTERVISION_KEY!,
//         "Content-Type": "application/json",
//     },
//     data: {},
// }

// const createUser = async (user: User) => {
//     // UPSERT not supported in typeorm mssql

//     const exist = await userRepository()
//         .createQueryBuilder("user")
//         .where("user.telegramId = :telegramId", {
//             telegramId: user.telegramId,
//         })
//         .getOne()

//     if (!exist) {
//         AppDataSource.createQueryBuilder()
//             .insert()
//             .into(User)
//             .values(user)
//             .orIgnore()
//             .execute()
//     }
// }

// DB()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//         // const check = async () => {
//         //     const result = await getCollectionHandler(286992820)
//         // }

//         // check();
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })

// const bot = new Telegraf(process.env.BOT_TOKEN!)
// const messageSettings: ExtraReplyMessage = {
//     parse_mode: "HTML",
//     protect_content: true,
// }

// bot.telegram
//     .setMyCommands([
//         {
//             command: `postal`,
//             description: `Set your postal code (e.g. /postal 123456)`,
//         },
//         {
//             command: `help`,
//             description: `Get help for using the bot`,
//         },
//         {
//             command: `about`,
//             description: `Find about more about this bot`,
//         },
//     ])
//     .then((result) => {
//         console.log(result)
//     })

// bot.start(async (ctx) => {
//     const user: User = {
//         telegramId: ctx.from.id,
//         firstName: ctx.from.first_name,
//         lastName: ctx.from.last_name,
//         handle: ctx.from.username,
//     }

//     await createUser(user)

//     ctx.reply(welcomeMsg(user.firstName), messageSettings)
// })

// bot.command("postal", async (ctx) => {
//     const postal = ctx.message.text.replace("/postal ", "")
//     const match = postal.match(/\d{6}/g)
//     if (match) {
//         await AppDataSource.createQueryBuilder()
//             .update(User)
//             .set({ postal: postal })
//             .where("telegramId  =  :telegramId", {
//                 telegramId: ctx.message.from.id,
//             })
//             .execute()

//         ctx.reply(postalUpdated, messageSettings)
//     } else {
//         ctx.reply(invalidPostal, messageSettings)
//     }
// })

// type tags = {
//     name: string
//     confidence: number
// }

// bot.on("photo", async (ctx) => {
//     const file = ctx.message.photo[ctx.message.photo.length - 1]
//     const url = (await bot.telegram.getFileLink(file.file_id)).href
//     config.data = JSON.stringify({ url: url })
//     const respone = await axios(config)
//     const res = respone.data
//     let tags: tags[] = res["tags"]
//     console.log(tags)
//     let output = ``

//     for (let i = 0; i < tags.length; i++) {
//         const found  = neaList.find(item => item.name === tags[i].name)
//         if (found) {
//             output += `I think this is a <b>${found.name}</b>, it should be recycled as a <b>${found.type}</b>.<br>For recycling guidelines please check /guidelines`
//             break;
//         }
//     }

//     if (output === ``) {
//         output += `I can't seem to classify this item.`
//     }

//     ctx.reply(output, messageSettings)
// })
// bot.launch().then(() => {
//     console.log("Bot")
// })
