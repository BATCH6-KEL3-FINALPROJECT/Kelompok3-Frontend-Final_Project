import React, { useState, useEffect, useRef } from "react";
import ModalPassenger from "./ModalPassenger";

function Passenger({ onChange }) {
  const [showPassenger, setShowPassenger] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  useEffect(() => {
    // Call onChange every time passenger counts change
    onChange({ adult: adultCount, child: childCount, infant: infantCount });
  }, [adultCount, childCount, infantCount, onChange]);

  const handleSetAdultCount = (count) => {
    if (count < 1) {
      setAdultCount(1);
    } else {
      setAdultCount(count);
    }
  };

  return (
    <div className="flex md:items-center gap-4 flex-wrap md:ml-4 relative">
      <div className="md:flex md:flex-col mb-3 md:mb-4 gap-3 md:ml-6">
        <label
          htmlFor="passengers"
          className="block text-xs font-semibold text-gray-600 md:ml-20 "
        >
          Passengers
        </label>
        <div className="flex items-center gap-5 flex-wrap">
          <img src="seat.svg" alt="Passengers" className="hidden md:block" />
          <label className="md:block text-xs font-semibold text-gray-600 hidden">
            To
          </label>
          <div className=" md:max-w-[200px]">
            <button
              type="button"
              onClick={() => setShowPassenger(true)}
              className="appearance-none text-sm md:text-base  w-[130px] font-semibold md:w-full text-gray-700 border-b-4 border-gray-300 rounded-t  py-3 md:py-3 md:px-4 leading-tight focus:outline-none focus:bg-white focus:border-black"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {`${adultCount + childCount + infantCount} Penumpang`}
            </button>
          </div>
        </div>
      </div>
      <ModalPassenger
        isOpen={showPassenger}
        closeModal={() => setShowPassenger(false)}
        adults={adultCount}
        setAdults={setAdultCount}
        childrens={childCount}
        setChildrens={setChildCount}
        infants={infantCount}
        setInfants={setInfantCount}
      />
    </div>
  );
}

export default Passenger;
