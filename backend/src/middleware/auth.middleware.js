import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // get the jwt from cookies
        if (!token) {
            return res.status(401).json({message: "Unauthorized - No token provided"});
        }

        // cookie is generated with userId as payload so need to decrypt cookie
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); // select the user from the database except the password
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;
        next() // call the next function
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({message: "Internal server error"});        
    }

}