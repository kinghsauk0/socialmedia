import  Router  from "express";
import { register } from "../controller/user.controllers.js";


const router = Router();
 router.route("/users/register").post(register)


export default router