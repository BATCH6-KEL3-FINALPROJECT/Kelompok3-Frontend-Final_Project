import React from "react";
import { FaSearch } from "react-icons/fa";

const DestinasiFavoritBtn = ({ text, selected, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-normal text-sm flex gap-2 items-center px-6 py-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
        selected ? "bg-[#7126B5] text-white" : "bg-[#] text-[#3C3C3C]"
      } hover:shadow-lg`}
    >
      <FaSearch className="text-xl font-normal" />
      <p>{text}</p>
    </button>
  );
};

export default DestinasiFavoritBtn;
