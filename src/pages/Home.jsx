import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Home = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = async (event) => {
    cookies.remove("token");
    setIsLoggedOut(true);
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
    <div className="relative flex flex-col gap-4 min-h-screen text-3xl text-violet-600">
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
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
