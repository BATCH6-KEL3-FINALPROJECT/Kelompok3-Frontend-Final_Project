import React from "react";
import { IoIosArrowForward } from "react-icons/io";

function TypeFilter({ icons, label, more = false }) {
  return (
    <>
      <button className="flex justify-between items-center py-2 rounded-lg text-slate-500 hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300">
        <div className="flex gap-2 items-center">
          {icons} <p className="text-black font-normal">{label}</p>
        </div>
        {more ? (
          <div>
            <IoIosArrowForward className="text-xl" />
          </div>
        ) : (
          ""
        )}
      </button>
    </>
  );
}

export default TypeFilter;
