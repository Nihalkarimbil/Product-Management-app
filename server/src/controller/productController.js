import Product from "../model/product.js";
import CustomError from "../utils/customError.js"

export const addProduct = async (req, res, next) => {
    const { name, description, subCategory, userId } = req.body;
    const variants = JSON.parse(req.body.variants);

    const images = req.files?.map((file) => file.path) || [];

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
        message: "Product Added",
        data: product,
        error: false
    });
}

export const getProduct = async (req, res, next) => {
    const products = await Product.find().populate('subCategory');

    res.json({
        data: products,
        message: "all products",
        error: false
    });

}

export const getProductbyId = async (req, res, next) => {

    const product = await Product.find({ _id: req.params.id }).populate('subCategory');

    res.json({
        data: product,
        message: "product by Id",
        error: false
    });

}
export const getProductbysubCategory = async (req, res, next) => {
    const { subId } = req.params
    const products = await Product.find({ subCategory: subId }).populate('subCategory');

    res.json({
        data: products,
        message: "products by subcategory",
        error: false
    });

}

export const editProduct = async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return next(new CustomError("id is requrid", 400))
    }
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
        data: updated,
        message: "product edited",
        error: false
    });
}