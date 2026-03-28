import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

import { axiosInstance } from "./lib/axios.js";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";

import {Loader} from "lucide-react"; // npm i lucide-react for icons
import { Toaster } from "react-hot-toast"; // npm i react-hot-toast for toast notifications

const App = () => {
  // Access authentication state from auth store (Zustand global state management)
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  // Check authentication status on website load / refresh
  useEffect(() => {
    checkAuth(); // Call the global function initialised in useAuthStore.js
  }, [checkAuth]);

  console.log({authUser});

  // Show a loading spinner while checking authentication status
  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
    </div>
  );

  return (
    <>
      <Navbar/> {/* Show the navigation bar on all pages */}
        <Routes> {/* Define routes for the application, with conditional rendering based on authentication status */}
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />}/>
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>

        <Toaster {/* Toaster plugin that displays toast notifications */}
          position="top-center"
          reverseOrder={false}
        />
    </>
  );
};

export default App;