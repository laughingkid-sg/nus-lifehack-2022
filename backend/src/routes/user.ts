import express from "express"
import { initWebApp } from "../controllers"

const router = express.Router()

router.post(`/user`, initWebApp)

export default router