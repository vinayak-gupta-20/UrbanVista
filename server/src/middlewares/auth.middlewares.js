import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";

export const requireSignIn = async(req,res,next) => {
    console.log(req.headers);
    try {
        if(!req.headers.authorization){
            return res.status(401).send("Access denied");
        }
        const decode = jwt.verify(req.headers.authorization,process.env.ACCESS_TOKEN_SECRET);
        req.user=decode
        next();
    } catch (error) {
        console.log(error);
    }
}

export const isAdmin = async(req,res,next) => {
    try {
        const user = await User.findById(req.user._id);

        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Access, not admin"
            })
        }
        next();
    } catch (error) {
        console.log(error);
    }
}