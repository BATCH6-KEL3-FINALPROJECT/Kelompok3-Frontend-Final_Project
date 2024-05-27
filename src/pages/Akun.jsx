import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";

const Akun = () => {
  const [isLogin, setIsLogin] = useState(true);
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
  }, [navigate]);

  return (
    <>
      <Navbar isLogin={isLogin} isSearch={false} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col gap-5">
        <h1 className="text-xl font-bold">Akun</h1>
        <div className="flex justify-between items-center gap-5 mx-4">
          <div className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 rounded-lg">
            <Link to="/">
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
            <h3 className="text-base">Beranda</h3>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Akun;
