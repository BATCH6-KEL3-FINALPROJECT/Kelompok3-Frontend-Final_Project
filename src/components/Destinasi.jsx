import React, { useEffect, useRef, useState } from "react";
import DestinasiFavoritBtn from "./DestinasiFavoritBtn";
import DestinasiCard from "./DestinasiCard";
import InputSearch from "./InputSearch";

const Destinasi = () => {
  const [selected, setSelected] = useState("Semua");
  const [searchInput, setSearchInput] = useState("");
  const [showDestinations, setShowDestinations] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const destinationsRef = useRef(null);

  const destinations = {
    Semua: [
      "Jakarta",
      "Surabaya",
      "Semarang",
      "Tokyo",
      "New York",
      "Sydney",
      "Paris",
      "Cape Town",
    ],
    Asia: ["Tokyo", "Seoul", "Bangkok", "Jakarta"],
    Amerika: ["New York", "Los Angeles", "Chicago", "Miami"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    Eropa: ["Paris", "London", "Berlin", "Rome"],
    Afrika: ["Cape Town", "Nairobi", "Cairo", "Lagos"],
  };

  const handleClick = (text) => {
    setSelected(text);
    setFilteredDestinations(destinations[text]);
    setShowDestinations(true);
  };

  const handleClickOutside = (event) => {
    if (
      destinationsRef.current &&
      !destinationsRef.current.contains(event.target)
    ) {
      setShowDestinations(false);
    }
  };

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);

    // Update filteredDestinations based on the search input
    if (input) {
      setFilteredDestinations(
        destinations[selected].filter((city) =>
          city.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setFilteredDestinations(destinations[selected]);
    }
  };

  const resetSearchInput = () => {
    setSearchInput("");
    setFilteredDestinations(destinations[selected]);
  };

  const deleteSearchItem = (item) => {
    setFilteredDestinations(
      filteredDestinations.filter((city) => city !== item)
    );
  };

  const deleteAllSearchItems = () => {
    setFilteredDestinations([]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFilteredDestinations(destinations[selected]);
  }, [selected]);

  return (
    <div className="content max-w-[1098px] w-full mx-auto -mt-11 relative pt-1 bg-none rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 px-5 mt-10">
        Destinasi Favorit
      </h2>
      <div className="flex flex-col items-center">
        {/* Destinasi favorit */}
        <div className="flex flex-wrap gap-5 mx-auto p-5 ml-3">
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
      </div>
      {/* Card Destinasin Favorite */}
      <div className="container mx-auto p-4 ml-3">
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
    </div>
  );
};

export default Destinasi;
