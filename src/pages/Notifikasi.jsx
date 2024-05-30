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
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isFilterDropdownVisible, setIsFilterDropdownVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsFilterDropdownVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredNotifications = notifikasi.filter((notification) => {
    const matchesFilter = filter === "All" || notification.title === filter;
    const matchesSearch = notification.message
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const uniqueTitles = [...new Set(notifikasi.map((notif) => notif.title))];
  const filterOptions = uniqueTitles.map((title) => ({
    label: title,
    value: title,
  }));

  return (
    <>
      <Navbar isLogin={isLogin} isSearch={false} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col gap-5 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-xl font-bold"
        >
          Notifikasi
        </motion.h1>
        <div className="flex justify-between items-center gap-5 mx-4 mb-8 relative">
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
            <button
              className="flex items-center text-base gap-2 border border-[#7126B5] p-1 px-2 rounded-full"
              onClick={() => {
                setIsFilterDropdownVisible(!isFilterDropdownVisible);
                setIsSearchVisible(false);
              }}
            >
              <BiFilterAlt className="text-[#8A8A8A] text-xl" />
              <p>Filter</p>
            </button>
            {isFilterDropdownVisible && (
              <div className="absolute top-12 right-0 z-10 bg-white shadow-lg rounded-md">
                <motion.button
                  initial={{ opacity: 0, x: 75 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.25,
                  }}
                  className="block w-full text-center px-9 py-2 rounded-lg text-black bg-[#A06ECE] hover:text-white hover:bg-[#8A4FC9] border-b"
                  onClick={() => handleFilterChange("All")}
                >
                  All
                </motion.button>
                {filterOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: 75 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.25 * (index + 1),
                    }}
                    className="block w-full text-center px-9 py-2 rounded-lg text-black bg-[#A06ECE] hover:text-white hover:bg-[#8A4FC9] border-b"
                    onClick={() => handleFilterChange(option.value)}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            )}
            <button
              onClick={() => {
                setIsSearchVisible(!isSearchVisible);
                setIsFilterDropdownVisible(false);
              }}
            >
              <IoMdSearch className="text-[#7126B5] text-4xl" />
            </button>
            {isSearchVisible && (
              <motion.input
                initial={{ opacity: 0, x: 75 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.25 }}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                className="border border-[#7126B5] p-1 px-5 rounded-full absolute top-12 right-0 bg-white shadow-lg z-10"
              />
            )}
          </motion.div>
        </div>
        <div>
          {isLoading
            ? notifikasi.map((_, index) => (
                <NotificationItemSkeleton key={index} />
              ))
            : filteredNotifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  title={notification.title}
                  date={notification.date}
                  message={notification.message}
                  extraMessage={notification.extraMessage}
                  iconColor={notification.iconColor}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Notifikasi;
