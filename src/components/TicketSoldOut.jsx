import React from "react";

const TicketSoldOut = () => {
  return (
    <div className="flex justify-center gap-5 flex-col min-h-[50vh]">
      <div className="flex justify-center">
        <img src="/search_tiket_habis.png" alt="Pencarian Tidak Ditemukan" />
      </div>
      <h1 className="text-black font-medium flex flex-col text-center">
        <p>Maaf, Tiket terjual habis!</p>
        <span className="text-[#7126B5]">Coba cari perjalanan lainnya!</span>
      </h1>
    </div>
  );
};

export default TicketSoldOut;
