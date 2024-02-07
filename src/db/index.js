import { DB_NAME } from "../../constant.js"; 
import mongoose from "mongoose";

const connectDB  = async () => {
    try {
        const mongodbConnentInstance =await mongoose.connect(`${process.env.MONGODN_URL}/${DB_NAME}`)
        console.log(`mongoDB connection established on ${mongodbConnentInstance.connection.host}`)
        //console.log(mongodbConnentInstance)
    } catch (error) {
        console.log("Mongo db connection error",error)
        process.exit(1)
    }
}

export default connectDB