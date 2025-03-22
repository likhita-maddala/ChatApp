import Conversation from "../models/conversation.model.js";
import groupChat from "../models/groupchat.model.js";
import GroupChat from "../models/groupchat.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let type = "";
		type = req.query?.type;
		console.log('type: ', type);

		if (!(type === "group")) {
			let conversation = await Conversation.findOne({
				participants: { $all: [senderId, receiverId] },
			});

			if (!conversation) {
				conversation = await Conversation.create({
					participants: [senderId, receiverId],
				});
			}

			const newMessage = new Message({
				senderId,
				receiverId,
				message,
			});

			if (newMessage) {
				conversation.messages.push(newMessage._id);
			}

			// await conversation.save();
			// await newMessage.save();

			// this will run in parallel
			await Promise.all([conversation.save(), newMessage.save()]);

			// SOCKET IO FUNCTIONALITY WILL GO HERE
			const receiverSocketId = getReceiverSocketId(receiverId);
			if (receiverSocketId) {
				// io.to(<socket_id>).emit() used to send events to specific client
				io.to(receiverSocketId).emit("newMessage", newMessage);
			}

			res.status(201).json(newMessage);
		} else {
			let conversation = await groupChat.findOne({
				participants: { $all: [senderId] },
				_id: receiverId
			});
			console.log('conversation: ', conversation);

			if (!conversation) {
				return res.status(400).json({error: "group doesn't exist"})
			}

			const newMessage = new Message({
				senderId,
				receiverId,
				message,
			});
			console.log(newMessage);


			if (newMessage) {
				conversation.groupMessages.push(newMessage._id);
			}

			// await conversation.save();
			// await newMessage.save();

			// this will run in parallel
			await Promise.all([conversation.save(), newMessage.save()]);

			// SOCKET IO FUNCTIONALITY WILL GO HERE
			// const receiverSocketId = getReceiverSocketId(receiverId);
			// if (receiverSocketId) {
			// 	// io.to(<socket_id>).emit() used to send events to specific client
			// 	io.to(receiverSocketId).emit("newMessage", newMessage);
			// }

			res.status(201).json(newMessage);
		}
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;
		let type = "";
		type = req.query?.type;
		console.log('type: ', type);
		let conversation = null;
		if (type === "group") {
			conversation = await GroupChat.findOne({
				participants: { $all: [senderId] },
				_id: userToChatId
			}).populate("groupMessages");
			console.log('conversation: ', conversation);
			if (!conversation) return res.status(200).json([]);
	
			const messages = conversation.groupMessages;
	
	
			res.status(200).json(messages);
		} else {
			conversation = await Conversation.findOne({
				participants: { $all: [senderId, userToChatId] },
			}).populate("messages");
			if (!conversation) return res.status(200).json([]);
	
			const messages = conversation.messages;
	
	
			res.status(200).json(messages);
		}

	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};