import express from "express"
import { addItem } from "../controllers"

const router = express.Router()

router.post(`/collectionitem`, addItem)

export default router