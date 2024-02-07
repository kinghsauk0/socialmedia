import mongoose, {Schema} from "mongoose";
import bycrypt from "bcryptjs"

// add user in mongodb

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    refreshToken : {
        type: String,
        trim: true
    }
    
})


userSchema.pre("save", async function (next) {
    // add byrypt
    const user = this
    if (!user.isModified("password")) return next()
    user.password =  await bycrypt.hash(user.password, 10)
    next()
})

userSchema.methods.isPasswordIsCorrect = async function (password){
    const user = this
    return await bycrypt.compare(password, user.password)
}
const User = mongoose.model("User", userSchema)
export default User