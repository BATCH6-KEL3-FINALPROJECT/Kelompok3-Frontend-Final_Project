import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdArrowRoundBack } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import NotificationItemSkeleton from "../components/NotificationItemSkeleton";
import NotificationItem from "../components/NotificationItem";
import { motion } from "framer-motion";
import Topnav from "../components/Topnav";
import useSend from "../hooks/useSend";

const Notification = () => {
  const { loading, sendData } = useSend();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isFilterDropdownVisible, setIsFilterDropdownVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await sendData(
        `/api/v1/notification`,
        "GET",
        null,
        cookies.get("token")
      );
      const notifications = response.data.data.notification.filter(
        (notif) => notif.user_id !== null
      );
      console.log(notifications);
      setNotifications(notifications);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsFilterDropdownVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const formatNotificationType = (type) => {
    return type
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "All" ||
      formatNotificationType(notification.notification_type) === filter;
    const matchesSearch = notification.message
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const uniqueTypes = [
    ...new Set(
      notifications.map((notif) =>
        formatNotificationType(notif.notification_type)
      )
    ),
  ];

  const filterOptions = uniqueTypes.map((type) => ({
    label: type,
    value: type,
  }));

  return (
    <>
      <Topnav isLogin={isLogin} isSearch={false} />
      <div className="w-11/12 md:w-2/3 mx-auto flex mt-28 flex-col gap-5 overflow-hidden">
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
              <>
                <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
                <div className="fixed inset-0 flex items-center justify-center z-10 m-10">
                  <div
                    className="bg-white rounded-lg shadow-lg flex flex-col gap-2 z-10 ms-1 md:ms-0 w-11/12 md:w-[400px] md:h-[306px] overflow-y-scroll overflow-x-hidden"
                    style={{
                      borderRadius: "20px",
                      padding: "24px 0",
                    }}
                  >
                    <motion.button
                      initial={{ opacity: 0, x: 75 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.25,
                      }}
                      className="block w-4/5 m-auto text-center px-9 py-2 rounded-lg text-black bg-white hover:text-white hover:bg-[#8A4FC9] border-b"
                      onClick={() => handleFilterChange("All")}
                    >
                      All
                    </motion.button>
                    {filterOptions.map((option, index) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, x: 75 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.75,
                          delay: 0.25 * (index + 1) + 0.25,
                        }}
                        className="block w-4/5 m-auto text-center px-9 py-2 rounded-lg text-black bg-white hover:text-white hover:bg-[#8A4FC9] border-b"
                        onClick={() => handleFilterChange(option.value)}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </>
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
          {isLoading && !loading
            ? notifications.map((_, index) => (
                <NotificationItemSkeleton key={index} />
              ))
            : filteredNotifications.map((notification, index) => (
                <NotificationItem
                  key={index}
                  title={formatNotificationType(notification.notification_type)}
                  date={notification.updatedAt}
                  message={notification.message}
                  extraMessage={notification.extraMessage}
                  is_read={notification.is_read}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Notification;
