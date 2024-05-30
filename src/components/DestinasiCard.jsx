import React from "react";

const DestinasiCard = ({
  asal,
  tujuan,
  maskapai,
  awalTanggal,
  akhirTanggal,
  bulan,
  tahun,
  harga,
  isLimited,
}) => {
  return (
    <a
      href="/search"
      className="block bg-white shadow-2xl p-4 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
    >
      <img
        src="/Example_destinasi.svg"
        alt={tujuan}
        className="w-full object-cover"
      />
      <div className="py-4 mt-2">
        <h2 className="text-xs sm:text-sm font-medium mb-1">
          {asal} -{">"} {tujuan}
        </h2>
        <p className="mb-1 text-[#7126B5] font-bold text-[10px] sm:text-xs">
          {maskapai}
        </p>
        <p className="mb-1 text-[10px] sm:text-xs">
          {awalTanggal} - {akhirTanggal} {bulan} {tahun}
        </p>
        <p className="text-xs sm:text-sm">
          Mulai dari{" "}
          <span className="text-[#FF0000] font-bold">IDR {harga}</span>
        </p>
      </div>
    </a>
  );
};

export default DestinasiCard;
