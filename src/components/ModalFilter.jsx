import React from "react";
import { FaCheck } from "react-icons/fa";

const FilterModal = ({
  isOpen,
  onClose,
  selectedFilter,
  onSelectFilter,
  onApplyFilter,
}) => {
  if (!isOpen) return null;

  const filters = [
    "Harga - Termurah",
    "Durasi - Terpendek",
    "Keberangkatan - Paling Awal",
    "Keberangkatan - Paling Akhir",
    "Kedatangan - Paling Awal",
    "Kedatangan - Paling Akhir",
  ];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full"
        style={{ width: "400px", height: "384px" }}
      >
        <div className="bg-white p-4 flex justify-end items-center">
          <button className="text-black text-2xl font-bold" onClick={onClose}>
            &times;
          </button>
          <hr
            className="border-gray-400 w-full absolute left-0"
            style={{ top: "55px" }}
          />
        </div>
        <div className="ps-4 pe-4">
          {filters.map((filter, index) => (
            <div
              key={index}
              className={`p-2 flex items-center justify-between cursor-pointer ${
                selectedFilter === filter ? "bg-purple-700" : ""
              }`}
              onClick={() => onSelectFilter(filter)}
            >
              {filter}
              {selectedFilter === filter && (
                <FaCheck
                  className="inline-block ml-2 rounded-full bg-green-400"
                  style={{ color: "#7126B5", marginRight: "8px" }}
                />
              )}
            </div>
          ))}
        </div>
        <hr className="border-gray-300" />
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-purple-800 sm:ml-3 sm:w-auto sm:text-sm"
            style={{ backgroundColor: "#4B1979" }}
            onClick={onApplyFilter}
          >
            Pilih
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
