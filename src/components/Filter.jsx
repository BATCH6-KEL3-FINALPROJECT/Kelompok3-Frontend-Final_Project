import React from "react";
import TypeFilter from "./TypeFilter.jsx";
import { FaRegHeart } from "react-icons/fa";
import { FiBox, FiDollarSign } from "react-icons/fi";

function Filter() {
  return (
    <>
      <TypeFilter icons={<FiBox className="text-xl" />} label={"Transit"} />
      <TypeFilter
        icons={<FaRegHeart className="text-xl" />}
        label={"Fasilitas"}
        more={true}
      />
      <TypeFilter
        icons={<FiDollarSign className="text-xl" />}
        label={"Harga"}
      />
    </>
  );
}

export default Filter;
