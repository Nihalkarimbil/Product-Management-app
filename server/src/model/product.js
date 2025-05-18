import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    ram: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 }
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory', required: true },
    variants: { type: [variantSchema], required: true }, 
    images: [String],
    price:{type:Number,default:1000},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true });

const Product=mongoose.model('Product', productSchema);
export default Product