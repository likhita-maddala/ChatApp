import React from "react";

const ToggleButton = ({ active, setActive }) => {
  const handleChatClick = () => {
    setActive("chats");
  };

  const handleGroupChatClick = () => {
    setActive("groupChats");
  };

  return (
    <div className='toggleMain'>
      <div className="toggleHolder">
        <div
          className={`toggle-button chats ${active === 'chats' ? 'activeTab' : 'inactiveTab'}`}
          onClick={handleChatClick}
        >
          chats
        </div>
        <div
          className={`toggle-button groupChats ${active === 'groupChats' ? 'activeTab' : 'inactiveTab'}`}
          onClick={handleGroupChatClick}
        >
          groups
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
