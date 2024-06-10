import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Filter from "../components/Filter";
import AccordionTicket from "../components/AccordionTicket";
import ModalFilter from "../components/ModalFilter";
import EditSearch from "../components/EditSearch";
import ButtonSearchingDay from "../components/ButtonSearchingDay";
import Pagination from "../components/Pagination";
import { LuArrowUpDown } from "react-icons/lu";
import { motion } from "framer-motion";
import Topnav from "../components/Topnav";
import useSend from "../hooks/useSend";

const Search = () => {
  const { loading, sendData } = useSend();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [dataFlight, setDataFlight] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [ticketSearch, setTicketSearch] = useState({
    departure_city: searchParams.get("departure_city"),
    arrival_city: searchParams.get("arrival_city"),
    penumpang: searchParams.get("penumpang"),
    seat_class: searchParams.get("seat_class"),
    departure_date: searchParams.get("departure_date"),
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  const fetchData = async () => {
    const response = await sendData(
      `/api/v1/flight?seat_class=${searchParams.get(
        "seat_class"
      )}&departure_city=${searchParams.get(
        "departure_city"
      )}&arrival_city=${searchParams.get(
        "arrival_city"
      )}&departure_date=${searchParams.get(
        "departure_date"
      )}&limit=5&page=${currentPage}`,
      "GET",
      null,
      null,
      true
    );
    if (response.statusCode === 200) {
      setDataFlight(response.data.data.flights);
      setPagination(response.data.data.pagination);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams, currentPage]);

  useEffect(() => {
    if (dataFlight && pagination) {
      setTotalPages(pagination.totalPages);
    }
  }, [dataFlight]);

  useEffect(() => {
    const checkToken = cookies.get("token");
    setIsLogin(!!checkToken);

    if (searchParams.size === 0) {
      navigate("/");
    }
  }, [navigate, searchParams, cookies]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const [selectedDate, setSelectedDate] = useState("02/03/2023");

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
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col mt-28 gap-5 overflow-hidden pb-10">
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
            origin={ticketSearch.departure_city}
            destination={ticketSearch.arrival_city}
            passengers={ticketSearch.penumpang}
            classType={ticketSearch.seat_class}
            onEdit={() => console.log("Edit search clicked")}
          />
          <motion.button
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            viewport={{ once: true }}
            onClick={() => navigate("/")}
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

        {dataFlight.length !== 0 ? (
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
        ) : (
          ""
        )}

        <ModalFilter
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedFilter={temporaryFilter}
          onSelectFilter={handleSelectFilter}
          onApplyFilter={handleApplyFilter}
        />

        {dataFlight.length !== 0 ? (
          <div className="flex flex-col md:flex-row gap-5 mx-4">
            <div className="flex-col gap-4 font-medium none hidden md:flex text-base md:w-1/4">
              <h1 className="font-medium text-base">Filter</h1>
              <Filter />
            </div>
            <div className="flex-grow">
              {!loading &&
                dataFlight.length !== 0 &&
                dataFlight.map((flight, index) => (
                  <AccordionTicket
                    key={index}
                    flight={flight}
                    isOpen={openAccordion === index}
                    toggleAccordion={() => toggleAccordion(index)}
                  />
                ))}
              {!loading && dataFlight.length !== 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  handlePageClick={handlePageClick}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center pt-20">
            <img
              src="/skypass_logo.png"
              alt=""
              className="w-full h-40 object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
