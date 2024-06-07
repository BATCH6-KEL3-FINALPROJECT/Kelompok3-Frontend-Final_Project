import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InputComponent from "./InputComponent";
import DatePickerComponent from "./DatePicker";
import SliderComponent from "./SliderComponent";
import Passenger from "./Passenger";
import SeatClass from "./SeatClass";
import Destinasi from "./Destinasi";
import airportOptions from "../data/airports.json";
import { FaPerson } from "react-icons/fa6";

function Beranda() {
  const [searchParams] = useSearchParams();
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
  };

  return (
    <div className="relative mt-20">
      <div className="absolute top-10 mt-3 left-0 right-0 h-[150px] bg-[#7126B580] -z-10"></div>
      <div className="container px-4 md:px-8 mx-auto relative z-10">
        {/* Banner */}
        <div className="flex justify-center items-center">
          <div className="relative mt-6 md:mt-15">
            <div className="background-image relative z-10">
              <img
                src="img_banner.png"
                alt="Background"
                className="w-full h-40 md:w-[1213px] md:h-[232px] md:top-[116px] md:left-[128px] border-r-20 rounded-r-20"
                style={{ borderRadius: "0px 20px 20px 0px", width: "1350px" }}
              />
            </div>
          </div>
        </div>
        {/* End Banner */}

        {/* Search */}
        <div className="content max-w-[1098px] w-full mx-auto -mt-12 relative z-20 pt-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 px-8 ">
            Pilih Jadwal Penerbangan spesial di
            <span className="text-[#7126B5] bg-white px-2 py-1 rounded">
              SkyPass
            </span>
          </h2>
          {/* form */}
          <form
            className="grid grid-cols-1 gap-4 md:gap-8"
            onSubmit={handleSearch}
          >
            {/* fligh */}
            <div className="flex items-center justify-between px-8 flex-wrap">
              {/* flight From */}
              <div className="flex items-center gap-4 justify-start">
                <img src="plane.svg" alt="From" />
                <label
                  htmlFor="from"
                  className="block text-xs font-semibold text-gray-600 mb-1 mr-2"
                >
                  From
                </label>
                <div className="relative  font-bold w-full md:w-[340px]">
                  <InputComponent
                    id="from"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="Jakarta (JKTA)"
                    airportOptions={airportOptions}
                  />
                </div>
              </div>
              {/* Button Switch */}
              <div className="flex justify-center items-start">
                <button
                  type="button"
                  onClick={handleSwitchCities}
                  className="text-gray-600 font-semibold hover:text-gray-800 focus:outline-none"
                >
                  <img src="return.png" alt="Switch" className="w-8 h-8" />
                </button>
              </div>
              {/* Flight TO */}
              <div className="flex items-center gap-4 justify-end">
                <img src="plane.svg" alt="To" />
                <label
                  htmlFor="to"
                  className="block text-xs font-semibold text-gray-600 mb-1 mr-2"
                >
                  To
                </label>
                <div className="relative font-bold w-full md:w-[340px]">
                  <InputComponent
                    type="text"
                    id="to"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="Melbourne (MLBA)"
                    airportOptions={airportOptions}
                  />
                </div>
              </div>
            </div>

            {/* Slider */}
            <div className="mt-1 md:hidden flex items-center justify-between  px-8">
              {" "}
              <div>
                <p className="text-[#7126B5] text-sm">Round Trip</p>
              </div>
              <div>
                <SliderComponent
                  checked={sliderChecked}
                  onChange={handleSliderChange}
                />
              </div>
            </div>

            {/* date */}
            {/* <div className="flex items-center justify-between w-full sm:w-auto sm:flex-row px-8 flex-wrap"> */}
            {/* Depature */}
            <div className="flex items-center justify-between px-8 flex-wrap">
              {/* Date and Return */}
              <div className="flex md:flex-row justify-between w-full md:w-auto ">
                <div className="flex items-center gap-4">
                  <img
                    src="date1.svg"
                    alt="From"
                    className=" hidden md:block"
                  />
                  <label
                    htmlFor="from"
                    className=" hidden md:block text-xs font-semibold text-gray-600"
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
                </div>
                {/* Return */}
                <div className="flex items-center gap-4">
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
                      disabled={!sliderChecked}
                      className="w-36 h-10 border border-gray-300 rounded px-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="hidden md:block mt-3">
                {" "}
                <SliderComponent
                  checked={sliderChecked}
                  onChange={handleSliderChange}
                />
              </div>

              {/* <div className="ml-5 flex flex-row items-center gap-5">
                {" "}
                <img src="seat.svg" alt="Passengers" />
                <label className="block text-xs font-semibold text-gray-600">
                  To
                </label>
              </div> */}
              {/* Passengers and Seat Class */}
              <div className="flex md:items-center justify-between md:flex-wrap w-full md:w-auto">
                {/* Passengers */}
                <div className="flex items-center md:gap-4">
                  <Passenger onChange={setPassengerCounts} />
                </div>

                {/* Seat Class */}
                <div className="flex items-center md:gap-4">
                  <SeatClass
                    seatClass={seatClass}
                    handleSeatClassChange={handleSeatClassChange}
                  />
                </div>
              </div>
            </div>

            {/* </div> */}
            {/* //button */}
            <button
              className="bg-[#7126B5] hover:bg-[#7126B5] text-white font-semibold py-3 rounded w-full flex"
              type="submit"
            >
              <Link
                to="/search?departure_city=JKT&arrival_city=MLB&penumpang=2&seat_class=Economy"
                className="w-full"
              >
                Cari Penerbangan
              </Link>
            </button>
          </form>
        </div>
        <Destinasi />
      </div>
    </div>
  );
}

export default Beranda;
