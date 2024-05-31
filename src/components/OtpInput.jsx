import React, { useState } from "react";

const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(5).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex justify-center">
      {otp.map((data, index) => (
        <input
          className="m-2 border border-gray-500 rounded w-12 h-12 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="otp"
          maxLength="1"
          key={index}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
};

export default OtpInput;
