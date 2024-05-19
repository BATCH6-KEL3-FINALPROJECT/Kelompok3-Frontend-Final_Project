import React from "react";
import { FaSearch } from "react-icons/fa";

const DestinasiFavoritBtn = ({ text, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`font-normal flex gap-2 items-center px-6 py-4 rounded-xl ${
        selected ? "bg-[#7126B5] text-white" : "bg-[#E2D4F0] text-[#3C3C3C]"
      }`}
    >
      <FaSearch />
      <p>{text}</p>
    </button>
  );
};

export default DestinasiFavoritBtn;
