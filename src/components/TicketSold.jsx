// src/components/TicketSoldOut.js
import React from "react";
// import soldOutImage from "./path/to/your/image.png"; // Update the path to your image

const TicketSoldOut = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src="ticketsold.svg" alt="Sold Out" className="w-64 h-64" />
      <p className="text-lg font-semibold mt-4">Maaf, Tiket terjual habis!</p>
      <p className="text-purple-600 mt-2">Coba cari perjalanan lainnya!</p>
    </div>
  );
};

export default TicketSoldOut;
