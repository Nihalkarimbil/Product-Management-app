import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addToWishlist, getWishlist, removeFromWishlist } from "../controller/wishlistControll.js"

const wishlistRoute=express.Router()

wishlistRoute
    .post("/add",tryCatch(addToWishlist))
    .get("/get/:id",tryCatch(getWishlist))
    .delete("/delete",tryCatch(removeFromWishlist))
export default wishlistRoute