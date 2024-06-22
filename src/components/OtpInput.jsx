import React, { useState } from "react";

const OtpInput = ({ onChange }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;

    const updatedOtp = [...otp.map((d, idx) => (idx === index ? value : d))];
    setOtp(updatedOtp);
    onChange(updatedOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex justify-center">
      {otp.map((data, index) => (
        <input
          className="m-0.5 md:m-2 border border-gray-500 rounded w-12 h-12 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
