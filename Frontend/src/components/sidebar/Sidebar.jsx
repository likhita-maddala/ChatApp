import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div>
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        
        <LogoutButton />
    </div>
  )
}
export default Sidebar