import React, { useState } from "react";

const SeatSelection = () => {
  const rows = [1, 2, 3, 4, 5, 6];
  const columns = ["A", "B", "C", "", "E", "F", "G"];
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const handleSaveClick = () => {
    console.log("Selected seats:", selectedSeats);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex mb-2">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`w-10 text-center font-bold ${
              column === "" ? "w-4" : ""
            }`}
          >
            {column}
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row} className="flex justify-center mb-2">
          {columns.map((column, index) => {
            if (column === "") {
              return (
                <div
                  key={index}
                  className="w-4 h-10 m-1 flex justify-center items-center"
                >
                  {row}
                </div>
              );
            } else {
              const seat = `${column}${row}`;
              return (
                <div
                  key={seat}
                  className={`w-10 h-10 m-1 flex justify-center items-center bg-gray-200 border border-gray-400 cursor-pointer 
                                                ${
                                                  selectedSeats.includes(seat)
                                                    ? "bg-green-500 text-white"
                                                    : ""
                                                }`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              );
            }
          })}
        </div>
      ))}
      <button
        onClick={handleSaveClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Simpan
      </button>
    </div>
  );
};

export default SeatSelection;
