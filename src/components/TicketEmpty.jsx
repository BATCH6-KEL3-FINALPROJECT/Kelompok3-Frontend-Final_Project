import React from "react";

const TicketEmpty = () => {
  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center">
        <img src="/search_empty.png" alt="Pencarian Tidak Ditemukan" />
      </div>

      <h1 className="text-black font-medium flex flex-col text-center">
        <p>Maaf, pencarian Anda tidak ditemukan</p>
        <span className="text-[#7126B5]">Coba cari perjalanan lainnya!</span>
      </h1>
    </div>
  );
};

export default TicketEmpty;
