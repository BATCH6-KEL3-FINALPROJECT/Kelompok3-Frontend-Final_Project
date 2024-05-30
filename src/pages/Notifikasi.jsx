import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdArrowRoundBack } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";
import NotificationItemSkeleton from "../components/NotificationItemSkeleton";
import NotificationItem from "../components/NotificationItem";
import { motion } from "framer-motion";

const Notifikasi = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const notifikasi = [
    {
      title: "Promosi",
      date: "20 Maret, 14:04",
      message: "Dapatkan Potongan 50% Tiket!",
      extraMessage: "Syarat dan Ketentuan berlaku!",
      iconColor: "bg-[#73CA5C]",
    },
    {
      title: "Notifikasi",
      date: "5 Maret, 14:04",
      message:
        "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!",
      iconColor: "bg-[#FA2C5A]",
    },
    {
      title: "Notifikasi",
      date: "5 Maret, 14:04",
      message:
        "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!",
      iconColor: "bg-[#FA2C5A]",
    },
  ];

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate("/");
    }

    // async function fetchData() {
    //   try {
    //     const response = await fetch("http://localhost:8000/notifikasi");
    //     const data = await response.json();
    //     setNotifications(data);
    //   } catch (error) {
    //     console.error("Error fetching notifications:", error);
    //   }
    // }

    // fetchData();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar isLogin={isLogin} isSearch={false} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col gap-5 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="text-xl font-bold"
        >
          Notifikasi
        </motion.h1>
        <div className="flex justify-between items-center gap-5 mx-4 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
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
        <div>
          {isLoading
            ? notifikasi.map((_, index) => (
                <NotificationItemSkeleton key={index} />
              ))
            : notifikasi.map((notification, index) => (
                <NotificationItem
                  key={index}
                  title={notification.title}
                  date={notification.date}
                  message={notification.message}
                  extraMessage={notification.extraMessage}
                  iconColor={notification.iconColor}
                />
              ))}
          {/* {isLoading
            ? notifications.map((_, index) => (
                <NotificationItemSkeleton key={index} />
              ))
            : notifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  title={notification.title}
                  date={notification.date}
                  message={notification.message}
                  extraMessage={notification.extraMessage}
                  iconColor={notification.iconColor}
                />
              ))} */}
        </div>
      </div>
    </>
  );
};
export default Notifikasi;
