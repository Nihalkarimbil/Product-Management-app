import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

//USER REGISTRATION
export const registeruser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        console.log(userData);
        
        try {
            const response = await axiosInstance.post("/auth/register", userData);
            console.log(response);
            
            return response.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "registration failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//USER LOGIN
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/login", userData);
            return response.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Login failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    name: "",
    email: "",
    password: "",
    loading: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.name = "";
            state.email = "";
            state.password = "";
            state.isAuthenticated = false;
            localStorage.removeItem("user")
        },
    },
    extraReducers: (builder) => {
        builder
            //Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { name, email } = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload.data));
                state.name = name;
                state.email = email;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Register
            .addCase(registeruser.pending,(state)=>{
                state.loading=true,
                state.error=null
            })
            .addCase(registeruser.fulfilled,(state,action)=>{
                const { name, email } = action.payload;
                state.name = name;
                state.email = email;
                state.loading = false;
            })
            .addCase(registeruser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
