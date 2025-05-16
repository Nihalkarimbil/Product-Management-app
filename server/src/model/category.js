import mongoose from "mongoose";

const categorSchema= new mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

const Category=mongoose.model("category",categorSchema)
export default Category