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
        <div className="flex gap-16">
          {Object.keys(groupedTickets).length > 0 ? (
            Object.entries(groupedTickets).map(([monthYear, tickets]) => (
              <div key={monthYear} className="flex-grow mx-10">
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
          <div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-5">
                <h3 className="text-gray-900 font-poppins text-lg font-bold">
                  Detail Pesanan
                </h3>
                <p className="flex items-center justify-center rounded-full p-1 bg-[#73CA5C] px-4 text-center text-sm text-white">
                  Issued
                </p>
              </div>
              <div className="flex">
                <h4 className="text-gray-900 font-poppins text-lg font-bold">
                  <span className="font-normal text-gray-900">
                    Booking Code:
                  </span>
                  <span className="text-[#7126B5]">6723y2GHK</span>
                </h4>
              </div>
            </div>

            <div className="flex flex-col gap-15px">
              <div className="flex items-start">
                <div className="flex flex-1 flex-col items-start">
                  <h5 className="text-gray-900 font-poppins w-33% text-sm font-bold leading-5 md:w-full">
                    <span className="text-base text-gray-900">19:10</span>
                    <br />
                    <span className="font-normal text-gray-900">
                      5 Maret 2023
                    </span>
                  </h5>
                  <p className="text-gray-900 font-poppins text-sm font-medium">
                    Soekarno Hatta - Terminal 1A Domestik
                  </p>
                </div>
                <div className="relative ml-[-78px] flex">
                  <h6 className="text-gray-900 font-poppins text-xs font-bold text-deep_purple-300">
                    Keberangkatan
                  </h6>
                </div>
              </div>
              <img
                className="h-px"
                src="images/img_divider.svg"
                alt="divider"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex">
                <div className="flex flex-col justify-center py-16 md:py-5">
                  <img
                    className="h-24px object-cover"
                    src="logoplane.svg"
                    alt="Logo"
                    loading="lazy"
                  />
                </div>
                <p className="text-gray-900 font-poppins w-93% text-xs font-medium leading-18px">
                  <span className="text-sm font-bold text-gray-900">
                    Jet Air - Economy
                    <br />
                    JT - 203
                    <br />
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    Informasi:
                  </span>
                  <br />
                  <span className="text-sm text-purple-900">
                    Penumpang 1: Mr. Harry Potter
                  </span>
                  <br />
                  <span className="text-sm font-normal text-gray-900">
                    ID: 1234567
                  </span>
                  <br />
                  <span className="text-sm text-purple-900">
                    Penumpang 2: Miss Hermione
                  </span>
                  <br />
                  <span className="text-sm font-normal text-gray-900">
                    ID: 789658
                  </span>
                </p>
              </div>
              <img
                className="h-px"
                src="images/img_divider.svg"
                alt="divider"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col gap-3.5 pt-3">
              <div>
                <div className="flex items-start">
                  <div className="flex flex-1 flex-col items-start gap-0.5">
                    <p className="text-gray-900 font-poppins w-41% text-sm font-bold leading-5 md:w-full">
                      <span className="text-gray-900">21:10</span>
                      <br />
                      <span className="font-normal text-gray-900">
                        5 Maret 2023
                      </span>
                    </p>
                    <p className="text-gray-900 font-poppins text-sm font-medium">
                      Melbourne International Airport
                    </p>
                  </div>
                  <div className="relative ml-[-24px] flex">
                    <p className="text-gray-900 font-poppins text-xs font-bold text-deep_purple-300">
                      Kedatangan
                    </p>
                  </div>
                </div>
              </div>
              <img
                className="h-px"
                src="images/img_divider.svg"
                alt="divider"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col gap-0.5 py-2">
              <div className="flex">
                <p className="text-gray-900 font-poppins text-sm font-bold">
                  Rincian Harga
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <div className="flex flex-1">
                  <p className="text-gray-900 font-poppins text-sm font-normal">
                    2 Adults
                  </p>
                </div>
                <div className="flex">
                  <p className="text-gray-900 font-poppins text-sm font-normal">
                    IDR 9.550.000
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-1">
                  <p className="text-gray-900 font-poppins text-sm font-normal">
                    1 Baby
                  </p>
                </div>
                <p className="text-gray-900 font-poppins text-sm font-normal">
                  IDR 0
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-1">
                  <p className="text-gray-900 font-poppins text-sm font-normal">
                    Tax
                  </p>
                </div>
                <p className="text-gray-900 font-poppins text-sm font-normal">
                  IDR 300.000
                </p>
              </div>
              <div className="flex items-center gap-2 border-t border-solid border-blue-gray-100 py-2.5">
                <div className="flex flex-1">
                  <h6 className="text-gray-900 font-poppins text-base font-bold">
                    Total
                  </h6>
                </div>
                <h6 className="text-gray-900 font-poppins text-lg font-bold text-deep_purple-500">
                  IDR 9.850.000
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Riwayat;
