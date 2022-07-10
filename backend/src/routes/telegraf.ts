import express from "express"
import { confirmationMessage, telegraf } from "../controllers"

const router = express.Router()

router.post(`/telegraf/${process.env.URL_SECRET!}`, telegraf)
router.post(`/telegraf/confirm`, confirmationMessage)

export default router
