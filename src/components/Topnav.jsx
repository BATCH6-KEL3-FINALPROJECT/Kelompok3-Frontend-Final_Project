import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch, IoMdPerson, IoIosList } from "react-icons/io";
import { FiBell } from "react-icons/fi";
import NavbarItems from "./NavbarItems";
import InputSearch from "./InputSearch";
import useSend from "../hooks/useSend";
import Cookies from "universal-cookie";

const Topnav = ({ isLogin = false, isSearch, isOTP = false }) => {
  const { loading, sendData } = useSend();
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const dialogRef = useRef();
  const searchRef = useRef();
  const cookies = new Cookies();

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
        setIsOpen(true);
      }
      setIsSearchVisible(false);
      setIsSearchOpen(false);
    } else {
      setIsSearchVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
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
        setNotifications(notifications.length);
      } catch (err) {
        console.log(err);
      }
    };
    if (isLogin) {
      fetchData();
    }
  }, []);

  const clickOutsideModal = (e) => {
    if (e.target.id !== "dialog") {
      dialogRef.current.close();
      setIsOpen(true);
    }
  };

  const handleHamburger = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    console.log("Search text:", searchText);
  };

  return (
    <nav className="flex justify-between items-center bg-[#f1f5f9] fixed top-0 left-0 w-full z-50 py-4 px-4 md:px-2 xl:px-28 border-b-[1px]">
      <div className="flex gap-10">
        <a href="/">
          <img
            src="/skypass_horizontal.png"
            alt="navbar logo"
            className="h-[60px] md:ps-10"
          />
        </a>
        {isSearch && (
          <InputSearch placeholder="Cari disini....." isSearch={isSearch} />
        )}
      </div>

      <dialog ref={dialogRef} onClick={clickOutsideModal}>
        <div
          id="dialog"
          className={`min-w[70vw] flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/60 py-20 w-11/12 backdrop-blur-sm md:hidden`}
        >
          <Link
            to="/riwayat-pesanan"
            className="text-white/70 text-2xl font-bold my-3 hover:underline flex items-center gap-3"
          >
            <IoIosList className="text-3xl" />
            <p>Riwayat Pesanan</p>
          </Link>
          <Link
            to="/notification"
            className="text-white/70 text-2xl font-bold my-3 hover:underline flex items-center gap-3"
          >
            <FiBell className="text-3xl" />
            <p>Notifikasi</p>
          </Link>
          <Link
            to="/account"
            className="text-white/70 text-2xl font-bold my-3 hover:underline flex items-center gap-3"
          >
            <IoMdPerson className="text-3xl" />
            <p>Akun</p>
          </Link>
        </div>
      </dialog>

      <div className="flex gap-6 items-center">
        {isSearch && (
          <button className="md:hidden text-4xl" onClick={handleSearchToggle}>
            {isSearchOpen ? (
              <button
                className="text-red-500"
                onClick={() => {
                  setSearchText("");
                }}
              >
                X
              </button>
            ) : (
              <IoMdSearch />
            )}
          </button>
        )}
        {isSearchOpen && (
          <div className="flex items-center absolute top-16 mt-3 right-0 rounded-md w-full z-40">
            <div className="relative w-11/12 mx-auto border-2 border-[#7126B5] z-40 rounded-lg">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleInputChange}
                className={`bg-gray-50 border-2 text-gray-900 sm:text-sm rounded-lg w-full pr-16 p-3 focus:outline-none`}
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-4xl text-gray-600"
                onClick={handleSearch}
              >
                <IoMdSearch />
              </button>
            </div>
          </div>
        )}

        {!isOTP && (
          <>
            {isLogin ? (
              <>
                <NavbarItems>
                  <Link to="/riwayat-pesanan">
                    <IoIosList className="text-2xl" />
                  </Link>
                  <Link to="/notification" className="relative">
                    <FiBell className="text-2xl" />
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
                      {notifications}
                    </div>
                  </Link>
                  <Link to="/account">
                    <IoMdPerson className="text-2xl" />
                  </Link>
                </NavbarItems>
                <button
                  className="flex flex-col justify-center items-center md:hidden border border-[#7126B5] p-2 rounded"
                  onClick={handleHamburger}
                >
                  <span
                    className={`bg-black block transition-all ease-out duration-300 h-0.5 w-6 rounded-sm py-0.5 ${
                      !isOpen ? "rotate-45 translate-y-2" : "-tranlate-y-1"
                    }`}
                  ></span>
                  <span
                    className={`bg-black block transition-all ease-in-out duration-300 h-0.5 w-6 rounded-sm py-0.5 my-1 ${
                      !isOpen ? "opacity-0 translate-x-8" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`bg-black block transition-all ease-out duration-300 h-0.5 w-6 rounded-sm py-0.5 ${
                      !isOpen ? "-rotate-45 -translate-y-2" : "tranlate-y-1"
                    }`}
                  ></span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-[#7126B5] py-3 px-4 rounded-xl text-white flex gap-2 items-center hover:opacity-80 transition-all"
              >
                <img
                  src="/Navbar_Button_Icon.svg"
                  alt="button icon"
                  width={20}
                  height={20}
                />
                Masuk
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Topnav;
