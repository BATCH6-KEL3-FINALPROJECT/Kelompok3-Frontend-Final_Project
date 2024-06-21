import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DatePickerComponent = ({
  label,
  id,
  value,
  onChange,
  disabled,
  isReturn,
  departureDate,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (date) => {
    onChange(date);
    setIsCalendarOpen(false);
  };

  const tileDisabled = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (view === "month") {
      if (isReturn && departureDate) {
        const departure = new Date(departureDate);
        departure.setHours(0, 0, 0, 0);
        return date < today || date < departure;
      }
      return date < today;
    }
    return false;
  };

  // Function to format the date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Determine initial value for the calendar
  const initialValue = value
    ? new Date(value)
    : isReturn && departureDate
    ? new Date(departureDate)
    : new Date();

  return (
    <div className="relative mb-4">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-gray-600 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={formatDate(value)}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className={`text-center  appearance-none  text-sm md:text-base block w-full md:w-[150px] bg-gray-100 text-gray-700 border-0 border-b border-gray-300 rounded py-2 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 cursor-pointer ${
          !disabled ? "placeholder-purple-500" : ""
        }`}
        placeholder={!disabled ? "Pilih Tanggal" : ""}
        disabled={disabled}
        readOnly
      />
      {isCalendarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsCalendarOpen(false)}
          ></div>
          <div
            className={`absolute top-12 z-10 bg-white p-2 rounded-lg shadow-lg ${
              isReturn ? "-translate-x-1/2" : ""
            }`}
          >
            <Calendar
              onChange={handleDateChange}
              value={initialValue}
              className="react-calendar rounded-lg w-[300px] md:w-[330px]"
              tileClassName={({ date, view }) => {
                const isSelected =
                  view === "month" &&
                  value &&
                  date.getTime() === new Date(value).getTime();
                return isSelected ? "bg-[#6b46c1] text-white rounded-lg" : "";
              }}
              prevLabel="‹"
              nextLabel="›"
              next2Label={null}
              prev2Label={null}
              tileDisabled={tileDisabled}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DatePickerComponent;
