import mongoose from "mongoose";

const groupMessagingSchema = new mongoose.Schema(
    {
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "groupChat" // Reference to the group chat model
        },
        groupMessage: {
            type: String,
            required: true // Changed to required, as messages are crucial
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    },
    { timestamps: true }
);

const groupMessaging = mongoose.model("groupMessaging", groupMessagingSchema);
export default groupMessaging;
