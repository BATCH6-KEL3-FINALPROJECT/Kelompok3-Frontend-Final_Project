import React, { useState } from "react";
import InputComponent from "./InputComponent";
import DatePickerComponent from "./DatePicker";
import SliderComponent from "./SliderComponent";
import Passenger from "./Passenger";
import SeatClass from "./SeatClass";
import Test from "./Test";

function Beranda() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 0,
    child: 0,
    infant: 0,
  });
  const [seatClass, setSeatClass] = useState("Economy");
  const [sliderChecked, setSliderChecked] = useState(false);

  const handleSeatClassChange = (event) => {
    setSeatClass(event.target.value);
  };

  const handleSwitchCities = () => {
    const tempCity = toCity;
    setToCity(fromCity);
    setFromCity(tempCity);
  };

  const handleSliderChange = () => {
    setSliderChecked(!sliderChecked);
    if (!sliderChecked) {
      setReturnDate(""); // Reset return date if slider is unchecked
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const prices = {
      Economy: 4950000,
      "Premium Economy": 7550000,
      Business: 29220000,
      "First Class": 87620000,
    };

    const totalAdultPrice = passengerCounts.adult * prices[seatClass];
    const totalChildPrice = passengerCounts.child * (prices[seatClass] * 0.75); // anak anak hanya membanyar 75% dari harga dewasa
    const totalInfantPrice = passengerCounts.infant * (prices[seatClass] * 0.5); // balita hanya membanyar 50% dari harga dewasa

    const totalPrice = totalAdultPrice + totalChildPrice + totalInfantPrice;

    const searchData = {
      fromCity,
      toCity,
      departureDate,
      returnDate: sliderChecked ? returnDate : null,
      passengerCounts,
      seatClass,
      totalPrice,
    };

    console.log("Mencari penerbangan dengan kriteria:", searchData);

    // Implementasi API fetching disini
    // Misalnya menggunakan fetch atau axios:
    // fetch("API_URL", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(searchData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle the response data
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching data:", error);
    //   });
  };


  return (
    <div className="container px-4 md:px-8 mx-auto">
      {/* Banner */}
      <div className="flex justify-center items-center">
        <div className="relative mt-6 md:mt-15">
          <img
            src="left.png"
            alt="Left Image"
            className="absolute z-0 w-24 h-16 md:w-[236px] md:h-[150px] top-10 left-[-40px] md:left-[-150px] border-r-20 rounded-l-20"
            style={{ borderRadius: "20px 0px 0px 0px" }}
          />
          <div className="background-image relative z-10">
            <img
              src="img_banner.png"
              alt="Background"
              className="w-full h-40 md:w-[1213px] md:h-[232px] md:top-[116px] md:left-[128px] border-r-20 rounded-r-20"
              style={{ borderRadius: "0px 20px 20px 0px" }}
            />
          </div>
          <img
            src="right.png"
            alt="Right Image"
            className="absolute z-0 w-24 h-16 md:w-[236px] md:h-[150px] top-10 right-[-40px] md:right-[-120px] border-r-20 rounded-l-20"
            style={{ borderRadius: "20px 0px 0px 0px" }}
          />
        </div>
      </div>
      {/* End Banner */}

      {/* Search */}
      <div className="content max-w-[1098px] w-full mx-auto -mt-12 relative z-20 pt-6 bg-white rounded-lg shadow-md">
        {/* Pilih Jadwal */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 px-8 ">
            Pilih Jadwal Penerbangan spesial di
            <span className="text-purple-600 bg-white px-2 py-1 rounded">
              Tiketku
            </span>
          </h2>
          {/* form */}
          <form className="grid grid-cols-1 gap-8 " onSubmit={handleSearch}>
            {/* fligh */}
            <div className="flex items-center justify-between px-8 flex-wrap">
              {/* flight From */}
              <div className="flex items-center gap-4">
                <img
                  src="plane.svg"
                  alt="From"
                  // className="w-10 h-10 object-cover rounded-full mr-2"
                />
                <label
                  htmlFor="from"
                  className="block text-xs font-semibold text-gray-600 mb-1 mr-2"
                >
                  From
                </label>
                <div className="relative w-full font-bold">
                  <InputComponent
                    label="From"
                    id="from"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="Jakarta (JKTA)"
                  />
                </div>
              </div>
              {/* Button Switch */}
              <button
                type="button"
                onClick={handleSwitchCities}
                className="mx-4 text-gray-600 font-semibold hover:text-gray-800 focus:outline-none"
              >
                <img src="return.png" alt="Switch" className="w-6 h-6" />
              </button>
              {/* Flight TO */}
              <div className="flex items-center gap-4">
                <img
                  src="plane.svg"
                  alt="To"
                  // className="w-10 h-10 object-cover rounded-full mr-2"
                />
                <label
                  htmlFor="to"
                  className="block text-xs font-semibold text-gray-600 mb-1 mr-2"
                >
                  To
                </label>
                <div className="relative w-full font-bold">
                  <InputComponent
                    type="text"
                    id="to"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="Melbourne (MLBA)"
                    className="appearance-none w-full text-gray-700 border-none rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* date */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:flex-row px-8 flex-wrap">
              {/* Depature */}
              <div className="flex items-center gap-4 flex-wrap">
                <img src="date1.svg" alt="From" />
                <label
                  htmlFor="from"
                  className="block text-xs font-semibold text-gray-600"
                >
                  Date
                </label>
                <div className="flex flex-col">
                  <label
                    htmlFor="departure"
                    className="block text-xs font-semibold text-gray-600 mb-3"
                  >
                    Departure
                  </label>
                  <DatePickerComponent
                    type="date"
                    id="departure"
                    value={departureDate}
                    onChange={(date) => setDepartureDate(date)}
                    className="w-36 h-10 border border-gray-300 rounded px-2 focus:outline-none"
                  />
                </div>
                {/* Return */}
                <div className="flex items-center">
                  <div className="flex flex-col ml-3">
                    <label
                      htmlFor="return"
                      className="block text-xs font-semibold text-gray-600 mb-3"
                    >
                      Return
                    </label>
                    <DatePickerComponent
                      id="return"
                      value={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      disabled={!sliderChecked} // input tanggal akan dinonaktifkan jika slider tidak aktif
                      className="w-36 h-10 border border-gray-300 rounded px-2 focus:outline-none"
                    />
                  </div>
                </div>
                {/* Slider */}
                <SliderComponent
                  checked={sliderChecked}
                  onChange={handleSliderChange}
                />
              </div>

              {/* Pasengers */}
              <Passenger onChange={setPassengerCounts} />

              {/* Seat Class */}
              <SeatClass
                seatClass={seatClass}
                handleSeatClassChange={handleSeatClassChange}
              />
            </div>
            {/* //button */}
            <button
              className="bg-[#7126B5] hover:bg-[#7126B5] text-white font-semibold py-3 rounded w-full "
              type="submit"
            >
              Cari Penerbangan
            </button>
          </form>
        </div>
      </div>
      <Test />
    </div>
  );
}

export default Beranda;
