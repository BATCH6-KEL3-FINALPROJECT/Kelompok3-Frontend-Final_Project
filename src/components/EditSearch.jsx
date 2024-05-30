import React from "react";

const EditSearch = ({ origin, destination, passengers, classType, onEdit }) => {
  return (
    <div className="flex flex-col md:flex-row p-4 items-center md:justify-between">
      <div className="w-full md:w-[700px] h-[50px] p-2 px-4 gap-2 rounded-lg bg-[#A06ECE] flex items-center mb-2 md:mb-0">
        <a href="#" onClick={onEdit} className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              className="text-white"
            />
          </svg>
        </a>
        <h1 className="font-poppins text-sm md:text-base  md:font-medium leading-6 text-white text-center flex-1 mx-2">
          {`${origin} > ${destination} - ${passengers} Penumpang - ${classType}`}
        </h1>
      </div>
      <button className="w-full md:w-[220px] h-[50px] p-2 px-4 gap-2 rounded-lg bg-[#73CA5C] text-white font-poppins  text-sm md:text-base font-bold leading-6 text-center border-none cursor-pointer">
        Ubah Pencarian
      </button>
    </div>
  );
};

export default EditSearch;
