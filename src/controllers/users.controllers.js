import { User } from "../models/users.models.js";
import { hashPassword, comparePassword } from "../helpers/auth.helpers.js";
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    try {
        const { name, email, password, phone} = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }

        const exisitingUser = await User.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new User({
            name,
            email,
            phone,
            address:"",
            password: hashedPassword,
        }).save();

        res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
        });
        
    } catch (error) {
        console.log("register controller",error);
        res.status(500).send({
            success:false,
            message:"error in registration",
            error
        })
    }
}

export const login = async(req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'All fields required'
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if(!isPasswordCorrect){
            return res.status(404).send({
                success:false,
                message:'Invalid credentials'
            }) 
        }

        const token = user.generateAccessToken();

        res.status(200).send({
            success:true,
            message:"Login successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}

export const test = (req,res) => {
    res.send({
        ok:true
    });
}


export const admintest = (req,res) => {
    res.send({
        ok:true
    });
}
