import { Request, Response } from "express"
import { Markup, Telegraf, Context as TelegramContext } from "telegraf"
import { welcomeMsg } from "../templates"

const bot = new Telegraf(process.env.BOT_TOKEN!)

const telegraf = async (req: Request, res: Response) => {
    bot.start((ctx) => ctx.reply(welcomeMsg))

    bot.command('postal', (ctx) => {

    })

    await bot.handleUpdate(req.body) 

    return res.status(201).send()
}

export {
    telegraf
}