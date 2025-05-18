import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addSubcategory, getSubCategory, togleSubcategory } from "../controller/subCategorycontroll.js"

const subCategoryRoute=express.Router()

subCategoryRoute

    .post("/add",tryCatch(addSubcategory))
    .get("/get",tryCatch(getSubCategory))
    .get("/togle/:id",tryCatch(togleSubcategory))

export default subCategoryRoute