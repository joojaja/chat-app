import express from "express";
import {protectRoute} from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages); //userId that we want to fetch the messages 

router.post("/send/:id", protectRoute, sendMessage); //send new message to userId

export default router;