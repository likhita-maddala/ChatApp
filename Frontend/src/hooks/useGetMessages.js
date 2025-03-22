import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	console.log('selectedConversation: ', selectedConversation);
	
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				let res =null;
				if(selectedConversation?.groupName){
					res = await fetch(`/api/messages/${selectedConversation._id}?type=group`);
				} else{
					res = await fetch(`/api/messages/${selectedConversation._id}`);
				}
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;