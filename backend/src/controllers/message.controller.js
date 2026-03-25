import User from "../models/user.model.js";
import Message from "../models/message.model.js";

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

export const getMessages = async(req, res) => {
    try {
        const {id:userToChatId} = req.params; // get parameter id and rename to userToChatId
        const myId = req.user._id;

        const messages = await Message.find({ // find all messages where sender is me and receiver is other user or other way around
            $or:[
                {senderId:myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages: ", error.messsage);
        res.status(500).json({message: "Internal server error"});
    }
};