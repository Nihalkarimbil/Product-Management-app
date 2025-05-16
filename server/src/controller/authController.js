import User from "../model/user.js";
import CustomError from "../utils/customError.js";
import bcrypt from "bcrypt"


export const register=async(req,res,next)=>{
    const { username, password,email }=req.body
    if(!username||password||email){
        return next(new CustomError("all are required field",400))
    }
    const bycripted =await bcrypt.hash(password,4)

    const newUser=new User({
        username:username,
        password:bycripted,
        email:email
    })

    if(!newUser){
        return next(new CustomError("user registration faild",400))
    }

    res.status(201).json({
        message:"user Registed Succesfully",
        data:newUser,
        error:false
    })

}

export const login=async(req,res,next)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return next(new CustomError("Invalid Credentials",404))
    }
    const isValid=bcrypt.compare(password,user.password)
    if(!isValid){
        return next(new CustomError("invalid Credentials"))
    }
    res.status(200).json({
        message:`welcome back ${user.username}`,
        data:user,
        error:false
    })
}