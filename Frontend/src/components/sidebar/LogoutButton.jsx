import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import CreateGroupForm from "../CreateGroupForm";

const LogoutButton = () => {
    const { loading, logout } = useLogout();
    const [showForm, setShowForm] = useState(false);
    
    return (
        <div className='mt-auto flex flex-col'>
            <div className='flex justify-between items-center'>
                {!loading ? (
                    <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
                ) : (
                    <span className='loading loading-spinner'></span>
                )}
                <button className="btn glass ml-2" onClick={() => setShowForm(true)}>Create Group</button>
            </div>
            {showForm && (
                <CreateGroupForm setShowForm={setShowForm} />
            )}
        </div>
    );
};

export default LogoutButton;
