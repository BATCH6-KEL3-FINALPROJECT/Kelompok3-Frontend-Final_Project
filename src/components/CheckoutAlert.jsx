import React from "react";
import { useNavigate } from "react-router-dom";

const CheckoutAlert = ({ type, message, timeOver = false }) => {
  const navigate = useNavigate();

  const handleReBuy = () => {
    navigate("/");
  };

  return (
    <>
      {timeOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}
      <div className="w-full flex justify-center px-3 relative z-40">
        <div
          className={`w-[850px] max-w-[850px] ${
            type === "Danger" ? "bg-[#FF0000]" : "bg-[#73CA5C]"
          } h-12 rounded-lg flex items-center justify-center text-white font-semibold relative`}
        >
          {message}
          {timeOver && (
            <button
              className="absolute right-3 w-9 h-9 flex text-xl items-center justify-center rounded-full border-white border-4 text-white"
              onClick={handleReBuy}
            >
              X
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutAlert;
