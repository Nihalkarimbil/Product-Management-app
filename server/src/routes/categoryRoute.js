import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addCategory, getcategories } from "../controller/categoryControll.js"

const categoryRoute=express.Router()

categoryRoute
    .post("/addcategory",tryCatch(addCategory))
    .get("/getCategory",tryCatch(getcategories))

export default categoryRoute