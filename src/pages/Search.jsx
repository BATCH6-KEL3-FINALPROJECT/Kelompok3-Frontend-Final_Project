import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Filter from "../components/Filter";
import AccordionTicket from "../components/AccordionTicket";
import ModalFilter from "../components/ModalFilter";
import EditSearch from "../components/EditSearch";
import ButtonSearchingDay from "../components/ButtonSearchingDay";
import { LuArrowUpDown } from "react-icons/lu";
import { motion } from "framer-motion";
import axios from "axios";
import Topnav from "../components/Topnav";

const Search = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [navigate]);

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
    <>
      <Topnav isLogin={isLogin} isSearch={true} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col mt-28 gap-5 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-xl font-bold"
        >
          Pilih Penerbangan
        </motion.h1>
        <div className="flex justify-between items-center gap-2 mx-4 relative">
          <EditSearch
            origin="JKT"
            destination="MLB"
            passengers={2}
            classType="Economy"
            onEdit={() => console.log("Edit search clicked")}
          />
          <motion.button
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            viewport={{ once: true }}
            className="text-white gap-5 p-2 md:p-3 px-5 rounded-lg bg-[#73CA5C]"
          >
            Ubah Pencarian
          </motion.button>
        </div>
        <div className="flex justify-between mx-4 overflow-x-auto">
          {days.map(({ day, date }, index) => (
            <ButtonSearchingDay
              key={index}
              day={day}
              date={date}
              onClick={() => handleClick(date)}
              isSelected={selectedDate === date}
            />
          ))}
        </div>

        {/*  Filter Button dan Modal */}
        <div className="flex justify-end">
          <button
            className="flex justify-center items-center gap-2 px-3 py-1 border border-[#A06ECE] text-[#7126B5] rounded-full mx-4"
            onClick={handleOpenModal}
          >
            <span>
              <LuArrowUpDown className="text-lg" />
            </span>
            <span className="text-base">{getButtonText()}</span>
          </button>
        </div>
        <ModalFilter
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedFilter={temporaryFilter}
          onSelectFilter={handleSelectFilter}
          onApplyFilter={handleApplyFilter}
        />

        <div className="flex flex-col md:flex-row gap-5 mx-4">
          <div className="flex-col gap-4 font-medium none hidden md:flex text-base md:w-1/4">
            <h1 className="font-medium text-base">Filter</h1>
            <Filter />
          </div>
          <div className="flex-grow">
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
    </>
  );
};

export default Search;
