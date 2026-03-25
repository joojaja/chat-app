import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
 {
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },

    text: {
        type: String,
    },

    image: {
        type: String,
    },
 }, 
 { timestamps: true}
);

const Message = mongoose.model("Message", messageSchema); // name of collection + schema. user upper case first letter + singular form
// mongoose will auto save collection name as "messages" in database

export default Message;