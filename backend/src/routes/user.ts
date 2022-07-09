import express from "express"
import { closeCollection, initWebApp } from "../controllers"

const router = express.Router()

router.post(`/user`, initWebApp)
router.post(`/schedule`, closeCollection)

export default router
