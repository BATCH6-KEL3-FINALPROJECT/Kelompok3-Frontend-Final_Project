import React from "react";
import { IoIosArrowForward } from "react-icons/io";
function TypeFilter({ icons, label }) {
  return (
    <>
      <div className="flex flex-row text-base w-full border-b even:border-y-1 last:border-0 pb-4 mt-4 group">
        <div className="flex items-center size-6">
          <img src={`./public/${icons}`} alt="Transit Icon" className="mr-2" />
          <p className="">{label}</p>
        </div>
        <div className="flex items-center justify-end ml-auto size-6">
          <IoIosArrowForward className="text-slate-300 group-hover:text-slate-500" />
        </div>
      </div>
    </>
  );
}

export default TypeFilter;
