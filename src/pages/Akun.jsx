import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Akun = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [profile, setProfile] = useState({
    name: "Harry",
    telepon: "+62 897823232",
    email: "Johndoe@gmail.com",
  });
  const [errors, setErrors] = useState({
    name: false,
    telepon: false,
    email: false,
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate("/");
    }

    if (isLoggedOut) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedOut, navigate]);

  const handleLogout = async (event) => {
    cookies.remove("token");
    setIsLoggedOut(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
  };

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
          Akun
        </motion.h1>
        <div className="flex justify-between items-center gap-5 mx-4 md:mb-5">
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
        </div>
        <div className="flex flex-col md:flex-row gap-5 mx-4">
          <div className="flex flex-col gap-4 font-medium text-base w-full md:w-1/3">
            <button className="flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300">
              <FiEdit3 className="text-[#7126B5] text-xl" /> <p>Ubah Profil</p>
            </button>
            <button className="flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300">
              <IoSettingsOutline className="text-[#7126B5] text-xl" />
              <p>Pengaturan Akun</p>
            </button>
            <button
              onClick={handleLogout}
              className="flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300"
            >
              <MdLogout className="text-[#7126B5] text-xl" /> <p>Keluar</p>
            </button>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col gap-5">
              <h1 className="text-xl font-bold text-center md:text-left">
                Ubah Data Profil
              </h1>
              <div className="">
                <p className="bg-[#A06ECE] rounded-t-xl text-white text-base font-medium px-4 py-2">
                  Data Diri
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-gray-300 p-4 rounded-b-xl"
                >
                  <div className="flex flex-col gap-4 mb-5">
                    <div className="flex flex-col">
                      <label
                        htmlFor="name"
                        className="text-[#4B1979] font-bold text-sm"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        placeholder="Nama Lengkap"
                        className="border border-gray-300 p-2 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="telepon"
                        className="text-[#4B1979] font-bold text-sm"
                      >
                        Telepon
                      </label>
                      <PhoneInput
                        id="telepon"
                        country={"id"}
                        value={profile.telepon}
                        onChange={(telepon) =>
                          setProfile((prev) => ({ ...prev, telepon }))
                        }
                        inputStyle={{ width: "100%" }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-[#4B1979] font-bold text-sm"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-gray-300 p-2 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-[#4B1979] text-base font-medium text-white mx-auto px-12 p-3 rounded-xl hover:bg-[#7126B5] transition-all duration-300"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoggedOut && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 px-40 rounded-md shadow-md z-50">
            <IoMdCheckmarkCircle className="text-green-500 text-8xl md:text-9xl" />
            <h2 className="text-center text-green-500 font-bold text-3xl md:text-4xl">
              Anda Berhasil Logout
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default Akun;
