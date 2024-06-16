import { User } from "../models/users.models.js";
import { hashPassword, comparePassword } from "../helpers/auth.helpers.js";
import jwt from "jsonwebtoken";
import orderModel from "../models/orderModel.js"

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

export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await User.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Geting Orders",
        error,
      });
    }
  };
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting orders",
        error,
      });
    }
  };
  
  
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };