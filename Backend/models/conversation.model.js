import mongoose from 'mongoose';
const message = new mongoose.Schema({
    senderId:{
        type: String,
        required: true
    },
    receiverId:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {timestamps: true});

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: String,
            },
        ],
        messages: [ message ],
},   {timestamps: true});
 
const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;