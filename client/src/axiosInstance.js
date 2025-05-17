// axiosInstance.js
import axios from "axios";
console.log(import.meta.env.VITE_BACKEND_API)

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
    withCredentials:true

});

export default axiosInstance;
