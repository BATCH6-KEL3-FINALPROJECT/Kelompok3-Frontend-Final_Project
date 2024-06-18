import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import PaymentMethod from "../components/PaymentMethod";
import Topnav from "../components/Topnav";
import Breadcrumbs from "../components/Breadcrumbs";
import CheckoutAlert from "../components/CheckoutAlert";
import FlightDetails from "../components/FlightDetails";
import CheckoutPricing from "../components/CheckoutPricing";

const Payment = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const FLIGHT_ID = "ee0bd130-7da9-4b0f-bd57-66efae5ab218";
  const PASSENGER = ["Adult", "Adult", "Child", "Child"];

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
      <Breadcrumbs isPayment={true} isSuccess={false} />
      <div className="mt-16 mb-10">
        <CheckoutAlert
          type="Danger"
          message="Selesaikan Pembayaran sampai [10 Maret 2023 12:00]"
        />
      </div>
      <div className="my-5 flex flex-col md:flex-row md:justify-center md:items-center lg:items-start lg:justify-center gap-10">
        <div className="flex flex-col gap-10">
          <PaymentMethod />
        </div>
        <div className="px-5 lg:px-0">
          <FlightDetails isPayment={true} flightID={FLIGHT_ID} />
          <CheckoutPricing passengerInfo={PASSENGER} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
