import { create } from "zustand";

const useGroupConversation = create((set) => ({
	selectedgroupConversations: null,
	setSelectedgroupConversations: (selectedgroupConversations) => set({ selectedgroupConversations }),
	groupMessages: [],
	setGroupMessages: (groupMessages) => set({ groupMessages }),
}));

export default useGroupConversation;


