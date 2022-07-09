import { DB } from "./db"
import "reflect-metadata"
import express, { Express, Response, Request } from "express"
import routes from "./routes"
import cors from "cors"
require("dotenv").config()

DB()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const app: Express = express()
const port = process.env.PORT || 8080

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

routes.map((r) => {
    app.use("/api", r)
})

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
