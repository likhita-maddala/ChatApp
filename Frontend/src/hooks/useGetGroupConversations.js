
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetGroupConversations = () => {
	const [groupLoading, setGroupLoading] = useState(false);
	const [groupConversations, setGroupConversations] = useState([]);

	useEffect(() => {
		const getGroupConversations = async () => {
			setGroupLoading(true);
			try {
				const res = await fetch("/api/group");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setGroupConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setGroupLoading(false);
			}
		};

		getGroupConversations();
	}, []);

	return { groupLoading, groupConversations };
};
export default useGetGroupConversations;
