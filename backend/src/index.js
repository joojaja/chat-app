import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // in-built import to work with file and directory paths

import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({limit: '10mb'})); // allows to extract json data from request body. 10mb limit for image uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // 10mb limit for image uploads
app.use(cookieParser()); // allows parsing of cookie
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// if using production environment, serve the frontend from the backend server
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
    connectDB(); // calls connectDB function in ./lib/db.js
})