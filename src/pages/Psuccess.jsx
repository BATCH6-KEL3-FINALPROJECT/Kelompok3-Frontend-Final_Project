import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Topnav from "../components/Topnav";
import PaymentSucces from "../components/PaymentSucces";
import Breadcrumbs from "../components/Breadcrumbs";
import CheckoutAlert from "../components/CheckoutAlert";

const Psuccess = () => {
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
        <Breadcrumbs isPayment={true} isSuccess={true}></Breadcrumbs>
        <CheckoutAlert
          type="Success"
          message="Terimakasih atas pembayaran transaksi"
        ></CheckoutAlert>
      </div>
      <PaymentSucces></PaymentSucces>
    </div>
  );
};

export default Psuccess;
