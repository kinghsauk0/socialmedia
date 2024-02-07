import express from "express"
import cros from "cors"
import bodyParser from "body-parser"


const app = express()

app.use(cros({
    origin: process.env.CROS_ORIGIN,
    credentials: true
}))

app.use(bodyParser.json({
    limit: "70kb"
}))

app.use(bodyParser.urlencoded({extended: true, limit: "70kb"}))

app.use(express.static("public"))

// routes
import router from "./routes/user.routes.js"
app.use("/Api/V1",router)

export default app
