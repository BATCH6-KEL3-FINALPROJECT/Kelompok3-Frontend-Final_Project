import React, { useState } from "react";

const ModalSeatClass = ({
  isOpen,
  closeModal,
  seatClass,
  setSeatClass,
}) => {
  const options = [
    { label: "Economy", value: "Economy", price: "IDR 4,950,000" },
    { label: "Premium Economy", value: "Premium Economy", price: "IDR 7,550,000" },
    { label: "Business", value: "Business", price: "IDR 29,220,000" },
    { label: "First Class", value: "First Class", price: "IDR 87,620,000" },
  ];

  const handleOptionClick = (option) => {
    setSeatClass(option.value);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col relative"
        style={{
          width: "300px",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
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
        <div className="flex flex-col gap-4">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-[#4B1979] hover:text-white"
              onClick={() => handleOptionClick(option)}
            >
              <div className="font-semibold">{option.label}</div>
              <div className="text-gray-500">{option.price}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#4B1979] hover:bg-[#4B1979] text-white font-semibold py-2 px-4 rounded"
            onClick={closeModal}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSeatClass;
