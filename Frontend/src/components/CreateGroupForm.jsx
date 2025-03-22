import { useState } from "react";
import useCreateGroup from "../hooks/useCreateGroup";
import useGetConversations from "../hooks/useGetConversations";

const CreateGroupForm = ({ setShowForm }) => {
    const { CreateGroup, loading } = useCreateGroup();
    const [groupName, setGroupName] = useState("");
    const [search, setSearch] = useState("");
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [error, setError] = useState("");
    const { conversations } = useGetConversations();

    const handleCreateGroup = () => {
        if (groupName.trim() === "" || selectedParticipants.length < 2) {
            setError("Please provide a group name and select at least 2 participants");
            return;
        }
        setError("");
        const participantIds = selectedParticipants.map(participant => participant._id);
        CreateGroup(groupName, participantIds.join(","));
        setShowForm(false);
        setGroupName("");
        setSelectedParticipants([]);
    };

    const removeSelectedParticipant = (participant) =>{
        console.log(participant);
        setSelectedParticipants(selectedParticipants.filter(p=>p._id !== participant._id))
    }

    const handleSelectParticipant = (participant) => {
        setSelectedParticipants([...selectedParticipants, participant]);
        setSearch("");
        console.log(selectedParticipants);
    };

    const filteredConversations = search
        ? conversations.filter(c => c.fullName.toLowerCase().includes(search.toLowerCase()))
        : [];

    const closeForm = () => {
        setShowForm(false);
    }

    return (
        <div className="fixed inset-0 flex flex-row items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div style={{cursor: "pointer"}} onClick={() => closeForm()}>X</div>
            <div className="p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60">
                <div className="mt-4 p-4 bg-gray-800 text-white rounded">
                    {error && <div className="mb-2 text-red-500">{error}</div>}
                    <label className="block mb-2">
                        Group Name:
                        <input
                            type="text"
                            className="input input-bordered w-full mt-1"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </label>
                    <label className="block mb-2">
                        Search Participants:
                        <input
                            type="text"
                            className="input input-bordered w-full mt-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
                    <div className="mt-2 max-h-40 overflow-y-auto">
                        {filteredConversations.map(participant => (
                            <div 
                                key={participant.id} 
                                className="flex items-center justify-between p-2 bg-gray-700 rounded mt-1 cursor-pointer"
                                onClick={() => handleSelectParticipant(participant)}
                            >
                                <span>{participant.fullName}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2">
                        {selectedParticipants.map(participant => (
                            <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-700 rounded mt-1">
                                <span>{participant.fullName}</span>
                                <button onClick={() => removeSelectedParticipant(participant)} className="text-red-500">X</button>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleCreateGroup} disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupForm;
