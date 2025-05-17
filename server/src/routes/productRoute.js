import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addProduct, editProduct, getProduct } from "../controller/productController.js"

const ProductRout=express.Router()

ProductRout

    .post("/add",tryCatch(addProduct))
    .get("/get",tryCatch(getProduct))
    .put("/edit/:id",tryCatch(editProduct))

export default ProductRout