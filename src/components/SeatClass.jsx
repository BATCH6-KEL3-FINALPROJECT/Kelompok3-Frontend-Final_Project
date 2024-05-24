import React, { useState, useEffect, useRef } from "react";

function SeatClass({ seatClass, handleSeatClassChange }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const optionsRef = useRef(null);

  const prices = {
    Economy: 4950000,
    "Premium Economy": 7550000,
    Business: 29220000,
    "First Class": 87620000,
  };

  const options = [
    { label: "Economy", value: "Economy", price: "IDR 4,950,000" },
    { label: "Premium Economy", value: "Premium Economy", price: "IDR 7,550,000" },
    { label: "Business", value: "Business", price: "IDR 29,220,000" },
    { label: "First Class", value: "First Class", price: "IDR 87,620,000" },
  ];

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    console.log(`Selected seat class: ${option.label} ${option.price}`);
    handleSeatClassChange({ target: { value: option.value } });
    setSelectedOption(option);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (showOptions && selectedOption) {
          handleSeatClassChange({ target: { value: selectedOption.value } });
          setShowOptions(false);
        }
      } else if (event.key === "Escape") {
        setShowOptions(false);
      }
    };

    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions, selectedOption]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-3 ml-6">
        <div
          className="flex flex-col mb-4 gap-3 relative"
          ref={optionsRef}
        >
          <label
            htmlFor="seatClass"
            className="block text-xs font-semibold text-gray-600"
          >
            Seat Class
          </label>
          <div className="flex items-center">
            <button
              type="button"
              className="appearance-none w-full font-semibold text-gray-700 border-b-4 border-gray-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
              onClick={toggleOptions}
            >
              {seatClass}
            </button>
          </div>
          {showOptions && (
            <div
              className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded shadow-lg p-4 gap-4 z-10"
              style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "",
                borderRadius: "20px",
              }}
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 cursor-pointer hover:bg-purple-900"
                  onClick={() => handleOptionClick(option)}
                >
                  <div>{option.label}</div>
                  <div>{option.price}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeatClass;
