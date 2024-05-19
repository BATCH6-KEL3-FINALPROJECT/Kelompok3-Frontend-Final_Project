import React, { useState } from "react";
import DestinasiFavoritBtn from "../components/DestinasiFavoritBtn";
import DestinasiCard from "../components/DestinasiCard";

const Test = () => {
  const [selected, setSelected] = useState("Semua");

  const handleClick = (text) => {
    setSelected(text);
  };

  return (
    <>
      <div className="flex gap-4 my-4">
        {["Semua", "Asia", "Amerika", "Australia", "Eropa", "Afrika"].map(
          (text) => (
            <DestinasiFavoritBtn
              key={text}
              text={text}
              selected={selected === text}
              onClick={() => handleClick(text)}
            />
          )
        )}
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <DestinasiCard
            asal="Jakarta"
            tujuan="Bangkok"
            maskapai="AirAsia"
            awalTanggal="20"
            akhirTanggal="30"
            bulan="Maret"
            tahun="2023"
            harga="950.000"
            isLimited={true}
          />
          <DestinasiCard
            asal="Surabaya"
            tujuan="Singapura"
            maskapai="Garuda Indonesia"
            awalTanggal="15"
            akhirTanggal="25"
            bulan="April"
            tahun="2023"
            harga="1.200.000"
            isLimited={true}
          />
          <DestinasiCard
            asal="Bali"
            tujuan="Sydney"
            maskapai="Qantas"
            awalTanggal="10"
            akhirTanggal="20"
            bulan="Mei"
            tahun="2023"
            harga="5.000.000"
            isLimited={true}
          />
          <DestinasiCard
            asal="Medan"
            tujuan="Tokyo"
            maskapai="Japan Airlines"
            awalTanggal="5"
            akhirTanggal="15"
            bulan="Juni"
            tahun="2023"
            harga="7.500.000"
            isLimited={true}
          />
          <DestinasiCard
            asal="Makassar"
            tujuan="Seoul"
            maskapai="Korean Air"
            awalTanggal="1"
            akhirTanggal="10"
            bulan="Juli"
            tahun="2023"
            harga="6.000.000"
            isLimited={true}
          />
        </div>
      </div>
    </>
  );
};

export default Test;
