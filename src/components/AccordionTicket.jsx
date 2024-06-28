import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const AccordionTicket = ({
  index,
  flight,
  setIsVerified,
  isOpen,
  toggleAccordion,
  handleSelect,
  isLogin,
}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSelectFlight = async (event) => {
    event.preventDefault();
    try {
      const checkToken = cookies.get("token");
      if (checkToken && checkToken !== "undefined") {
        const decoded = jwtDecode(checkToken);
        if (decoded.isVerified) {
          setIsVerified(true);
          handleSelect(flight);
        } else {
          setIsVerified(false);
        }
      }
    } catch (err) {
      if (err.statusCode === 500) {
        navigate("/error");
      } else {
        console.log(err);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const [depHours, depMinutes] = departureTime.split(":").map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number);

    const depDate = new Date(1970, 0, 1, depHours, depMinutes);
    const arrDate = new Date(1970, 0, 1, arrHours, arrMinutes);

    if (arrDate < depDate) {
      arrDate.setDate(arrDate.getDate() + 1);
    }

    const durationMs = arrDate - depDate;
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor(
      (durationMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${durationHours}h ${durationMinutes}m`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatPlaneCode = (planeCode) => {
    const airlineCode = planeCode.slice(0, 3);
    const flightNumber = planeCode.slice(3);
    return `${airlineCode} - ${flightNumber}`;
  };

  const flightDetails = flight.flight_description;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.25,
        delay: index * 0.25,
      }}
      viewport={{ once: true }}
      className="p-3 shadow-md border-2 bg-white rounded-lg mb-4 transition-all duration-500 relative hover:border-[#7126B580]/50"
    >
      <div
        className={` text-left text-lg font-medium text-gray-900 bg-white flex items-center justify-between ${
          isOpen ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <div className="flex items-start">
          <img src="logoplane.svg" alt="Logo" className="h-6 mr-2" />
          <div className="flex flex-col ml-2 gap-5">
            <span className="text-sm font-medium text-[#151515]">
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
              <div className="text-sm text-center">
                {calculateDuration(flight.departure_time, flight.arrival_time)}
              </div>
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
              <div className="text-black">{flight.departure_iata_code}</div>
              <div className="text-sm text-center">Direct</div>
              <div className="text-black">{flight.arrival_iata_code}</div>
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
          <div className="md:text-[16px] text-sm font-bold text-[#7126B5] mt-4 md:mt-7 mb-1">
            {formatPrice(flight.price)}
          </div>
          <button
            className=" text-sm px-8 py-2 bg-[#7126B5] text-white rounded mb-1 hover:bg-[#7126B5]/80"
            style={{
              borderRadius: "12px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s ease",
            }}
            disabled={!isLogin}
            onClick={handleSelectFlight}
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
        } px-4 py-3 bg-gray-50 transition-all duration-500 rounded-b-lg border-t border-[#8A8A8A] mt-5`}
      >
        <div className="mb-4 mt-2">
          <div
            className="text-sm
           text-[#4B1979] mb-1 font-bold"
          >
            Detail Penerbangan
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-md flex justify-between items-center text-black">
              <strong className="text-base">
                {flight.departure_time.slice(0, -3)}
              </strong>
              <div className="font-bold text-[#A06ECE] text-xs">
                Keberangkatan
              </div>
            </div>
            <div className="text-sm font-normal">
              {formatDate(flight.departure_date)}
            </div>
            <div className="text-sm font-medium">
              {flight.departure_airport_name}
            </div>
          </div>
        </div>
        <div>
          <hr className="my-1 border-[#8A8A8A] w-2/3 mx-auto " />
        </div>
        <div className="text-black text-sm mb-2 mt-3">
          <div className="mb-0 p-0">
            <strong>
              {flight.airline_name} - {flight.seat_class}
            </strong>
          </div>
          <div className="mt-0 pt-0">
            <strong>{formatPlaneCode(flight.flight_code)}</strong>
          </div>
        </div>
        <div className="mb-2 flex">
          <img src="logoplane.svg" alt="logo" className="h-6 mr-2" />
          <div className="flex flex-col ml-2">
            <div className="text-sm text-gray-500" style={{ color: "black" }}>
              <strong>Informasi:</strong>
              {flightDetails.details.map((detail) => (
                <div key={detail.id} className="text-sm">
                  {detail.description}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <hr className="my-1 border-[#8A8A8A] w-2/3 mx-auto " />
        </div>
        <div className="text-[#4B1979] text-sm mb-4 mt-3">
          <div className="mb-4 p-0">
            <strong>Ticket Price</strong>
          </div>
          <div className="flex justify-between text-black mx-5">
            <div className="flex flex-col justify-center items-center">
              <img src="/adult.svg" alt="Adult Icon" />
              <h1 className="mt-[-15px] font-bold">
                {formatPrice(flight.price)}
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="/childern.svg" alt="Infant Icon" />
              <h1 className="mt-[-15px] font-bold">
                {formatPrice(flight.price_for_child)}
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="/baby.svg" alt="Baby Icon" />
              <h1 className="mt-[-15px] font-bold">
                {formatPrice(flight.price_for_infant)}
              </h1>
            </div>
          </div>
        </div>
        <div>
          <hr className="my-1 border-[#8A8A8A] w-2/3 mx-auto " />
        </div>
        <div className="mb-2 mt-4 flex justify-between items-center">
          <div className=" text-black">
            <div className="text-sm font-bold">
              {flight.arrival_time.slice(0, -3)}
            </div>
            <div className="text-sm">{formatDate(flight.arrival_date)}</div>
            <div className="text-sm">{flight.arrival_airport_name}</div>
          </div>
          <div className="text-xs font-semibold" style={{ color: "#A06ECE" }}>
            Kedatangan
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccordionTicket;
