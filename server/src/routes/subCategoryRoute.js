import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addSubcategory, getSubCategory } from "../controller/subCategorycontroll.js"

const subCategoryRoute=express.Router()

subCategoryRoute

    .post("/add",tryCatch(addSubcategory))
    .get("/get",tryCatch(getSubCategory))

export default subCategoryRoute