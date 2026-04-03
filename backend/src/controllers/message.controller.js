import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js";

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

export const sendMessage = async(req, res) => {
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params; // get parameter id and rename to receiverId
        const senderId = req.user._id;

        // if sent a image, upload to cloudinary and save the url
        let imageUrl;
        if (image) {
            // Upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({ // create the Message object
            senderId: senderId,
            receiverId: receiverId,
            text: text,
            image: imageUrl,
        })

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) { // if the receiver is online, send the new message to the receiver in real-time using socket.io
            io.to(receiverSocketId).emit("newMessage", newMessage); // "newMessage" is the event name, newMessage is the data we are sending to the receiver
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.messsage);
        res.status(500).json({message: "Internal server error"});
    }

}