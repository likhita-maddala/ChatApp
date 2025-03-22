// import { useEffect, useState } from "react";
// import useGroupConversation from "../zustand/useGroupConversation";
// import toast from "react-hot-toast";

// const useGetGroupMessages = () => {
// 	const [groupLoading, setGroupLoading] = useState(false);
// 	const { groupMessages, setGroupMessages, selectedgroupConversations } = useGroupConversation();

// 	useEffect(() => {
// 		const getGroupMessages = async () => {
// 			setGroupLoading(true);
// 			try {
// 				const res = await fetch(`/api/group/${selectedgroupConversations._id}`);
// 				const data = await res.json();
// 				if (data.error) throw new Error(data.error);
// 				setGroupMessages(data);
// 			} catch (error) {
// 				toast.error(error.message);
// 			} finally {
// 				setGroupLoading(false);
// 			}
// 		};

// 		if (selectedgroupConversations?._id) getGroupMessages();
// 	}, [selectedgroupConversations?._id, setGroupMessages]);

// 	return { groupMessages, groupLoading };
// };
// export default useGetGroupMessages;
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetGroupMessages = () => {
  const [groupLoading, setGroupLoading] = useState(false);
  const { groupMessages, setGroupMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getGroupMessages = async () => {
      setGroupLoading(true);
      try {
        const res = await fetch(`/api/group/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setGroupMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setGroupLoading(false);
      }
    };

    if (selectedConversation?._id) getGroupMessages();
  }, [selectedConversation?._id, setGroupMessages]);

  return { groupMessages, groupLoading };
};

export default useGetGroupMessages;
