import mongoose from "mongoose";

const groupConversationSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: true
        },
        groupProfilePic: {
            type: String,
            required: true,
        },
        groupMessages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message" // Reference to the group messaging model
            }
        ],
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
    },
    { timestamps: true }
);

const groupChat = mongoose.model("groupChat", groupConversationSchema);
export default groupChat;
