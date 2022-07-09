import express from "express"
import { addItem, removeItem } from "../controllers"

const router = express.Router()

router.post(`/add`, addItem)
router.post(`/remove`, removeItem)

export default router
