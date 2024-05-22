import React, { useState, useEffect, useRef } from "react";

function Passenger({ onChange }) {
  const [showPassenger, setShowPassenger] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const passengerRef = useRef(null);

  const handleAddAdult = () => {
    setAdultCount((prev) => prev + 1);
  };

  const handleRemoveAdult = () => {
    if (adultCount > 0) {
      setAdultCount((prev) => prev - 1);
    }
  };

  const handleAddChild = () => {
    setChildCount((prev) => prev + 1);
  };

  const handleRemoveChild = () => {
    if (childCount > 0) {
      setChildCount((prev) => prev - 1);
    }
  };

  const handleAddInfant = () => {
    setInfantCount((prev) => prev + 1);
  };

  const handleRemoveInfant = () => {
    if (infantCount > 0) {
      setInfantCount((prev) => prev - 1);
    }
  };

  const handleFinishInput = () => {
    setShowPassenger(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      setShowPassenger(false);
    }
  };

  const handleClickOutside = (event) => {
    if (passengerRef.current && !passengerRef.current.contains(event.target)) {
      setShowPassenger(false);
    }
  };

  useEffect(() => {
    if (showPassenger) {
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPassenger]);

  useEffect(() => {
    // Call onChange every time passenger counts change
    onChange({ adult: adultCount, child: childCount, infant: infantCount });
  }, [adultCount, childCount, infantCount, onChange]);

  return (
    <div className="flex items-center gap-4 flex-wrap ml-4">
      <div className="flex flex-col mb-4 gap-3 ml-6">
        <label
          htmlFor="passengers"
          className="block text-xs font-semibold text-gray-600 ml-20"
        >
          Passengers
        </label>
        <div className="flex items-center gap-5 flex-wrap" ref={passengerRef}>
          <img src="seat.svg" alt="Passengers" />
          <label className="block text-xs font-semibold text-gray-600">
            To
          </label>
          <div className="relative max-w-[200px]">
            <button
              type="button"
              onClick={() => setShowPassenger(!showPassenger)}
              className="appearance-none w-full text-gray-700 border-b-4 border-gray-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
              style={{
                width: "180px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {`${adultCount + childCount + infantCount} Penumpang`}
            </button>
            {showPassenger && (
              <div
                className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded shadow-lg p-4 gap-5 z-10"
                style={{
                  width: "400px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "20px",
                }}
              >
                <div className="flex justify-end w-full mr-3">
                  <img
                    src="Close.png"
                    alt="Close"
                    onClick={handleFinishInput}
                    className="cursor-pointer"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
                <div className="mb-2 flex justify-between w-full items-center">
                  <img src="dewasa.png" alt="Icon" className="w-10 h-10 mr-2" />
                  <label className="block text-xs font-semibold text-gray-600">
                    Dewasa
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={handleRemoveAdult}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{adultCount}</span>
                    <button
                      type="button"
                      onClick={handleAddAdult}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mb-2 flex justify-between w-full">
                  <label className="block text-xs font-semibold text-gray-600">
                    Anak
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={handleRemoveChild}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{childCount}</span>
                    <button
                      type="button"
                      onClick={handleAddChild}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mb-2 flex justify-between w-full">
                  <label className="block text-xs font-semibold text-gray-600">
                    Balita
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={handleRemoveInfant}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{infantCount}</span>
                    <button
                      type="button"
                      onClick={handleAddInfant}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleFinishInput}
                  className="mt-2 bg-[#7126B5] hover:bg-[#7126B5] text-white font-semibold py-2 px-4 rounded btn-finish"
                  style={{ marginLeft: "auto" }}
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Passenger;
