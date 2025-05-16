import Category from "../model/category.js";
import CustomError from "../utils/customError.js";

export const addCategory=async(req,res,next)=>{
    const {name}=req.body
    if(!name){
        return next(new CustomError("name is required",400))
    }
    const newCategory=new Category({
        name:name
    })

    res.status(201).json({
        message:"category added",
        data:newCategory,
        error:false
    })
}

export const getcategories=async(req,res,next)=>{
    const categories=await Category.find()
    res.status(200).json({
        message:"all categories",
        data:categories,
        error:false
    })
}