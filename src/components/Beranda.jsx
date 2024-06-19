import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputComponent from "./InputComponent";
import DatePickerComponent from "./DatePicker";
import SliderComponent from "./SliderComponent";
import Passenger from "./Passenger";
import SeatClass from "./SeatClass";
import Destinasi from "./Destinasi";

function Beranda({ airport }) {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [activeInput, setActiveInput] = useState(null);
  const [isRotated, setIsRotated] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 0,
    child: 0,
    infant: 0,
  });
  const [seatClass, setSeatClass] = useState("Economy");
  const [sliderChecked, setSliderChecked] = useState(false);
  const navigate = useNavigate();

  const handleSeatClassChange = (event) => {
    setSeatClass(event.target.value);
  };

  const handleSwitchCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    setIsRotated(!isRotated);
  };

  const handleSliderChange = () => {
    setSliderChecked(!sliderChecked);
    if (!sliderChecked) {
      setReturnDate(null); // Reset return date if slider is unchecked
    }
  };

  const formatToBackend = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
  };

  const validateForm = () => {
    if (!fromCity) {
      toast.error("Kota keberangkatan harus diisi.");
      return false;
    }
    if (!toCity) {
      toast.error("Kota tujuan harus diisi.");
      return false;
    }
    if (fromCity === toCity) {
      toast.error("Kota keberangkatan dan tujuan tidak boleh sama.");
      return false;
    }
    if (!departureDate) {
      toast.error("Tanggal keberangkatan harus diisi.");
      return false;
    }
    if (sliderChecked && !returnDate) {
      toast.error("Tanggal kembali harus diisi.");
      return false;
    }
    if (
      passengerCounts.adult + passengerCounts.child + passengerCounts.infant ===
      0
    ) {
      toast.error("Jumlah penumpang harus diisi.");
      return false;
    }
    return true;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const prices = {
      Economy: 4950000,
      "Premium Economy": 7550000,
      Business: 29220000,
      "First Class": 87620000,
    };

    const fromCityName = fromCity.split(" (")[0];
    const toCityName = toCity.split(" (")[0];

    const searchData = {
      fromCity: fromCityName,
      toCity: toCityName,
      departureDate: formatToBackend(departureDate),
      returnDate: sliderChecked ? formatToBackend(returnDate) : null,
      passengerCounts,
      seatClass,
    };

    const penumpang = `${passengerCounts.adult}.${passengerCounts.child}.${passengerCounts.infant}`;

    navigate(
      `/search?departure_city=${searchData.fromCity}&arrival_city=${
        searchData.toCity
      }&penumpang=${penumpang}&seat_class=${seatClass}&departure_date=${formatToBackend(
        departureDate
      )}${sliderChecked ? `&return_date=${formatToBackend(returnDate)}` : ""}`
    );
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
                className="w-full md:w-full md:max-w-[1213px] h-40 md:h-[232px] md:top-[116px] md:left-[128px] border-r-20 rounded-r-20"
                style={{ borderRadius: "20px", maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
        {/* End Banner */}

        {/* Search */}
        <div className="content max-w-[1098px] w-full mx-auto -mt-12 relative z-20 pt-6 bg-white rounded-xl shadow-md">
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
                <div className="relative font-bold w-full md:w-[340px]">
                  <InputComponent
                    id="from"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="Please select a location ..."
                    airportOptions={airport}
                    activeInput={activeInput}
                    setActiveInput={setActiveInput}
                    readOnly={true}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              {/* Button Switch */}
              <div className="flex justify-center items-start">
                <button
                  type="button"
                  onClick={handleSwitchCities}
                  className={`text-gray-600 font-semibold hover:text-gray-800 focus:outline-none transition-transform duration-5000 ${
                    isRotated ? "rotate-180" : "-rotate-180"
                  }`}
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
                    id="to"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="Please select a location ..."
                    airportOptions={airport}
                    activeInput={activeInput}
                    setActiveInput={setActiveInput}
                    readOnly={true}
                    style={{ cursor: "pointer" }}
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
                      onChange={handleDepartureDateChange}
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
                      onChange={handleReturnDateChange}
                      disabled={!sliderChecked}
                      departureDate={departureDate}
                      isReturn={true}
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

            <button
              className="bg-[#7126B5] hover:bg-[#7126B5] text-white font-semibold py-3 rounded-b-xl w-full flex"
              type="submit"
            >
              <div className="w-full">Cari Penerbangan</div>
            </button>
          </form>
        </div>
        <div className="mt-4">
          {" "}
          <Destinasi />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Beranda;
