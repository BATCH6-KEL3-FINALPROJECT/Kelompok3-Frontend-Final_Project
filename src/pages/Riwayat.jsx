import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdArrowRoundBack } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import Topnav from "../components/Topnav";
import useSend from "../hooks/useSend";
import { jwtDecode } from "jwt-decode";
import RiwayatCard from "../components/RiwayatCard";
import HistoryEmpty from "../components/HistoryEmpty";
import Loading from "../components/Loading";
import DetailHistory from "../components/DetailHistory";
import ModalDetailHistory from "../components/ModalDetailHistory";
import DatePickerModal from "../components/DatepickerHistory";
import BookingModal from "../components/ModalBookingCode";

const Riwayat = () => {
  const { loading, sendData } = useSend();
  const [isLogin, setIsLogin] = useState(true);
  const [dataRiwayat, setDataRiwayat] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const fetchData = async () => {
    try {
      const token = cookies.get("token");
      if (token) {
        const decoded = jwtDecode(token);
        setAccountId(decoded.id);
        const response = await sendData(
          `/api/v1/booking/history`,
          "GET",
          null,
          token
        );
        setDataRiwayat(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedBooking(response.data.data[0]);
        }
      }
    } catch (err) {
      if (err.statusCode === 500) {
        navigate("/error");
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (Date.now() >= decoded.exp * 1000) {
        setIsLogin(false);
        navigate("/");
      } else {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
      navigate("/");
    }
  }, [navigate, cookies]);

  useEffect(() => {
    fetchData();
  }, [accountId]);

  useEffect(() => {
    if (dataRiwayat.length > 0 && !selectedBooking) {
      setSelectedBooking(dataRiwayat[0]);
    }
  }, [dataRiwayat, selectedBooking]);

  const groupByMonthYear = (bookings) => {
    return bookings.reduce((acc, booking) => {
      const date = new Date(booking.booking_date);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(booking);
      return acc;
    }, {});
  };

  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    setFilteredBookings(dataRiwayat);
  }, [dataRiwayat]);

  const applyDateFilter = () => {
    const filtered = dataRiwayat.filter((booking) => {
      const bookingDate = new Date(booking.booking_date);
      return bookingDate >= startDate && bookingDate <= endDate;
    });
    setFilteredBookings(filtered);
    toggleModal();
  };

  const groupedBookings = groupByMonthYear(filteredBookings);

  const [selectedBookingMobile, setSelectedBookingMobile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (booking) => {
    setSelectedBookingMobile(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBookingMobile(null);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState(["1234ABC", "7UY71912"]);

  const bookingCodes = dataRiwayat.map((booking) => booking.booking_code);

  const toggleModalFilter = () => {
    setModalOpen(!modalOpen);
  };

  const handleSelectBookingCode = (code) => {
    const filtered = dataRiwayat.filter(
      (booking) => booking.booking_code === code
    );
    setFilteredBookings(filtered);
    setModalOpen(false);
  };

  return (
    <>
      <Topnav isLogin={isLogin} isSearch={false} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col mt-28 gap-5 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-xl font-bold"
        >
          Riwayat Pemesanan
        </motion.h1>
        <div className="flex justify-between items-center gap-5 mx-4 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            viewport={{ once: true }}
            className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 rounded-lg"
          >
            <Link to="/">
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
            <h3 className="text-base">Beranda</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            viewport={{ once: true }}
            className="flex gap-2 items-center"
          >
            <div
              className="flex items-center space-x-2 cursor-pointer gap-2 border border-[#7126B5] p-1 px-2 rounded-full"
              onClick={toggleModal}
            >
              <BiFilterAlt className="text-[#8A8A8A] text-xl" />
              <p>Filter</p>
            </div>
            <DatePickerModal
              isOpen={isOpen}
              toggleModal={toggleModal}
              startDate={startDate}
              endDate={endDate}
              handleDateChange={handleDateChange}
              applyDateFilter={applyDateFilter}
            />

            <button onClick={toggleModalFilter}>
              <IoMdSearch className="text-[#7126B5] text-4xl" />
            </button>

            <BookingModal
              isOpen={modalOpen}
              onClose={toggleModalFilter}
              searchHistory={searchHistory}
              setSearchHistory={setSearchHistory}
              bookingCodes={bookingCodes}
              onSelectBookingCode={handleSelectBookingCode}
            />
          </motion.div>
        </div>

        {/* DESKTOP VERSION */}

        <div className="hidden md:flex gap-3 flex-col md:flex-row">
          {loading ? (
            <div className="flex justify-center items-center w-full h-64">
              <Loading loading={loading} />
            </div>
          ) : Object.keys(groupedBookings).length > 0 ? (
            <div className="flex-grow md:mx-10">
              {Object.entries(groupedBookings).map(([monthYear, bookings]) => (
                <div key={monthYear}>
                  <h2 className="text-lg font-semibold mb-2">
                    {new Date(`${monthYear}-01`).toLocaleString("default", {
                      year: "numeric",
                      month: "long",
                    })}
                  </h2>
                  {bookings.map((booking) => (
                    <RiwayatCard
                      key={booking.booking_id}
                      booking={booking}
                      selected={
                        selectedBooking?.booking_id === booking.booking_id
                      }
                      onClick={() => setSelectedBooking(booking)}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow">
              <HistoryEmpty />
            </div>
          )}
          {Object.keys(groupedBookings).length > 0 ? (
            <div className="md:w-1/3">
              <DetailHistory booking={selectedBooking} />
            </div>
          ) : (
            <div className="hidden"></div>
          )}
        </div>

        {/* MOBILE VERSION */}
        <div className="flex gap-3 flex-col md:flex-row md:hidden">
          {loading ? (
            <div className="flex justify-center items-center w-full h-64">
              <Loading loading={loading} />
            </div>
          ) : Object.keys(groupedBookings).length > 0 ? (
            <div className="flex-grow md:mx-10">
              {Object.entries(groupedBookings).map(([monthYear, bookings]) => (
                <div key={monthYear}>
                  <h2 className="text-lg font-semibold mb-2">
                    {new Date(`${monthYear}-01`).toLocaleString("default", {
                      year: "numeric",
                      month: "long",
                    })}
                  </h2>
                  {bookings.map((booking) => (
                    <RiwayatCard
                      key={booking.booking_id}
                      booking={booking}
                      selected={
                        selectedBookingMobile?.booking_id === booking.booking_id
                      }
                      onClick={() => handleCardClick(booking)}
                    />
                  ))}
                  {isModalOpen && selectedBookingMobile && (
                    <ModalDetailHistory
                      booking={selectedBookingMobile}
                      onClose={handleCloseModal}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow">
              <HistoryEmpty />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Riwayat;
