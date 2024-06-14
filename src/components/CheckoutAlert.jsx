import React from "react";

const CheckoutAlert = ({ type, message }) => {
  return (
    <div className="w-full flex justify-center px-3">
      <div
        className={`w-[850px] max-w-[850px] ${
          type === "Danger" ? "bg-[#FF0000]" : "bg-[#73CA5C]"
        } h-12 rounded-lg flex items-center justify-center text-white font-semibold`}
      >
        {message}
      </div>
    </div>
  );
};

export default CheckoutAlert;
