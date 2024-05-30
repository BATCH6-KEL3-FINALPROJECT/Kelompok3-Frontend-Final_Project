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

  return (
    <div className="flex items-center gap-4 flex-wrap ml-4">
      <div className="flex flex-col mb-4 gap-3 ml-6">
        <label
          htmlFor="passengers"
          className="block text-xs font-semibold text-gray-600 ml-20"
        >
          Passengers
        </label>
        <div className="flex items-center gap-5 flex-wrap">
          <img src="seat.svg" alt="Passengers" />
          <label className="block text-xs font-semibold text-gray-600">
            To
          </label>
          <div className="relative max-w-[200px]">
            <button
              type="button"
              onClick={() => setShowPassenger(true)}
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
