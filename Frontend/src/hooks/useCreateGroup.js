import { useState } from "react";
import toast from "react-hot-toast";
import useGetConversations from "./useGetConversations";

const useCreateGroup = () => {
    const [loading, setLoading] = useState(false);
    const { conversations } = useGetConversations();
    console.log(conversations);

    const CreateGroup = async (groupName, participantsString) => {
        console.log(participantsString);
        if (!participantsString) {
            return;
        }
        const participants = participantsString.split(',').map(participant => participant.trim().replace(/(^"|"$)/g, ''));
        // const success = handleInputError(groupName, participants);

        // if (!success) return;
        setLoading(true);
        try {
            const payload = {
                groupName: groupName.trim(),
                participants: participants
            };
            const body = JSON.stringify(payload);
            const res = await fetch("/api/group/createGroup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body,
            });
            const data = await res.json();
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, CreateGroup };
};

export default useCreateGroup;

// eslint-disable-next-line no-unused-vars
function handleInputError(groupName, participants) {
    if (groupName.trim() === "" || !Array.isArray(participants) || participants.length === 0 || participants.some(participant => participant.trim() === "")) {
        toast.error("Please fill in all fields correctly");
        return false;
    }
    return true;
}
