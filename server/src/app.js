import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import errorhandler from "./middleware/errorHandler.js"
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"

dotenv.config()
const app= express()

app.use(express.json())

app.use("/auth",authRoute)
app.use("/category",categoryRoute)

app.use(errorhandler)


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to database"))
.catch((err)=>console.log("an error on connecting the database:",err))

app.listen(5000,()=>{
    console.log("server running on port 5000")
})


