import React, { useState } from "react";
import airportOptions from "../data/airports.json";

const InputComponent = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  airportOptions,
}) => {
  const [showSelect, setShowSelect] = useState(false);

  const handleInputClick = () => {
    setShowSelect(true);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Cek apakah nilai input cocok dengan salah satu nama atau kode bandara
    const matchedAirport = airportOptions.find(
      (airport) =>
        airport.name.toLowerCase() === inputValue.toLowerCase() ||
        airport.code.toLowerCase() === inputValue.toLowerCase()
    );
    if (matchedAirport) {
      onChange({ target: { value: matchedAirport.name } }); // Atur nilai input ke nama bandara yang cocok
    } else {
      onChange(e); // Biarkan nilai input seperti yang dimasukkan pengguna
    }
  };

  const handleSelectChange = (e) => {
    onChange(e);
    setShowSelect(false);
  };

  return (
    <div>
      {showSelect ? (
        <select
          id={id}
          value={value}
          onChange={handleSelectChange}
          onBlur={() => setShowSelect(false)}
          className="appearance-none w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-black"
        >
          <option value="">{placeholder}</option>
          {airportOptions.map((airport) => (
            <option
              key={airport.name}
              value={`${airport.city} (${airport.code})`}
            >
              {airport.name} - {airport.city} ({airport.code})
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          className="appearance-none w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border-b-4 border-gray-400"
        />
      )}
    </div>
    
  );
};

export default InputComponent;
