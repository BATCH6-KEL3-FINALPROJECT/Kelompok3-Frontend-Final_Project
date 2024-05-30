import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Filter from "../components/Filter";
import AccordionTicket from "../components/AccordionTicket";
import ModalFilter from "../components/ModalFilter";
import EditSearch from "../components/EditSearch";
import ButtonSearchingDay from "../components/ButtonSearchingDay";
import { LuArrowUpDown } from "react-icons/lu";

const Search = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = async (event) => {
    cookies.remove("token");
    setIsLoggedOut(true);
  };

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    if (isLoggedOut) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedOut, navigate]);

  const flightsDummy = [
    {
      airline: "Jet Air",
      class: "Economy",
      departureTime: "07:00",
      arrivalTime: "11:00",
      departureDate: "3 Maret 2023",
      arrivalDate: "3 Maret 2023",
      origin: "JKT",
      destination: "MLB",
      originAirport: "Soekarno Hatta - Terminal 1A Domestik",
      destinationAirport: "Melbourne International Airport",
      baggage: 20,
      cabinBaggage: 7,
      entertainment: true,
      price: "IDR 4.950.000",
    },
    {
      airline: "Jet Air",
      class: "Economy",
      departureTime: "08:00",
      arrivalTime: "12:00",
      departureDate: "3 Maret 2023",
      arrivalDate: "3 Maret 2023",
      origin: "JKT",
      destination: "MLB",
      originAirport: "Soekarno Hatta - Terminal 1A Domestik",
      destinationAirport: "Melbourne International Airport",
      baggage: 20,
      cabinBaggage: 7,
      entertainment: true,
      price: "IDR 5.950.000",
    },
    {
      airline: "Jet Air",
      class: "Economy",
      departureTime: "08:00",
      arrivalTime: "12:00",
      departureDate: "3 Maret 2023",
      arrivalDate: "3 Maret 2023",
      origin: "JKT",
      destination: "MLB",
      originAirport: "Soekarno Hatta - Terminal 1A Domestik",
      destinationAirport: "Melbourne International Airport",
      baggage: 20,
      cabinBaggage: 7,
      entertainment: true,
      price: "IDR 5.950.000",
    },
    {
      airline: "Jet Air",
      class: "Economy",
      departureTime: "08:00",
      arrivalTime: "12:00",
      departureDate: "3 Maret 2023",
      arrivalDate: "3 Maret 2023",
      origin: "JKT",
      destination: "MLB",
      originAirport: "Soekarno Hatta - Terminal 1A Domestik",
      destinationAirport: "Melbourne International Airport",
      baggage: 20,
      cabinBaggage: 7,
      entertainment: true,
      price: "IDR 5.950.000",
    },
    // Add more flight objects as needed
  ];

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  //   FILTER

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [temporaryFilter, setTemporaryFilter] = useState("");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/flights");
        setFlights(response.data);
        setFilteredFlights(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterFlights();
  }, [selectedFilter, flights]);

  const handleOpenModal = () => {
    setTemporaryFilter(selectedFilter);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectFilter = (filter) => {
    setTemporaryFilter(filter);
  };

  const handleApplyFilter = () => {
    setSelectedFilter(temporaryFilter);
    setIsModalOpen(false);
  };

  const filterFlights = () => {
    let sortedFlights = [...flights];
    switch (selectedFilter) {
      case "Harga - Termurah":
        sortedFlights.sort((a, b) => a.price - b.price);
        break;
      case "Durasi - Terpendek":
        sortedFlights.sort((a, b) => a.duration - b.duration);
        break;
      case "Keberangkatan - Paling Awal":
        sortedFlights.sort((a, b) => a.departure.localeCompare(b.departure));
        break;
      case "Keberangkatan - Paling Akhir":
        sortedFlights.sort((a, b) => b.departure.localeCompare(a.departure));
        break;
      case "Kedatangan - Paling Awal":
        sortedFlights.sort((a, b) => a.arrival.localeCompare(b.arrival));
        break;
      case "Kedatangan - Paling Akhir":
        sortedFlights.sort((a, b) => b.arrival.localeCompare(a.arrival));
        break;
      default:
        break;
    }
    setFilteredFlights(sortedFlights);
  };

  const getButtonText = () => {
    if (!selectedFilter) return "Others";
    const parts = selectedFilter.split(" - ");
    return parts.length > 1 ? parts[1] : parts[0];
  };
  //   Search data

  const [selectedDate, setSelectedDate] = useState("02/03/2023"); // State for selected day

  const handleClick = (date) => {
    setSelectedDate(date);
  };
  const days = [
    { day: "Selasa", date: "01/03/2023" },
    { day: "Rabu", date: "02/03/2023" },
    { day: "Kamis", date: "03/03/2023" },
    { day: "Jumat", date: "04/03/2023" },
    { day: "Sabtu", date: "05/03/2023" },
    { day: "Minggu", date: "06/03/2023" },
    { day: "Senin", date: "07/03/2023" },
    { day: "Selasa", date: "08/03/2023" },
  ];

  return (
    <div>
      <div>
        <Navbar isLogin={isLogin} />
      </div>
      <div>
        <div className=" mt-3 hidden md:block md:mt-10  md:ps-44 ">
          <h1 className="text-lg">
            <strong>Detail Penerbangan</strong>
          </h1>
        </div>
        <div className=" flex flex-col items-center">
          <EditSearch
            origin="JKT"
            destination="MLB"
            passengers={2}
            classType="Economy"
            onEdit={() => console.log("Edit search clicked")}
          />
          <div className="flex md:justify-center  w-screen md:w-auto overflow-scroll md:overflow-auto">
            {days.map(({ day, date }) => (
              <ButtonSearchingDay
                key={day}
                day={day}
                date={date}
                onClick={() => handleClick(date)}
                isSelected={selectedDate === date}
              />
            ))}
          </div>
        </div>

        {/*  Filter Button dan Modal */}
        <div className="flex ms-3 md:mt-8  mt-4 md:mb-2 md:justify-end me-36">
          <button
            className="flex justify-center items-center px-1 py-2 border border-purple-600 text-purple-600 rounded-full"
            style={{ width: "110px", height: " 35px" }}
            onClick={handleOpenModal}
          >
            <span className="ps-0 pe-1">
              <LuArrowUpDown />
            </span>
            <span className="text-sm">{getButtonText()}</span>
          </button>
          <ModalFilter
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            selectedFilter={temporaryFilter}
            onSelectFilter={handleSelectFilter}
            onApplyFilter={handleApplyFilter}
          />
        </div>

        <div className="flex flex-col md:flex-row h-screen">
          {/* Sidebar */}
          <div className="w-1/3 p-4 ms-3 mt-6 justify-end md:flex hidden ">
            <Filter></Filter>
          </div>

          {/* Flight List */}
          <div className="w-3/4 ps-2">
            {/* Flight Cards */}
            <div className=" mx-auto md:mt-10 mt-5 md:ms-16">
              {flightsDummy.map((flight, index) => (
                <AccordionTicket
                  key={index}
                  flight={flight}
                  isOpen={openAccordion === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
