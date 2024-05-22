import React, { useEffect, useRef, useState } from "react";
import DestinasiFavoritBtn from "../components/DestinasiFavoritBtn";
import DestinasiCard from "../components/DestinasiCard";
import InputSearch from "./InputSearch";

const Test = () => {
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
    setFilteredDestinations(filteredDestinations.filter((city) => city !== item));
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
    <div className="content max-w-[1098px] w-full mx-auto -mt-12 relative pt-6 bg-none rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 px-5 mt-10 ml-3">
        Destinasi Favorit
      </h2>
      <div className="flex flex-col items-center">
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
        {showDestinations && (
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-96 flex items-center justify-center z-20"
            style={{ maxWidth: "600px" }}
          >
            <div
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg gap-2"
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
              }}
              ref={destinationsRef}
            >
              <div className="flex items-center mb-4">
                <InputSearch
                  placeholder="Masukan Kota atau Negara"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onReset={resetSearchInput}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Pencarian Terkini</span>
                <button
                  className="text-red-500 hover:text-red-600 font-semibold py-1 px-2 rounded"
                  onClick={deleteAllSearchItems}
                >
                  Hapus
                </button>
              </div>

              {filteredDestinations.map((city) => (
                <div
                  key={city}
                  className="border-b border-gray-300 py-2 flex justify-between items-center"
                  style={{ borderRadius: "20px" }}
                >
                  <span className="ml-4 font-semibold">{city}</span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded mr-4"
                    onClick={() => deleteSearchItem(city)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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

export default Test;
