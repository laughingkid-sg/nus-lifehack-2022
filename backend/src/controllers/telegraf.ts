import { Request, Response } from "express"
import { Markup, Telegraf, Context as TelegramContext } from "telegraf"
import { AppDataSource, User, userRepository } from "../db"
import { welcomeMsg } from "../templates"

const bot = new Telegraf(process.env.BOT_TOKEN!)

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

bot.start(async (ctx) => {
    const user : User = {
        telegramId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        handle: ctx.from.username
    }
    await createUser(user);
    ctx.reply(welcomeMsg(user.firstName), { parse_mode: "HTML", protect_content: true })
})

bot.command("postal", (ctx) => {})


const telegraf = async (req: Request, res: Response) => {
    await bot.handleUpdate(req.body)
    return res.status(201).send()
}

export { telegraf }
