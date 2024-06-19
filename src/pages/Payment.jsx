import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import PaymentMethod from "../components/PaymentMethod";
import Topnav from "../components/Topnav";
import Breadcrumbs from "../components/Breadcrumbs";
import CheckoutAlert from "../components/CheckoutAlert";
import FlightDetails from "../components/FlightDetails";
import CheckoutPricing from "../components/CheckoutPricing";
import { flightDetails } from "../utils/flightDummy";
import { passenger } from "../utils/generatePassanger";
import Passenger from "../components/Passenger";

const Payment = () => {
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

  const [flightDetail, setFlightDetail] = useState([]);
  const [passengerInfo, setPassengerInfo] = useState([]);

  useEffect(() => {
    setFlightDetail(flightDetails());
    setPassengerInfo(passenger.sort());
  }, []);

  return (
    <div>
      <Topnav isLogin={isLogin} isSearch={true}></Topnav>
      <div className="shadow-md py-4 mt-24 w-11/12 mx-auto md:w-full">
        <Breadcrumbs isPayment={true} isSuccess={false} />
        <CheckoutAlert
          type="Danger"
          message="Selesaikan Pembayaran sampai [10 Maret 2023 12:00]"
        />
      </div>
      <div className="my-5 flex flex-col lg:flex-row md:justify-center md:items-center lg:items-start lg:justify-center gap-10 w-11/12 mx-auto md:w-full">
        <div className="flex flex-col gap-10">
          <PaymentMethod />
        </div>
        <div className="px-5 lg:px-0">
          <FlightDetails flightDetail={flightDetail} isPayment={true} />
          <CheckoutPricing passengerInfo={passengerInfo} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
