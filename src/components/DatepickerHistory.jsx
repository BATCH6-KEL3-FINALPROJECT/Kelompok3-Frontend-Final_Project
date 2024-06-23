// DatePickerModal.js
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerModal = ({
  isOpen,
  toggleModal,
  startDate,
  endDate,
  handleDateChange,
  applyDateFilter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-2 rounded-lg shadow-lg">
        <div className="flex justify-between items-center ">
          <h2 className="text-lg font-medium">Waktu Transaksi</h2>
          <button
            onClick={toggleModal}
            className="text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
        <div className="flex justify-end">
          <button
            onClick={applyDateFilter}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
