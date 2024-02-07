import express from "express"
import cros from "cors"


const app = express()

app.use(cros({
    origin: process.env.CROS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "70kb",
    extended: true
}))

app.use(express.urlencoded({extended: true, limit: "70kb"}))

app.use(express.static("public"))

export default app
