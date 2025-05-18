import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Add to wishlist
export const addToWishlist = createAsyncThunk(
    "wishlist/add",
    async (data, thunkAPI) => {
        try {
            const resp = await axiosInstance.post("/wishlist/add", data);
            return resp.data;
        } catch (error) {
            const message = error.response?.data?.message || "Wishlist add failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get wishlist for a user
export const getWishlist = createAsyncThunk(
    "wishlist/get",
    async (userId, thunkAPI) => {
        try {
            const resp = await axiosInstance.get(`/wishlist/get/${userId}`);
            console.log(resp.data.data[0]);
            
            return resp.data.data[0];
        } catch (error) {
            const message = error.response?.data?.message || "Wishlist fetch failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    items: {
        products: []
    },
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items.products.push(action.payload); 
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = {
                    products: action.payload.products 
                };
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default wishlistSlice.reducer;
