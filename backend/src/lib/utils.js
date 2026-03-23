import jwt from "jsonwebtoken";

export const generateToken = (usreId, res) => {

    // generate token with imported library
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { // function takes in payload + JWT secret key + options
        expiresIn: "7d"
    })

    // send token via cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in miliseconds
        httpOnly: true, // not accessible via JavaScript (prevent cross-site scripting attacks)
        sameSite: "strict", // prevent cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" // true in production, false in localhost
    })

    return token;
}