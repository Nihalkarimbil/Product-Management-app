import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { login, register } from "../controller/authController.js"

const authRoute=express.Router()

authRoute
    .post("/register",tryCatch(register))
    .post("/login",tryCatch(login))

export default authRoute