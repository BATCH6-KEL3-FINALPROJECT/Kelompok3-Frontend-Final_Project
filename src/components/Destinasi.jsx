import React, { useEffect, useRef, useState } from "react";
import DestinasiFavoritBtn from "./DestinasiFavoritBtn";
import DestinasiCard from "./DestinasiCard";
import InputSearch from "./InputSearch";

const Destinasi = ({ favorite }) => {
  const [selected, setSelected] = useState("Semua");
  const [searchInput, setSearchInput] = useState("");
  const [showDestinations, setShowDestinations] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);
  const destinationsRef = useRef(null);

  const destinations = {
    Semua: favorite,
    Asia: favorite.filter((dest) => dest.continent === "Asia"),
    Amerika: favorite.filter((dest) => dest.continent === "America"),
    Australia: favorite.filter((dest) => dest.continent === "Australia"),
    Eropa: favorite.filter((dest) => dest.continent === "Europe"),
    Afrika: favorite.filter((dest) => dest.continent === "Africa"),
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

    if (input) {
      setFilteredDestinations(
        destinations[selected].filter((city) =>
          city.to.toLowerCase().includes(input.toLowerCase())
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
      filteredDestinations.filter((city) => city.to !== item)
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
    setDisableButtons(true);
    setTimeout(() => {
      if (favorite.length > 0) {
        setLoading(false);
        setFilteredDestinations(destinations[selected]);
      } else {
        setLoading(true);
        setFilteredDestinations([]);
      }
      setDisableButtons(false);
    }, 1000);
  }, [favorite, selected]);

  const renderSkeletonCards = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-details">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="content max-w-[1098px] w-full mx-auto -mt-11 relative pt-1 bg-none rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 px-5 mt-10">
        Destinasi Favorit
      </h2>
      <div className="flex flex-col items-center">
        <div className="flex w-full overflow-x-auto overflow-y-hidden gap-5 mx-auto p-2">
          {["Semua", "Asia", "Amerika", "Australia", "Eropa", "Afrika"].map(
            (text) => (
              <DestinasiFavoritBtn
                key={text}
                text={text}
                selected={selected === text}
                onClick={() => handleClick(text)}
                disabled={disableButtons}
              />
            )
          )}
        </div>
      </div>
      <div className="w-11/12 md:container mx-auto p-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {renderSkeletonCards()}
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="flex justify-center flex-col py-10">
            <div className="flex justify-center">
              <img src="/search_empty.png" alt="Pencarian Tidak Ditemukan" />
            </div>
            <h1 className="text-black font-medium flex flex-col text-center">
              <p>Maaf, pencarian Anda tidak ditemukan</p>
              <span className="text-[#7126B5]">
                Coba cari perjalanan lainnya!
              </span>
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredDestinations.map((dest) => (
              <DestinasiCard
                key={`${dest.from}-${dest.to}`}
                asal={dest.from}
                tujuan={dest.to}
                roundTrips={dest.isRoundTrip}
                maskapai={dest.airline}
                seatClass={dest.seatClass}
                image={dest.imageUrl}
                departureDate={dest.departureDate}
                returnDate={dest.returnDate}
                awalTanggal={new Date(dest.departureDate).getDate()}
                akhirTanggal={new Date(dest.returnDate).getDate()}
                bulan={new Date(dest.departureDate).toLocaleString("default", {
                  month: "long",
                })}
                tahun={new Date(dest.departureDate).getFullYear()}
                harga={dest.price}
                discount={dest.discount}
                passengersAdult={dest.passengersAdult}
                passengersChild={dest.passengersChild}
                passengersBaby={dest.passengersBaby}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinasi;
