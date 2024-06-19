import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { LuArrowUpDown } from "react-icons/lu";
import Topnav from "../components/Topnav";
import EditSearch from "../components/EditSearch";
import ButtonSearchingDay from "../components/ButtonSearchingDay";
import ModalFilter from "../components/ModalFilter";
import TicketSoldOut from "../components/TicketSoldOut";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import AccordionTicket from "../components/AccordionTicket";
import Pagination from "../components/Pagination";
import TicketEmpty from "../components/TicketEmpty";
import useSend from "../hooks/useSend";
import Cookies from "universal-cookie";

const Search = () => {
  const { loading, sendData } = useSend();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isSeatAvailable, setIsSeatAvailable] = useState(true);
  const [days, setDays] = useState([]);
  const [dataFlight, setDataFlight] = useState([]);
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("departure_date")
  );
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    setIsLogin(!!checkToken);

    if (
      searchParams.size === 0 ||
      !searchParams.get("departure_city") ||
      !searchParams.get("arrival_city") ||
      !searchParams.get("departure_date") ||
      !searchParams.get("penumpang")
    ) {
      navigate("/");
    }
  }, [navigate, searchParams, cookies]);

  const dewasa = searchParams.get("penumpang")
    ? searchParams.get("penumpang").split(".")[0]
    : "0";
  const anak = searchParams.get("penumpang")
    ? searchParams.get("penumpang").split(".")[1]
    : "0";
  const bayi = searchParams.get("penumpang")
    ? searchParams.get("penumpang").split(".")[2]
    : "0";
  const ticketSearch = {
    departure_city: searchParams.get("departure_city"),
    arrival_city: searchParams.get("arrival_city"),
    penumpang: parseInt(dewasa) + parseInt(anak) + parseInt(bayi),
    seat_class: searchParams.get("seat_class"),
    departure_date: searchParams.get("departure_date"),
    return_date: searchParams.get("return_date"),
  };

  const getDayName = (date) => {
    const dayNames = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return dayNames[new Date(date).getDay()];
  };

  const generateDays = (departureDate) => {
    const days = [];
    const currentDate = new Date(departureDate);
    for (let i = -3; i <= 3; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split("T")[0],
        day: getDayName(date),
      });
    }
    return days;
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleClick = (date) => {
    setSelectedDate(date);
    const params = new URLSearchParams(searchParams);
    params.set("departure_date", date);
    navigate(`?${params.toString()}`);
  };

  const fetchData = async () => {
    setDataFlight([]);
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelect = (flight) => {
    if (flight.seats_available > 0) {
      setIsSeatAvailable(true);
      console.log(flight.flight_id);
      navigate(
        `/checkout?flight_id=${flight.flight_id}&penumpang=${searchParams.get(
          "penumpang"
        )}&seat_class=${flight.seat_class}`
      );
    } else {
      setIsSeatAvailable(false);
    }
  };

  useEffect(() => {
    const departureDate =
      searchParams.get("departure_date") ||
      new Date().toISOString().split("T")[0];
    const generatedDays = generateDays(departureDate);
    setDays(generatedDays);
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [searchParams, currentPage, selectedDate]);

  useEffect(() => {
    if (dataFlight && pagination) {
      setTotalPages(pagination.totalPages);
    }
  }, [dataFlight]);

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

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

  const [isReturnFlight, setIsReturnFlight] = useState(false);

  const toggleReturnFlight = () => {
    setIsReturnFlight((prev) => !prev);
  };

  return (
    <>
      <Topnav isLogin={isLogin} isSearch={true} />
      {!isVerified && (
        <div className="bg-red-500 opacity-90 w-[100vw] fixed z-40 top-24 p-2 flex justify-between">
          <div
            className="w-4/5
           mx-auto flex justify-between items-center"
          >
            <h1 className="text-white font-bold">Akun Anda Belum Verified</h1>
            <Link to="/otp">
              <button className="bg-white px-4 py-1 rounded-xl font-semibold">
                Verified
              </button>
            </Link>
          </div>
        </div>
      )}

      <div
        className={`w-11/12 md:w-2/3 mx-auto flex flex-col ${
          !isVerified ? "mt-36" : "mt-28"
        } gap-5 overflow-hidden pb-10`}
      >
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-xl font-bold"
        >
          {!isSeatAvailable ? "Detail Penerbangan" : "Pilih Penerbangan"}
        </motion.h1>
        <div className="flex justify-between items-center gap-2 mx-4 relative">
          <EditSearch
            origin={ticketSearch.departure_city}
            destination={ticketSearch.arrival_city}
            passengers={ticketSearch.penumpang}
            classType={ticketSearch.seat_class}
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2,
            type: "spring",
            ease: "easeOut",
            delay: 0.75,
          }}
          className="flex justify-between mx-4 overflow-x-auto"
        >
          {days.map(({ day, date }, index) => (
            <ButtonSearchingDay
              key={index}
              day={day}
              date={formatDate(date)}
              onClick={() => handleClick(date)}
              isSelected={selectedDate === date}
            />
          ))}
        </motion.div>

        {isSeatAvailable && (
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            className="flex justify-end"
          >
            <button
              className="flex justify-center items-center gap-2 px-3 py-1 border border-[#A06ECE] text-[#7126B5] rounded-full mx-4"
              onClick={handleOpenModal}
            >
              <span>
                <LuArrowUpDown className="text-lg" />
              </span>
              <span className="text-base">{getButtonText()}</span>
            </button>
          </motion.div>
        )}

        <ModalFilter
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedFilter={temporaryFilter}
          onSelectFilter={handleSelectFilter}
          onApplyFilter={handleApplyFilter}
        />

        {!isSeatAvailable ? (
          <TicketSoldOut />
        ) : loading ? (
          <Loading loading={loading} />
        ) : (
          <div className="flex flex-col md:flex-row gap-5 mx-4">
            <motion.div
              initial={{ opacity: 0, x: -75 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="flex-col gap-4 font-medium none hidden md:flex text-base md:w-1/4"
            >
              <h1 className="font-medium text-base">Filter</h1>
              <Filter />
              {ticketSearch.return_date && (
                <div className="my-4 mx-4">
                  <h2 className="text-lg font-semibold mb-2">
                    Pesawat yang Anda Pilih
                  </h2>
                  <div className="flex flex-col gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-semibold">Perjalanan Berangkat</h3>
                      <p className="text-sm">
                        {ticketSearch.departure_city} -{" "}
                        {ticketSearch.arrival_city}
                      </p>
                      <p className="text-sm">
                        {formatDate(ticketSearch.departure_date)}
                      </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-semibold">Perjalanan Kembali</h3>
                      <p className="text-sm">
                        {ticketSearch.arrival_city} -{" "}
                        {ticketSearch.departure_city}
                      </p>
                      <p className="text-sm">
                        {formatDate(ticketSearch.return_date)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            <div className="flex-grow">
              {dataFlight.length !== 0 ? (
                <>
                  {dataFlight.map((flight, index) => (
                    <AccordionTicket
                      key={index}
                      index={index}
                      flight={flight}
                      setIsVerified={setIsVerified}
                      isOpen={openAccordion === index}
                      toggleAccordion={() => toggleAccordion(index)}
                      handleSelect={() => handleSelect(flight)}
                    />
                  ))}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    handlePageClick={handlePageClick}
                  />
                </>
              ) : (
                <TicketEmpty />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
