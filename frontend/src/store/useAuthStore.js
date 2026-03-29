import {create} from "zustand"; // importing of Zustand for global state manangement, same as Redux Toolkit
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    // Global function to check authentication status, called on website refresh or load
    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            set({authUser: null});
            console.log("Error in checkAuth: ", error);
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            // Make a POST request to the backend API to create a new user account with the provided data
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))