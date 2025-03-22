import  { useState } from 'react';
import ToggleButton from "../ui/ToggleComponent";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import GroupConversations from './GroupConversations';


const Sidebar = () => {
	const [active, setActive] = useState('chats');

	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<ToggleButton active={active} setActive={setActive}/>
			{active === "chats"? 
			(<Conversations />):
			(<GroupConversations />)}
			<LogoutButton />
		</div>
	);
};
export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;