import React, { FC } from "react";
import { RxCross1 } from "react-icons/rx";

interface ChipProps {
  user: { id: string; name: string; avatar?: string };
  removeUserHandler: (id: string) => void;
  highlight: boolean;
}

const Chip: FC<ChipProps> = ({ user, removeUserHandler, highlight }) => {
  return (
    <div
      className={`flex p-2 ${
        highlight ? "bg-blue-500" : "bg-gray-200"
      } rounded-full items-center m-2`}
    >
      {user.avatar && (
        <img
          src={user.avatar}
          alt={`Avatar of ${user.name}`}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div className="p-1">{user.name}</div>
      <RxCross1
        className="cursor-pointer ml-2"
        onClick={() => removeUserHandler(user.id)}
      />
    </div>
  );
};

export default Chip;
