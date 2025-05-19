import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addProduct, getProduct, getProductbyId, getProductbysubCategory, searchProduct } from "../controller/productController.js"
import upload from "../middleware/imageuploade.js"
const ProductRout=express.Router()

ProductRout

    .post("/add", upload.array("images",5),tryCatch(addProduct))
    .get("/get",tryCatch(getProduct))
    .get("/search/:name",tryCatch(searchProduct))
    .get("/getby/:subId",tryCatch(getProductbysubCategory))
    .get("/getoneBy/:id", tryCatch(getProductbyId))

export default ProductRout