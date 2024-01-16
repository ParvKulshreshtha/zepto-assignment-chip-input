import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import Chip from "./Components/Chip";
import { User, Users } from "./Data/user";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [isDivClicked, setDivClicked] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [highlightedUser, setHighlightedUser] = useState<string | undefined>("");
  const divRef = useRef<HTMLDivElement>(null);

  // Handle click inside the div
  const handleDivClick = () => {
    setDivClicked(true);
  };

  // Handle click outside the div
  const handleOutsideClick = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setDivClicked(false);
      setHighlightedUser("");
    }
  };

  // Handle backspace key press
  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      selectedUser.length > 0
    ) {
      if (!highlightedUser) {
        setHighlightedUser(selectedUser[selectedUser.length - 1].id);
      } else {
        setSelectedUser((prevSelected) => {
          const updatedSelected = [...prevSelected];
          updatedSelected.pop(); // Remove the last element
          return updatedSelected;
        });
        setHighlightedUser("");
      }
    }
  };

  // Add click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const filteredUsers = Users.filter(
    (user) =>
      user.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedUser?.map((user) => user.id)?.includes(user.id)
  );

  return (
    <div>
      <div
        ref={divRef}
        onClick={handleDivClick}
        className={`relative p-2 cursor-pointer flex flex-wrap border-b ${
          isDivClicked ? "border-blue-500" : "border-gray-300"
        }`}
      >
        {selectedUser?.map((user) => (
          <Chip
            user={user}
            key={user.id}
            highlight={user.id === highlightedUser}
            removeUserHandler={() => {
              setSelectedUser((prevSelected) =>
                prevSelected.filter((u) => u.id !== user.id)
              );
              setHighlightedUser(""); // Remove highlight when removing a user
            }}
          />
        ))}

        <div className="">
          <input
            className="w-full h-full outline-none border-none"
            placeholder="Select Users..."
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyDown={handleBackspace}
          />
          {isDivClicked && (
          <div className="shadow-md w-64 p-2 bg-white absolute top-full">
            {filteredUsers.length>0?filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  setSelectedUser((prevSelect) => [...prevSelect, user])
                  setInputValue("")
                }}
                className="flex items-center cursor-pointer p-2 transition-all duration-300 hover:bg-gray-200"
              >
                <img
                  src={user.avatar}
                  alt={`${user.name}'s Avatar`}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            )):<div className="text-red-500">No Users Remaining</div>}
          </div>
        )}
        </div>
      </div>
      <div className="mt-4">Submission By: Parv Kulshreshtha</div>
      <div>
        <a href="https://drive.google.com/file/d/1utuXbmwitGYAeRIWKD8zWqXMlf_zmiW8/view?usp=sharing" className="text-blue-400">My Resume</a>
      </div>
      <div>
        <a href="https://github.com/ParvKulshreshtha/zepto-assignment-chip-input" className="text-blue-400">Source Code</a>
      </div>
    </div>
  );
};

export default App;
