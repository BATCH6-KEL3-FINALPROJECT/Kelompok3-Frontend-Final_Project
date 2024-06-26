import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Topnav from "../components/Topnav";
import PaymentSucces from "../components/PaymentSucces";
import Breadcrumbs from "../components/Breadcrumbs";
import CheckoutAlert from "../components/CheckoutAlert";

const Perror = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      if (checkToken === "undefined") {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  }, [navigate]);

  return (
    <div>
      <Topnav isLogin={isLogin} isSearch={true}></Topnav>
      <div className="shadow-md py-4 mt-24 w-11/12 mx-auto md:w-full">
        <Breadcrumbs isPayment={true} isSuccess={false}></Breadcrumbs>
        <CheckoutAlert
          type="Danger"
          message="Pembayaran Transaksi Error"
        ></CheckoutAlert>
      </div>
      <div className="flex justify-center items-center gap-2 flex-col min-h-[50vh] px-4 py-5 md:py-8 w-11/12 mx-auto md:w-full">
        <div className="flex justify-center">
          <img
            src="/shopping_error.jpg"
            alt="Shopping Error"
            className="w-3/4 md:w-3/12"
          />
        </div>
        <h1 className="text-black font-medium flex flex-col text-center">
          <p className="text-[#7126B5]">Payment Error!</p>
          <span>
            Transaksi Pembayaran Tiket anda Error Coba Beberapa Saat Lagi!
          </span>
        </h1>
        <Link to="/riwayat-pesanan" className="w-3/4 md:w-96 mx-auto">
          <button className="btn btn-active bg-[#7126B5] h-[48px] rounded-lg text-white w-full mx-auto hover:bg-[#7126B5]/70">
            Lihat Riwayat Pesanan
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Perror;
