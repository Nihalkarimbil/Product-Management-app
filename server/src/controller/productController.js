import Product from "../model/product.js";
import CustomError from "../utils/customError.js"

export const addProduct=async(req,res,next)=>{
    const { name, description, subCategory, ram,price,quantity, images, userId } = req.body;

    const variants = [
        {
            ram,
            price,
            quantity
        }
      ];

    const product = new Product({
        name,
        description,
        subCategory,
        variants,
        images,
        createdBy: userId 
    });

    await product.save();
    res.status(201).json({
        message:"Product Added",
        data:product,
        error:false
    });
}

export const getProduct=async(req,res,next)=>{
    const products = await Product.find().populate('subCategory');

    res.json({
        data:products,
        message:"all products",
        error:false
    });

}

export const editProduct=async(req,res,next)=>{
    const{id}=req.params
    if(!id){
        return next(new CustomError("id is requrid",400))
    }
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
        data:updated,
        message:"product edited",
        error:false
    });
}