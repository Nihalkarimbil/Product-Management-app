import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


//ADD A NEW PRODUCT
export const Addpro = createAsyncThunk(
    "/product/add",
    async (productData, thunkAPI) => {
        try {
            const resp = await axiosInstance.post("/product/add", productData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(resp.data);

            return resp.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Product add failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//FETCH PRODUCT BY SUB CATEGORY
export const ProductsBySubcategory = createAsyncThunk(
    "/product/fetch",
    async (subcatId, thunkAPI) => {
        console.log(subcatId);
        
        try {
            const resp = await axiosInstance.get(`/product/getby/${subcatId}`);
            console.log(resp.data);

            return resp.data.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Product add failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//SEARCH PRODUCTS 
export const searchProduct= createAsyncThunk(
    "/product/serch",
    async (name, thunkAPI) => {
        console.log(name);
        
        try {
            const resp = await axiosInstance.get(`/product/search/${name}`);
            console.log(resp.data);

            return resp.data.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Product add failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);




const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        error: null,
        product: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Add
            .addCase(Addpro.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
            })
            .addCase(Addpro.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(Addpro.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
                state.product = null;
            })
            //fetch By Subcategory
            .addCase(ProductsBySubcategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
            })
            .addCase(ProductsBySubcategory.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(ProductsBySubcategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
                state.product = null;
            })

            //Search
            .addCase(searchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
                state.product = null;
            })
    }
});

export default productSlice.reducer;
