import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
 {
    email: {
        type: String,
        required: true,
        unique: true,
    },

    fullName: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    profilePic: {
        type: String,
        default: "",
    },
 }, 
 { timestamps: true}
);

const User = mongoose.model("User", userSchema); // name of collection + schema. user upper case first letter + singular form
// mongoose will auto save collection name as "users" in database

export default User;