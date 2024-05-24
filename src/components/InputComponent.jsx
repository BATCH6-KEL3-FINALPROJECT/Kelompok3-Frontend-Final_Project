import React from "react";

const InputComponent = ({ id, value, onChange, placeholder }) => {
  return (
    <div className="flex items-center">
      <div className="relative w-full">
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="appearance-none w-full text-gray-700 border-none rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-black"
        />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default InputComponent;
