import { application } from "express";
import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const register = async(req,res) =>{
    const {name,email,password} = req.body;

    if(email =="" || password =="" || name == ""){
        return res.json({message: "All Fields are required"})
    }
    const userExists = await User.findOne({email})

    if(userExists){
        return res.json({message: "User Already exists", success:false})
    }

    const hashedPassword = await bcrypt.hash(password,10 )

    const user = await User.create({name,email,password: hashedPassword})

    res.json({message: 'User Created Successfully....!', success: true,user});
};
// Login api:
export const login = async(req,res) =>{
    const { email,password } = req.body;

    if(email =="" || password ==""){
        return res.json({message: "All Fields are required"})
    }

    const user = await User.findOne({email})

    if(!user){
        return res.json({message: "User not exists", success:false})
    }

    const validPass =await bcrypt.compare(password,user.password)

    if(!validPass){
        return res.json({ message: 'Invalid Password', success: false})
    }

    const token = jwt.sign({ userId : user._id},process.env.JWT,{
        expiresIn : "1d",
    })


    res.json({message : `Welcome ${user.name}`,token,success: true});
};