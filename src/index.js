import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"


dotenv.config({
    path: "./.env"
})


connectDB()
.then(
    () => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

        app.on("error", (err) =>{
            console.log("error : ",err)
            throw err
        })
    }
)
.catch((err) => {
     console.log("maongoDB is not connected", err)
})



