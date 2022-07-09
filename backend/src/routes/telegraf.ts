import express from "express"
import { telegraf } from "../controllers"

const router = express.Router()

router.post(`/telegraf/${process.env.URL_SECRET!}`, telegraf)

export default router
