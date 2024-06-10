import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AccordionTicket = ({ flight, isOpen, toggleAccordion }) => {
  const handleSelect = () => {
    console.log("Ticket selected:", flight);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="p-3 shadow-md border-2 bg-white rounded-lg mb-4 transition-all duration-500 relative hover:border-[#7126B580]/50">
      <div
        className={` text-left text-lg font-medium text-gray-900 bg-white flex items-center justify-between ${
          isOpen ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <div className="flex items-start">
          <img src="logoplane.svg" alt="Logo" className="h-6 mr-2" />
          <div className="flex flex-col ml-2">
            <span className="text-sm text-gray-500">
              {flight.airline_name} - {flight.seat_class}
            </span>
            <div
              className="grid grid-cols-3 gap-0 text-sm text-gray-500 mt-1"
              style={{
                gridTemplateColumns: "1fr 5fr 2fr",
                gridTemplateRows: "repeat(3, auto)",
                alignItems: "center",
              }}
            >
              <div>
                <strong className="text-black">
                  {flight.departure_time.slice(0, -3)}
                </strong>
              </div>
              <div className="text-sm text-center">Duration</div>
              <div>
                <strong className="text-black">
                  {flight.arrival_time.slice(0, -3)}
                </strong>
              </div>
              <div></div>
              <div className="text-center">
                <img src="arrow.svg" alt="arrowicon" />
              </div>
              <div></div>
              <div className="text-black">{flight.origin || "JKT"}</div>
              <div className="text-sm text-center">Direct</div>
              <div className="text-black">{flight.destination || "MLB"}</div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="hidden 2xs:block me-6 lg:me-10 "
            src="tas.svg"
            alt="iconticket"
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="md:text-[16px] text-sm text-purple-600 mt-4 md:mt-7 mb-1">
            {formatPrice(flight.price)}
          </div>
          <button
            className=" text-sm md:w-[100px] md:h-[32px] w-[70px] h-[20px] mr-2 px-4 py-2 bg-purple-600 text-white rounded mb-1 hover:bg-purple-700"
            style={{
              borderRadius: "12px",
              backgroundColor: "#4B1979",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s ease",
            }}
            onClick={handleSelect}
          >
            Pilih
          </button>
        </div>
      </div>
      <button
        className="focus:outline-none flex items-center justify-center absolute top-2 right-2 w-5 h-5 border border-gray-400 rounded-full bg-transparent"
        onClick={toggleAccordion}
      >
        {isOpen ? (
          <FaChevronUp color="rgba(128, 128, 128, 0.7)" size={16} />
        ) : (
          <FaChevronDown color="rgba(128, 128, 128, 0.7)" size={16} />
        )}
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } px-4 py-3 bg-gray-50 transition-all duration-500 rounded-b-lg border-t border-gray-300`}
      >
        <div className="mb-2">
          <div
            className="text-sm text-gray-500 font-semibold"
            style={{ color: "#7126B5" }}
          >
            Detail Penerbangan
          </div>
          <div className="text-sm flex justify-between text-black">
            <div>
              <strong>{flight.departure_time.slice(0, -3)}</strong>
            </div>
            <div className="font-semibold" style={{ color: "#A06ECE" }}>
              Keberangkatan
            </div>
          </div>
          <div className="text-sm">{flight.departure_date}</div>
          <div className="text-sm">{flight.departure_airport_name}</div>
        </div>
        <div>
          <hr className="my-1 border-gray-300" />
        </div>
        <div className="text-black text-sm mb-2">
          <div className="mb-0 p-0">
            <strong>
              {flight.airline_name} - {flight.seat_class}
            </strong>
          </div>
          <div className="mt-0 pt-0">
            <strong>{flight.flight_code}</strong>
          </div>
        </div>
        <div className="mb-2 flex items-center">
          <img src="logoplane.svg" alt="logo" className="h-6 mr-2" />
          <div className="flex flex-col ml-2">
            <div className="text-sm text-gray-500" style={{ color: "black" }}>
              <strong>Informasi</strong>
            </div>
            <div className="text-sm">Baggage: {flight.baggage} kg</div>
            <div className="text-sm">
              Cabin Baggage: {flight.cabinBaggage} kg
            </div>
            <div className="text-sm">
              In Flight Entertainment: {flight.entertainment ? "Yes" : "No"}
            </div>
          </div>
        </div>
        <div>
          <hr className="my-1 border-gray-300" />
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-black">
            <div className="text-sm">
              <strong>{flight.arrivalTime}</strong>
            </div>
            <div className="text-sm font-semibold" style={{ color: "#A06ECE" }}>
              Kedatangan
            </div>
          </div>
          <div className="text-sm">{flight.arrivalDate}</div>
          <div className="text-sm">{flight.destinationAirport}</div>
        </div>
      </div>
    </div>
  );
};

export default AccordionTicket;
