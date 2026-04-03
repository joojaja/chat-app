import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api", // sets base URL for API requests based on environment (development or production)
    withCredentials: true
})