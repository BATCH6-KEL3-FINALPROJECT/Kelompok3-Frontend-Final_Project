import React from "react";

const SliderComponent = ({ checked, onChange }) => {
  return (
    <div className="flex flex-col ">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className="relative gap-5">
          <div
            className={`block w-10 h-6 md:w-12 md:h-7 rounded-full transition-colors ${
              checked ? "bg-[#7126B5]" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 w-4 h-4 md:w-5 md:h-5 rounded-full transition-transform bg-white ${
              checked ? "transform translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};
export default SliderComponent;
