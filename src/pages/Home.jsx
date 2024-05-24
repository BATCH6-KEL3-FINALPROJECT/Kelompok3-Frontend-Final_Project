import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Beranda from "../components/Beranda";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = async (event) => {
    cookies.remove("token");
    setIsLoggedOut(true);
  };

  const handleTest = async (event) => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    if (isLoggedOut) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedOut, navigate]);

  return (
    <>
      <Navbar isLogin={isLogin} />
      <Beranda />
      <div className="relative flex flex-col gap-4 text-3xl text-white">
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
        <h1 className="text-violet-600 text-center">
          Ini Hanya Testing Sementara
        </h1>
        <div className="flex gap-5 justify-center pb-6">
          <button
            onClick={handleLogout}
            className="bg-violet-600 p-2 rounded-lg"
          >
            Logout
          </button>
          <button onClick={handleTest} className="bg-violet-600 p-2 rounded-lg">
            Change Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
