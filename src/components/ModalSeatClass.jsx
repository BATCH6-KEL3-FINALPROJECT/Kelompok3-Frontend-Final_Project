import React, { useState, useEffect } from "react";

const ModalSeatClass = ({ isOpen, closeModal, seatClass, setSeatClass }) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(seatClass);

  useEffect(() => {
    if (isOpen) {
      setSelectedOption(seatClass);
    }
  }, [isOpen, seatClass]);

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
    setSelectedOption(option.value);
  };

  const handleSaveClick = () => {
    setSeatClass(selectedOption);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="fixed inset-0 md:absolute md:top-full md:right-[-45px] flex items-center justify-center z-10">
        <div
          className="absolute md:top-full md:right-[-45px] bg-white p-6 rounded-lg shadow-lg flex flex-col z-10 mt-2 w-[380px] md:w-[400px] md:h-[356px]"
          style={{
            borderRadius: "20px",
            padding: "24px",
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
                  className={`px-4 py-1 cursor-pointer flex justify-between items-center ${
                    selectedOption === option.value ||
                    hoveredOption === option.value
                      ? "bg-[#4B1979] text-white"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => setHoveredOption(option.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div
                      className={`${
                        selectedOption === option.value ||
                        hoveredOption === option.value
                          ? "text-white"
                          : "text-[#7126B5]"
                      }`}
                    >
                      {option.price}
                    </div>
                  </div>
                  {(selectedOption === option.value ||
                    hoveredOption === option.value) && (
                    <img
                      src="/Checkout_Saved.svg"
                      alt="Selected"
                      className="w-6 h-6"
                    />
                  )}
                </div>
                <hr className="border-gray-300" />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-[#4B1979] hover:bg-[#4B1979] text-white font-semibold py-2 px-4 rounded"
              onClick={handleSaveClick}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSeatClass;
