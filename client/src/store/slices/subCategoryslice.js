import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Fetch all subcategories
export const fetchSubCategory = createAsyncThunk(
    "/getSubcategory",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/subcategory/get");
            return res.data.data;
        } catch (error) {
            console.log(error);
            
            return thunkAPI.rejectWithValue("Failed to fetch subcategories");
        }
    }
);

// Toggle subcategories 
export const togleSubCategory = createAsyncThunk(
    "/togleSubcategory",
    async (catId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/subcategory/togle/${catId}`);
            return res.data.data;
        } catch (error) {
            console.log(error);
            
            return thunkAPI.rejectWithValue("Failed to toggle subcategories");
        }
    }
);

// Add subcategory
export const addsubCategory = createAsyncThunk(
    "/subcategory/add",
    async (name, thunkAPI) => {
        try {
            const resp = await axiosInstance.post("/subcategory/add",  name );
            return resp.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Subcategory add failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const subCategorySlice = createSlice({
    name: "subcategory",
    initialState: {
        loading: false,
        subCategory: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategory = action.payload;
            })
            .addCase(fetchSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.subCategory = [];
            })

            // Toggle
            .addCase(togleSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(togleSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategory = action.payload;
            })
            .addCase(togleSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.subCategory = [];
            })

            // Add
            .addCase(addsubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addsubCategory.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.subCategory)) {
                    state.subCategory.push(action.payload);
                } else {
                    state.subCategory = [action.payload];
                }
            })
            .addCase(addsubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default subCategorySlice.reducer;
