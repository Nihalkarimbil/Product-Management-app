import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Fetch all categories
export const fetchcategory = createAsyncThunk(
    "/getcategory",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/category/get");
            return res.data.data; 
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue("Failed to fetch categories");
        }
    }
);

// Add a new category
export const addCategory = createAsyncThunk(
    "/category/add",
    async (name, thunkAPI) => {
        try {
            const resp = await axiosInstance.post("/category/add", { name });
            return resp.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Category add failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        loading: false,
        category: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch categories
            .addCase(fetchcategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchcategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(fetchcategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.category = [];
            })

            // Add category
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.category)) {
                    state.category.push(action.payload);
                } else {
                    state.category = [action.payload];
                }
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;
