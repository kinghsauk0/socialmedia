import User from "../models/user.model.js";
import ApiError from "../utits/ApiError.js";
import asyncHandler from "../utits/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
    console.log(req)
    // get user details
    // console.log(req.body)
    const { userName, email, password } = req.body;
   console.log(userName, email, password)
   // check if user not given emty data
   if ([userName, email, password].some((fields) => fields === "" || fields === undefined || !fields)){
     throw new ApiError (404, "User do not provide a username or email and password")
   }

   // check if user already exist

   const existingUser = await User.findOne({
    $or : [{userName},{email}]
   })

   if(existingUser){
     throw new ApiError(409, "User already exist")
   }

 // create new user

 const createdUser = await User.create({
    userName: userName.toLowerCase(),
    email: email.toLowerCase(),
    password: password,
 })
// not sowing password to user
 const afterRemovePassword =await User.findById(createdUser._id).select("-password")
 // create new user error if user invalid

 if(!afterRemovePassword){
     throw new ApiError(500, "Internal server error")
 }
 // response 
 res.status(201).json({
    success: true,
    data:  afterRemovePassword
 })
});


export {register}