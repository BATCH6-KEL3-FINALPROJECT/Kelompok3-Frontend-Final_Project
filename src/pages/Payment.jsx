import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import PaymentMethod from "../components/PaymentMethod";
import Topnav from "../components/Topnav";
import Breadcrumbs from "../components/Breadcrumbs";
import CheckoutAlert from "../components/CheckoutAlert";
import FlightDetails from "../components/FlightDetails";
import CheckoutPricing from "../components/CheckoutPricing";
import useSend from "../hooks/useSend";

const Payment = () => {
  const { loading, sendData } = useSend();
  const [isLogin, setIsLogin] = useState(true);
  const [isBayar, setIsBayar] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const [totalHargaBerangkat, setTotalHargaBerangkat] = useState(0);
  const [totalHargaPulang, setTotalHargaPulang] = useState(0);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [searchParams] = useSearchParams();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendData(
          `/api/v1/transaction/booking/${searchParams.get("payment_id")}`,
          "GET"
        );
        const bookingData = response.data.data.bookingData;

        const createPassengerArray = (totalAdult, totalChild, totalBaby) => {
          const passengers = [];
          for (let i = 0; i < totalAdult; i++) passengers.push("Dewasa");
          for (let i = 0; i < totalChild; i++) passengers.push("Anak-Anak");
          for (let i = 0; i < totalBaby; i++) passengers.push("Bayi");
          return passengers;
        };

        const flightData = {
          goFlightId: bookingData[0]?.flight_id,
          goFlightPassengers: createPassengerArray(
            bookingData[0]?.totalAdult,
            bookingData[0]?.totalChild,
            bookingData[0]?.totalBaby
          ),
        };

        if (bookingData.length > 1) {
          flightData.returnFlightId = bookingData[1]?.flight_id;
          flightData.returnFlightPassengers = createPassengerArray(
            bookingData[1]?.totalAdult,
            bookingData[1]?.totalChild,
            bookingData[1]?.totalBaby
          );
        }

        setFlightData(flightData);
      } catch (err) {
        if (err.statusCode === 500) {
          navigate("/error");
        } else {
          console.error(err);
        }
      }
    };

    fetchData();
  }, [searchParams, navigate]);

  return (
    <div>
      <Topnav isLogin={isLogin} isSearch={true}></Topnav>
      <div className="shadow-md py-4 mt-24 w-11/12 mx-auto md:w-full">
        <Breadcrumbs isPayment={true} isSuccess={false} />
        {isBayar ? (
          <CheckoutAlert
            type="Danger"
            message={`Selesaikan Pembayaran sampai [${date}]`}
          />
        ) : (
          <CheckoutAlert message="Pembayaran Ticket Skypass" />
        )}
      </div>
      <div className="my-5 flex flex-col lg:flex-row md:justify-center md:items-center lg:items-start lg:justify-center gap-10 w-11/12 mx-auto md:w-full">
        <div className="flex flex-col gap-10">
          <PaymentMethod setIsBayar={setIsBayar} setDate={setDate} />
        </div>
        <div className="px-5 lg:px-0">
          {flightData.goFlightPassengers !== "undefined" &&
            flightData.goFlightId && (
              <div>
                <FlightDetails
                  flightID={flightData.goFlightId}
                  typeTicket={"Berangkat"}
                />
                <CheckoutPricing
                  passengerInfo={flightData.goFlightPassengers}
                  flightID={flightData.goFlightId}
                  onTotalPriceChange={setTotalHargaBerangkat}
                />
              </div>
            )}
          {flightData.returnFlightPassengers !== "undefined" &&
            flightData.returnFlightId && (
              <div>
                <FlightDetails
                  flightID={flightData.returnFlightId}
                  typeTicket={"Pulang"}
                />
                <CheckoutPricing
                  passengerInfo={flightData.returnFlightPassengers}
                  flightID={flightData.returnFlightId}
                  onTotalPriceChange={setTotalHargaPulang}
                />
              </div>
            )}
          <div className="flex justify-between mx-2">
            <h3 className="font-bold"> Total </h3>
            <h3 className="font-bold text-lg text-[#7126B5]">
              IDR{" "}
              {(totalHargaPulang + totalHargaBerangkat).toLocaleString("id-ID")}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
