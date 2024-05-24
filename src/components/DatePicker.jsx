import React from "react";

// eslint-disable-next-line react/prop-types
const DatePickerComponent = ({ label, id, value, onChange, disabled }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-gray-600 mb-1"
      >
        {label}
      </label>
      <input
        type="date"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={new Date().toISOString().split("T")[0]}
        className="appearance-none block w-full bg-gray-100 text-gray-700 border-0 border-b border-gray-300 rounded px-4 py-2 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        disabled={disabled}
      />
    </div>
  );
};

export default DatePickerComponent;
