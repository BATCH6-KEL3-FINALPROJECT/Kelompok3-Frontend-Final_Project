import React, { useState } from "react";
import checklistIcon from "../../public/Checkout_Saved.svg";

const ModalSeatClass = ({ isOpen, closeModal, seatClass, setSeatClass }) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  const options = [
    { label: "Economy", value: "Economy", price: "IDR 4,950,000" },
    {
      label: "Premium Economy",
      value: "Premium Economy",
      price: "IDR 7,550,000",
    },
    { label: "Business", value: "Business", price: "IDR 29,220,000" },
    { label: "First Class", value: "First Class", price: "IDR 87,620,000" },
  ];

  const handleOptionClick = (option) => {
    setSeatClass(option.value);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute bg-white p-6 rounded-lg shadow-lg flex flex-col z-10"
      style={{
        width: "400px",
        borderRadius: "20px",
        padding: "24px",
        top: "100%", // Adjusts the position to be below the button
        right: "-30px",
      }}
    >
      <hr
        className="border-gray-400 w-full absolute left-0"
        style={{ top: "55px" }}
      />
      <div className="flex justify-end mb-2">
        <button onClick={closeModal}>
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option.value}>
            <div
              className={`px-4 py-2 cursor-pointer flex justify-between items-center ${
                seatClass === option.value || hoveredOption === option.value
                  ? "bg-[#4B1979] text-white"
                  : ""
              }`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHoveredOption(option.value)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div>
                <div className="font-semibold">{option.label}</div>
                <div className="text-gray-500">{option.price}</div>
              </div>
              {(seatClass === option.value || hoveredOption === option.value) && (
                <img src={checklistIcon} alt="Selected" className="w-6 h-6" />
              )}
            </div>
            <hr className="my-1 border-gray-300" />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#4B1979] hover:bg-[#4B1979] text-white font-semibold py-2 px-4 rounded"
          onClick={closeModal}
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default ModalSeatClass;
