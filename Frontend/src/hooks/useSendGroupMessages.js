import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendGroupMessage = () => {
	const [groupLoading, setGroupLoading] = useState(false);
	const { groupMessages, setGroupMessages, selectedConversations } = useConversation();

	const sendGroupMessage = async (groupMessage) => {
		setGroupLoading(true);
		try {
			const res = await fetch(`/api/group/sendInGroup/${selectedConversations._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ groupMessage }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setGroupMessages([...groupMessages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setGroupLoading(false);
		}
	};

	return { sendGroupMessage, groupLoading };
};
export default useSendGroupMessage;