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
import FlightDetails from "../components/FlightDetails";
import CheckoutPricing from "../components/CheckoutPricing";
import { flightDetails } from "../utils/flightDummy";
import { passenger } from "../utils/generatePassanger";

const Riwayat = () => {
  const { loading, sendData } = useSend();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [dataRiwayat, setDataRiwayat] = useState([]);
  const [accountId, setAccountId] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      if (checkToken === "undefined") {
        setIsLogin(false);
        navigate("/");
      } else {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
      navigate("/");
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, cookies]);

  const fetchData = async () => {
    try {
      const token = cookies.get("token");
      if (token) {
        const decoded = jwtDecode(token);
        setAccountId(decoded.id);
        const response = await sendData(`/api/v1/ticket`, "GET", null, token);
        if (response) {
          const filteredTickets = response.data.data.tickets.filter(
            (ticket) => ticket.passenger_id === decoded.id
          );
          // setDataRiwayat(filteredTickets);
          setDataRiwayat(response.data.data.tickets);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accountId]);

  useEffect(() => {
    console.log(dataRiwayat);
  }, [dataRiwayat]);

  const groupByMonthYear = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const date = new Date(ticket.createdAt);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(ticket);
      return acc;
    }, {});
  };

  const groupedTickets = groupByMonthYear(dataRiwayat);

  const [flightDetail, setFlightDetail] = useState([]);
  const [passengerInfo, setPassengerInfo] = useState([]);

  useEffect(() => {
    setFlightDetail(flightDetails());
    setPassengerInfo(passenger.sort());
  }, []);

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
            <button className="flex items-center text-base gap-2 border border-[#7126B5] p-1 px-2 rounded-full">
              <BiFilterAlt className="text-[#8A8A8A] text-xl" /> <p>Filter</p>
            </button>
            <button>
              <IoMdSearch className="text-[#7126B5] text-4xl" />
            </button>
          </motion.div>
        </div>
        <div className="flex gap-10">
          {Object.keys(groupedTickets).length > 0 ? (
            Object.entries(groupedTickets).map(([monthYear, tickets]) => (
              <div key={monthYear} className="flex-grow mx-">
                <h2 className="text-lg font-semibold mb-2">
                  {new Date(`${monthYear}-01`).toLocaleString("default", {
                    year: "numeric",
                    month: "long",
                  })}
                </h2>
                {tickets.map((ticket) => (
                  <RiwayatCard key={ticket.ticket_id} ticket={ticket} />
                ))}
              </div>
            ))
          ) : (
            <div className="flex-grow">
              <p>No booking history found.</p>
            </div>
          )}
          <div className="px-5 lg:px-0">
            <FlightDetails flightDetail={flightDetail} />
            <CheckoutPricing passengerInfo={passengerInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Riwayat;
