import groupChat from "../models/groupchat.model.js";
import groupMessaging from "../models/groupMessaging.model.js";
import { getGroupSocketId, io } from "../socket/socket.js";

// Create a new group chat
export const createGroupChat = async (req, res) => {
    if (!req.body.groupName || !req.body.participants) {
        return res.status(400).json({ error: "Please fill all fields" });
    }
    let participants = req.body.participants;
    if (participants.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat");
    }
    participants.push(req.user._id);
    const groupProfilePic = `https://avatar.iran.liara.run/username?username=${req.body.groupName}`;
    try {
        const newGroupChat = await groupChat.create({
            groupName: req.body.groupName,
            participants: participants,
            groupProfilePic: groupProfilePic,
            groupMessages: [] // Initialize messages as an empty array
        });

        res.status(200).json("group chat created");
    } catch (error) {
        console.log("Error in createGroupChat controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Send a message in a group chat
export const sendMessageInGroup = async (req, res) => {
    try {
        const { id: groupId } = req.params;
        const { groupMessage } = req.body;

        // Validate the request body
        if (!groupMessage) {
            return res.status(400).json({ error: "groupMessage is required" });
        }

        const senderId = req.user._id;
        console.log(groupId, groupMessage, senderId);

        let conversation = await groupChat.findById(groupId);

        if (!conversation) {
            return res.status(404).json({ error: "Group not found" });
        }

        const newMessageInGroup = new groupMessaging({
            senderId,
            groupId,
            groupMessage,
        });

        await newMessageInGroup.save();

        conversation.groupMessages.push(newMessageInGroup._id);
        await conversation.save();

        // Populate the messages field with actual message documents
        conversation = await groupChat.findById(groupId).populate('groupMessages');

        // SOCKET IO FUNCTIONALITY FOR GROUP CHAT
        conversation.participants.forEach(participantId => {
            if (participantId.toString() !== senderId.toString()) { // Exclude the sender
                const participantSocketId = getGroupSocketId(participantId);
                if (participantSocketId) {
                    io.to(participantSocketId).emit("newMessageInGroup", newMessageInGroup);
                }
            }
        });

        res.status(201).json(newMessageInGroup);
    } catch (error) {
        console.log("Error in sendMessageInGroup controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get messages in a group chat
export const getMessageInGroup = async (req, res) => {
    try {
        const { id: groupId } = req.params;

        const conversation = await groupChat.findById(groupId)
            .populate({
                path: 'groupMessages',
                populate: {
                    path: 'senderId',
                    select: 'fullName username' 
                }
            });

        if (!conversation) return res.status(404).json({ error: "Group not found" });

        res.status(200).json(conversation.groupMessages);
    } catch (error) {
        console.log("Error in getMessageInGroup controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get groups for sidebar
export const getGroupsForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const userGroups = await groupChat.find({ participants: loggedInUserId });

        res.status(200).json(userGroups);
    } catch (error) {
        console.error("Error in getGroupsForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
