import React from "react";

const SliderComponent = ({ checked, onChange }) => {
  return (
    <div className="flex flex-col ml-3">
      <label className="flex items-center cursor-pointer mb-16">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className="relative gap-5">
          <div
            className={`block w-14 h-8 rounded-full transition-colors ${
              checked ? "bg-[#7126B5]" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition-transform bg-white ${
              checked ? "transform translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};
export default SliderComponent;
