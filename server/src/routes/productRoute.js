import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addProduct, editProduct, getProduct, getProductbyId, getProductbysubCategory } from "../controller/productController.js"
import upload from "../middleware/imageuploade.js"
const ProductRout=express.Router()

ProductRout

    .post("/add", upload.array("images",5),tryCatch(addProduct))
    .get("/get",tryCatch(getProduct))
    .put("/edit/:id",tryCatch(editProduct))
    .get("/getby/:subId",tryCatch(getProductbysubCategory))
    .get("/getoneBy/:id", tryCatch(getProductbyId))

export default ProductRout