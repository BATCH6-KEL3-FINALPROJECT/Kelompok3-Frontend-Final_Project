import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const FilterModal = ({
  isOpen,
  onClose,
  selectedFilter,
  onSelectFilter,
  onApplyFilter,
  flights,
  isFiltered,
  setFlights,
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

  const filterFunctions = {
    "Harga - Termurah": (a, b) => a.price - b.price,
    "Durasi - Terpendek": (a, b) => a.flight_duration - b.flight_duration,
    "Keberangkatan - Paling Awal": (a, b) =>
      a.departure_time.localeCompare(b.departure_time),
    "Keberangkatan - Paling Akhir": (a, b) =>
      b.departure_time.localeCompare(a.departure_time),
    "Kedatangan - Paling Awal": (a, b) =>
      a.arrival_time.localeCompare(b.arrival_time),
    "Kedatangan - Paling Akhir": (a, b) =>
      b.arrival_time.localeCompare(a.arrival_time),
  };

  const filterFlights = () => {
    const sortedFlights = [...flights].sort(filterFunctions[selectedFilter]);
    setFlights(sortedFlights);
    isFiltered(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-11/12 md:w-full">
        <div className="bg-white p-4 py-2 flex justify-end items-center">
          <button className="text-black text-3xl font-bold" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div>
          {filters.map((filter, index) => {
            const parts = filter.split(" - ");
            return (
              <div
                key={index}
                className={`p-2 flex items-center justify-between cursor-pointer ${
                  selectedFilter === filter
                    ? "bg-purple-700 text-white"
                    : "text-black"
                }`}
                onClick={() => onSelectFilter(filter)}
              >
                <h1>
                  <strong>{parts[0]}</strong> - {parts[1]}
                </h1>
                {selectedFilter === filter && (
                  <FaCheckCircle
                    className="inline-block ml-2 rounded-full text-xl text-[#73CA5C]"
                    style={{ marginRight: "8px" }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <hr className="border-gray-300" />
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-16 py-2 md:py-3 text-base font-medium text-white bg-[#4B1979] hover:bg-purple-800 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {
              filterFlights();
              onApplyFilter();
            }}
          >
            Pilih
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
