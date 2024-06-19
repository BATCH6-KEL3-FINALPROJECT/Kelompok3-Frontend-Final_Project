import React from "react";

const RiwayatCard = ({ ticket, selected, onClick }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "issued":
        return "bg-[#73CA5C] text-white";
      case "unpaid":
        return "bg-[#FF0000] text-white";
      case "cancelled":
        return "bg-[#8A8A8A] text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div
      className={`p-4 rounded-xl shadow-md mb-4 cursor-pointer ${
        selected ? "border-2 border-[#7126B5BF]" : "border-2 border-gray-300"
      }`}
      onClick={onClick}
    >
      <div
        className={`${getStatusStyle(
          ticket.ticket_status
        )} px-3 py-1 rounded-full inline-block mb-1`}
      >
        {ticket.ticket_status.charAt(0).toUpperCase() +
          ticket.ticket_status.slice(1)}
      </div>
      <div className="flex justify-between items-center mb-1">
        <div className="text-center">
          <h3 className="text-md font-bold text-gray-900">
            <span className="inline-block">
              <img src="location.svg" alt="location" />
            </span>{" "}
            Jakarta
          </h3>
          <p className="text-gray-700 text-sm">5 Maret 2023</p>
          <p className="text-gray-700 text-sm">19:10</p>
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-sm">4h 0m</p>
          <p>
            <img
              src="arrow.svg"
              className="w-[120px] md:w-[250px]"
              alt="ARROW ICON"
            />
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-md font-bold text-gray-900">
            <span className="inline-block">
              <img src="location.svg" alt="location" />
            </span>{" "}
            Melbourne
          </h3>
          <p className="text-gray-700 text-sm">5 Maret 2023</p>
          <p className="text-gray-700 text-sm">21:10</p>
        </div>
      </div>
      <hr className="border-t-2 border-gray-200 mb-1" />
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-md font-bold text-gray-900 text-md">
            Booking Code:
          </h3>
          <p className="text-gray-700 text-sm">{ticket.booking_id}</p>
        </div>
        <div>
          <h3 className="text-md font-bold text-gray-900">Class:</h3>
          <p className="text-gray-700 text-sm pe-3 md:pe-0">Economy</p>
        </div>
        <div className="text-right">
          <h3 className="text-md font-bold text-[#A06ECE] ">IDR 9.850.000</h3>
        </div>
      </div>
    </div>
  );
};

export default RiwayatCard;
