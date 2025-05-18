import subCategory from "../model/subCategory.js";
import CustomError from "../utils/customError.js"

export const addSubcategory = async (req, res, next) => {

    const { name, category } = req.body

    const newsubcategory = new subCategory({
        name: name,
        category: category
    })

    await newsubcategory.save()
    res.status(201).json({
        message: "added sub cateory",
        data: newsubcategory,
        error: false
    })
}

export const getSubCategory = async (req, res, next) => {
    const subcategory = await subCategory.find().populate("category")
    res.status(200).json({
        message: "subcategories",
        data: subcategory,
        error: false
    })
}

export const togleSubcategory = async (req, res, next) => {
    const { id } = req.params
    const sub = await subCategory.find({ category: id }).populate("category")
    res.status(200).json({
        message: "subcategories",
        data: sub,
        error: false
    })

}

