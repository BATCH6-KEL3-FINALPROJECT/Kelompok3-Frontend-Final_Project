import React from "react";

const RiwayatCard = ({ ticket }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="border-2 p-4 border-[#7126B5BF] rounded-xl shadow-md mb-4">
      <p className="bg-[#73CA5C] text-white px-3 p-1 rounded-full">
        {ticket.ticket_status.charAt(0).toUpperCase() +
          ticket.ticket_status.slice(1)}
      </p>
      <div className="mt-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">Booking Code:</h3>
          <p className="text-gray-700">{ticket.booking_id}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Ticket Code:</h3>
            <p className="text-gray-700">{ticket.ticket_code}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Passenger:</h3>
            <p className="text-gray-700">{ticket.passenger_name}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Flight:</h3>
            <p className="text-gray-700">{ticket.flight_id}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Seat Number:</h3>
            <p className="text-gray-700">{ticket.seat_number}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Terminal:</h3>
            <p className="text-gray-700">{ticket.TERMINAL}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Status:</h3>
            <p className="text-gray-700">{ticket.ticket_status}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Created At:</h3>
            <p className="text-gray-700">{formatDate(ticket.createdAt)}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Updated At:</h3>
            <p className="text-gray-700">{formatDate(ticket.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatCard;
