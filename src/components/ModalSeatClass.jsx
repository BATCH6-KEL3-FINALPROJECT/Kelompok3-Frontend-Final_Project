import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const ModalSeatClass = ({ isOpen, closeModal, seatClass, setSeatClass }) => {
  const [tempSeatClass, setTempSeatClass] = useState(seatClass);

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
    setTempSeatClass(option.value);
  };

  const handleSave = () => {
    setSeatClass(tempSeatClass);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg overflow-hidden  shadow-lg transform transition-all max-w-md w-full"
        style={{ width: "400px", height: "306px" }}
      >
        <div className="bg-white p-4 flex justify-end items-center">
          <button
            className="text-black text-2xl font-bold"
            onClick={closeModal}
          >
            &times;
          </button>
          <hr
            className="border-gray-400 w-full absolute left-0"
            style={{ top: "55px" }}
          />
        </div>
        <div className="ps-4 pe-4">
          {options.map((option, index) => (
            <div
              key={index}
              className={` flex items-center justify-between cursor-pointer ${
                tempSeatClass === option.value ? "bg-purple-700 text-white" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div>
                <div className="font-semibold">{option.label}</div>
                <div className="text-gray-700">{option.price}</div>
              </div>
              {tempSeatClass === option.value && (
                <FaCheck
                  className="inline-block ml-2 rounded-full bg-green-400"
                  style={{ color: "#7126B5", marginRight: "8px" }}
                />
              )}
            </div>
          ))}
        </div>
        <hr className="border-gray-300" />
        <div className="bg-gray-50 px-4 py-1 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-purple-800 sm:ml-3 sm:w-auto sm:text-sm"
            style={{ backgroundColor: "#4B1979" }}
            onClick={handleSave}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSeatClass;
