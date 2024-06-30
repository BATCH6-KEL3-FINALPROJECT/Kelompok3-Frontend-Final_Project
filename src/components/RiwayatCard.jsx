import React from "react";
import { motion } from "framer-motion";

const RiwayatCard = ({ key, booking, selected, onClick }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };
  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(`1970-01-01T${timeString}Z`).toLocaleTimeString(
      "id-ID",
      options
    );
  };

  const getStatusStyle = (status) => {
    if (!status) return "bg-gray-200 text-gray-700";
    switch (status.toLowerCase()) {
      case "booked":
        return "bg-[#73CA5C] text-white";
      case "pending":
        return "bg-[#FF0000] text-white";
      case "cancelled":
        return "bg-[#8A8A8A] text-white";
      case "confirmed":
        return "bg-[#7126B5] text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -75 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.25,
        delay: selected * 0.25,
      }}
      viewport={{ once: true }}
    >
      {" "}
      <div
        className={`p-4 rounded-xl shadow-md mb-4 cursor-pointer ${
          selected ? "border-2 border-[#7126B5BF]" : "border-2 border-gray-300"
        }`}
        onClick={onClick}
      >
        <div
          className={`${getStatusStyle(
            booking.status
          )} px-3 py-1 rounded-full inline-block mb-1`}
        >
          {booking.status
            ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
            : "Status Tidak Tersedia"}
        </div>
        <div className="flex justify-between items-center mb-1">
          <div className="text-center">
            <h3 className="text-md font-bold text-gray-900">
              <span className="inline-block">
                <img src="location.svg" alt="location" />
              </span>{" "}
              {booking.Flight.departingAirport.city}
            </h3>
            <p className="text-gray-700 text-sm">
              {formatDate(booking.Flight.departure_date)}
            </p>
            <p className="text-gray-700 text-sm">
              {formatTime(booking.Flight.departure_time)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-700 text-sm">
              {Math.floor(booking.Flight.flight_duration / 60)}h{" "}
              {booking.Flight.flight_duration % 60}m
            </p>
            <p>
              <img
                src="arrow.svg"
                className="w-[120px] md:w-[200px]"
                alt="ARROW ICON"
              />
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-md font-bold text-gray-900">
              <span className="inline-block">
                <img src="location.svg" alt="location" />
              </span>{" "}
              {booking.Flight.arrivingAirport.city}
            </h3>
            <p className="text-gray-700 text-sm">
              {formatDate(booking.Flight.arrival_date)}
            </p>
            <p className="text-gray-700 text-sm">
              {formatTime(booking.Flight.arrival_time)}
            </p>
          </div>
        </div>
        <hr className="border-t-2 border-gray-200 mb-1" />
        <div className="flex justify-between items-center mb-1">
          <div>
            <h3 className="text-md font-bold text-gray-900">Kode Booking:</h3>
            <p className="text-gray-700 text-sm">{booking.booking_code}</p>
          </div>
          <div>
            <h3 className="text-md font-bold text-gray-900">Kelas:</h3>
            <p className="text-gray-700 text-sm">
              {booking.Tickets[0].Seat.seat_class}
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-md font-bold text-[#A06ECE] ">
              IDR {formatRupiah(booking.total_price)}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiwayatCard;
