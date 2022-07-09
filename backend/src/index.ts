import { Telegraf } from "telegraf";
import { getCollectionHandler } from "./controllers/collection";
import { getItemsHandler } from "./controllers/item";
import { AppDataSource, User, DB, userRepository} from "./db"
import { welcomeMsg } from "./templates"

const createUser = async (user : User) => {
    const exist = await userRepository().createQueryBuilder('user')
        .where("user.telegramId = :telegramId", {
            telegramId: user.telegramId,
    }).getOne()

    if (!exist) {
        AppDataSource.createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .orIgnore()
        .execute()
    }
}

DB().then(() => {
    console.log("Data Source has been initialized!")
    // const check = async () => {
    //     const result = await getCollectionHandler(286992820)
    // }
    
    // check();
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})



// const bot = new Telegraf(process.env.BOT_TOKEN!)

// bot.start(async (ctx) => {
//     const user : User = {
//         telegramId: ctx.from.id,
//         firstName: ctx.from.first_name,
//         lastName: ctx.from.last_name,
//         handle: ctx.from.username
//     }

//     await createUser(user);

//     ctx.reply(welcomeMsg(user.firstName), { parse_mode: "HTML", protect_content: true })
// })

// bot.command("item", async (ctx) => {
//     ctx.reply(JSON.stringify(await getItemsHandler()), { parse_mode: "HTML", protect_content: true })
// })

// bot.launch()