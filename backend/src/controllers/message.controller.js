import User from "../models/user.model.js";

export const getUsersForSidebar = async(req, res) => {
    // get every user except myself

    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); // select all != my userId and dont select password
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.messsage);
        res.status(500).json({message: "Internal server error"});
    }
};