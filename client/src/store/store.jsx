import { configureStore } from "@reduxjs/toolkit";
import authslice from "../store/slices/authSlice.js"

export const Store=configureStore({
    reducer:{
        auth:authslice
    }
})