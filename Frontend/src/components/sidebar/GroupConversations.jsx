import useGetGroupConversations from "../../hooks/useGetGroupConversations";
import GroupConversation from "./GroupConversation";
import { getRandomEmoji } from "../../utils/emojis";


const GroupConversations = () => {
	const { groupLoading, groupConversations} = useGetGroupConversations();
  console.log("1qq", groupConversations);
  return (
		<div className='py-2 flex flex-col overflow-auto'>
    {groupConversations.map((group, idx) => (
        <GroupConversation
            key={group.groupId}
            conversation={group}
            emoji={getRandomEmoji()}
            lastIdx={idx === groupConversations.length - 1}
        />
        
        ))}
    {groupLoading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default GroupConversations;