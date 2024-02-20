import {validateLoginBody, validateRegisterBody} from "../utils/validation.js";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken"




export const  registerUser = async (req,res) => {
    
    const {error,value} = validateRegisterBody(req.body)
    if(error){
        const errorMessages = error.details.map((e)=>e.message)
        return res.status(409).json({data:null,errors: errorMessages})
    }

    const user = await User.findOne({email: value.email})
    if(user){
         return res.status(409).json({data:null, errors: "This email is already exists."})
    }

     try{
         const savedUser = await User.create({...value})
         if(savedUser){
             res.status(201).json({data: null, message: 'User Created Successfully'})
         }
     }catch (e) {
         return res.status(500).json({ data: null, errors: "Internal Server Error" });
     }
}




export const  loginUser = async (req,res) => {
    const {error,value} = validateLoginBody(req.body)
    if(error){
        const errorMessages = error.details.map((e)=>e.message)
        return res.status(400).json({data:null,errors: errorMessages})
    }
    const user = await User.findOne({email: value.email})
    if(!user){
        return res.status(400).json({data:null, error: "This email does not exists."})
    }

    const passwordsMatch = await user.comparePasswords(value.password,user.password)
    if(!passwordsMatch){
        return res.status(400).json({data:null, error: "Incorrect password."})
    }
    //sign the token

    const token = jwt.sign({id: user._id,email:user.email, role:user.role},process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    const {password, ...other} = user._doc
    return res.status(200).cookie("token", token ,{maxAge: 1000*60*60*24*7}).json({success: true,user: other ,token})
}