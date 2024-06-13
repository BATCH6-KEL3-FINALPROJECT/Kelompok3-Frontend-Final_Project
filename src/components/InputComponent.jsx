import React, { useState, useEffect, useRef } from "react";
import airportOptions from "../data/airports.json";

const InputComponent = ({
  id,
  value,
  onChange,
  placeholder,
  activeInput,
  setActiveInput,
  readOnly,
  style = {},
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [locationNotFound, setLocationNotFound] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (activeInput === id) {
      inputRef.current?.focus();
    } else {
      if (
        !filteredOptions.some(
          (airport) => `${airport.city} (${airport.code})` === inputValue
        )
      ) {
        setInputValue(prevValue);
      }
      setShowSelect(false);
    }
  }, [activeInput, id, inputValue, filteredOptions, prevValue]);

  const handleInputClick = () => {
    setPrevValue(inputValue);
    setActiveInput(id);
    setShowSelect(true);
    setFilteredOptions(airportOptions);
    setLocationNotFound(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    onChange({ target: { value: inputValue } });

    const matchedOptions = airportOptions.filter(
      (airport) =>
        airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.code.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.city.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredOptions(matchedOptions);
    setLocationNotFound(matchedOptions.length === 0);
    setShowSelect(true);
  };

  const handleSelectChange = (selectedValue) => {
    setInputValue(selectedValue);
    onChange({ target: { value: selectedValue } });
    setShowSelect(false);
    setLocationNotFound(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder={placeholder}
        ref={inputRef}
        className="w-full px-4 py-2 border-2 rounded outline-none"
        readOnly={readOnly}
        style={style}
      />
      {showSelect && (
        <div
          className={`absolute left-1/3 transform ${
            id === "from"
              ? "md:-translate-x-1/3 -translate-x-1/2"
              : "-translate-x-1/2"
          } top-1/3 z-10 mt-7 h-[300px] w-[90vw] md:w-[600px] bg-white px-4 shadow-md rounded-md`}
        >
          <div className="flex items-center gap-2 pt-3">
            <input
              className="w-full appearance-none px-4 py-2 font-poppins outline-none cursor-pointer border"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <button
              className="bg-white font-poppins"
              onClick={() => setActiveInput(null)}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[32px] w-[32px]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="overflow-y-scroll pt-3" style={{ height: "238px" }}>
            {locationNotFound ? (
              <div className="text-head-1-5 mb-2 pt-2 font-poppins text-[14px] md:font-semibold">
                <h1>Location not found...</h1>
              </div>
            ) : (
              filteredOptions.map((airport, index) => (
                <div
                  key={`${airport.code}-${index}`}
                  className="cursor-pointer hover:bg-gray-200 p-2"
                  onClick={() =>
                    handleSelectChange(`${airport.city} (${airport.code})`)
                  }
                >
                  {airport.name} - {airport.city} ({airport.code})
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputComponent;
