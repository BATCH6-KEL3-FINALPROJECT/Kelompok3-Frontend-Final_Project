import React, { useRef } from "react";

const InputSearch = ({ placeholder, value, onChange, onReset }) => {
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = searchRef.current.value;
    onChange({ target: { value } });
  };

  return (
    <form onSubmit={handleSubmit} className="hidden md:block">
      <div className="flex items-center relative">
        <input
          type="text"
          placeholder={placeholder}
          className="px-6 py-4 bg-slate-200 rounded-3xl cursor-pointer w-full md:w-96"
          ref={searchRef}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute right-16 end-10 md:end-12"
          onClick={onReset}
        >
          <span className="text-red-500 font-bold">X</span>
        </button>
        <button type="submit" className="absolute right-0 end-2 md:end-4">
          <img
            src="/Input_Search_Icon.svg"
            alt="input icon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </form>
  );
};

export default InputSearch;
