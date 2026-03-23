import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => { // use async so can use await
    const {fullName, email, password} = req.body;
    try {
        // password length check
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"}); //status 400 for error message
        }

        const user = await User.findOne({email}); // check if exists in database
        if (user) return res.status(400).json({message: "Email already exists"});

        // hash password
        const salt = await bcrypt.genSalt(10); // any number
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ // create a new user in databse
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        if (newUser) { // successfully created a new user
            // generate JWT token

        } else {
            res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {

    }
};

export const login = (req, res) => {
    res.send("login route")
};

export const logout = (req, res) => {
    res.send("logout route")
};

