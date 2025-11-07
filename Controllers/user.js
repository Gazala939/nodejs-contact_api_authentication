import { application } from "express";
import { User } from "../Models/User.js";

export const register = async(req,res) =>{
    const {name,email,password} = req.body

    const user = await User.create({name,email,password})

    res.json({message: 'User Created Successfully....!', success: true,user});
};
// Login api:
export const login = async(req,res) =>{
    const { email,password } = req.body;

    const user = await User.findOne({email})

    res.json({message : `Welcome ${user.name}`,success: true});
};