import React, { useRef } from "react";
import searchIcon from "../../public/Input_Search_Icon.svg";

const InputSearch = () => {
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = searchRef.current.value;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center relative">
        <input
          type="text"
          placeholder="Cari di sini ..."
          className="px-6 py-4 bg-slate-200 rounded-3xl cursor-pointer w-full md:w-96"
          ref={searchRef}
        />
        <button className="absolute right-0 end-4 md:end-8">
          <img src={searchIcon} alt="input icon" width={24} height={24} />
        </button>
      </div>
    </form>
  );
};

export default InputSearch;
