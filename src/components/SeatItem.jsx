import React, { useState } from "react";

const SeatItem = ({
  seat,
  sendData,
  isAvailable,
  isMax,
  passengerNumber,
  isSaved,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick(seat) {
    if (isSelected) {
      setIsSelected(false);
      sendData(seat);
    } else if (!isSelected && !isMax) {
      setIsSelected(true);
      sendData(seat);
    }
  }

  return (
    <>
      {isAvailable ? (
        <button
          type="button"
          className={`w-9 h-9 rounded-md p-1 transition-all text-white duration-200 ease-in-out ${
            isSelected
              ? "bg-[#7126B5] text-white"
              : "bg-[#73CA5C] text-[#73CA5C]"
          }}`}
          disabled={isSaved}
          onClick={() => handleClick(seat)}
        >
          {isSelected ? `${passengerNumber}` : `${seat.row + seat.column}`}
        </button>
      ) : (
        <button
          type="button"
          className="w-9 h-9 rounded-md bg-gray-300 text-white cursor-not-allowed"
          disabled
        >
          X
        </button>
      )}
    </>
  );
};

export default SeatItem;
