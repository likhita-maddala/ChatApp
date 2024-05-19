import mongoose from 'mongoose';
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id.toString();

        console.log(typeof(senderId), typeof(receiverId));

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = {
            senderId: senderId,
            receiverId: receiverId,
            message: message
        };
        console.log(newMessage);
        conversation.messages.push(newMessage);

        await conversation.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
