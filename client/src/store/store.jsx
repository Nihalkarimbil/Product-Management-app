import { configureStore } from "@reduxjs/toolkit";
import authslice from "../store/slices/authSlice.js"
import productSlice from "../store/slices/ProductSlice.js"
import subCategorySlice from "../store/slices/subCategoryslice.js"
import categorySlice from "../store/slices/categorySlice.js"
import wishlistSlice from "../store/slices/wishlistSlice.js"


export const Store=configureStore({
    reducer:{
        auth:authslice,
        Product:productSlice,
        subcategory:subCategorySlice,
        Category: categorySlice,
        Wishlist: wishlistSlice,
    }
})