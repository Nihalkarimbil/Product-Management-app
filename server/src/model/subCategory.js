import mongoose from "mongoose";

const subCategorySchema=new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true }
})

const subCategory= mongoose.model("subcategory",subCategorySchema)
export default subCategory