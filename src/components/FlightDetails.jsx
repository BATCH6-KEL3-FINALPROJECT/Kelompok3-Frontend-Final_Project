import { useEffect, useState } from "react";
import {
  formatDate,
  formatFlightCode,
  formatTime,
} from "../utils/checkoutUtils";
import axios from "axios";
import { motion } from "framer-motion";

const FlightDetails = ({ flightID, typeTicket }) => {
  const [flightData, setFlightData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  // simpan di .env nanti
  const URL = "https://airline.azkazk11.my.id/api/v1";

  useEffect(() => {
    const fetchFlightData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${URL}/flight/${flightID}`);
        setFlightData(res.data.data.flight);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlightData();
  }, [flightID]);

  return (
    <div
      id="flight-wrapper"
      className="border p-2 rounded-t-xl border-gray-400"
    >
      {isLoading && <LoadingSkeleton />}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, type: "spring" }}
      >
        {isError && isError.message === "Network Error" && (
          <p className="font-semibold py-5 text-center">
            Terjadi kesalahan ketika memuat data. Periksa jaringan anda terlebih
            dahulu
          </p>
        )}
        {Object.keys(flightData).length > 1 && !isLoading && (
          <>
            <h3 className="text-lg font-bold">
              {" "}
              Detail Penerbangan {typeTicket}
            </h3>
            <div id="departure-info">
              <div className="flex w-full justify-between items-center">
                <p className="font-bold text">
                  {formatTime(flightData.departure_time)}
                </p>
                <p className="text-[#A06ECE] text-xs font-bold">
                  Keberangkatan
                </p>
              </div>
              <p className="text-sm">
                {" "}
                {formatDate(flightData.departure_date)}{" "}
              </p>
              <p className="font-medium text-sm mt-2">
                {flightData.departure_airport}
              </p>
            </div>
            <div className="my-2 border-0 border-y-2 border-y-gray-300 py-2 mx-2">
              <div className="font-bold text-sm px-8 mb-3">
                <p>
                  {flightData.Airline.airline_name} -{" "}
                  {flightData.seat_class || "Economy"}
                </p>
                <p> {formatFlightCode(flightData.flight_code)} </p>
              </div>
              <div className="flex gap-2">
                <img src="/Checkout_Plane_Logo.png" className="w-6 h-6" />
                <div className="text-sm ">
                  <p className="font-bold"> Informasi : </p>
                  {flightData.flight_description && (
                    <>
                      {flightData.flight_description.details.map(
                        (item, index) => (
                          <p key={index}> {item.description}</p>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div id="arrive-information">
              <div className="flex justify-between">
                <p className="text-sm font-bold">
                  {formatTime(flightData.arrival_time)}
                </p>
                <p className="text-xs text-[#A06ECE] font-bold"> Kedatangan </p>
              </div>
              <p className="text-sm"> {formatDate(flightData.arrival_date)} </p>
              <p className="text-sm font-medium">
                {flightData.arrival_airport}
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default FlightDetails;

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse duration-700 w-full md:w-auto">
      <div className="h-4 bg-slate-300 w-[200px] rounded-lg mb-2"> </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-5">
          <div className="bg-slate-300 w-[130px] rounded-lg h-4"></div>
          <div className="bg-slate-300 rounded-lg w-[80px]  h-4"></div>
        </div>
        <div className="bg-slate-300 w-[100px] h-4 rounded-lg"></div>
        <div className="bg-slate-300 w-[160px] h-4 rounded-lg"></div>
      </div>
      <div className="my-2 border-0 border-y-2 border-y-gray-300 py-2 mx-2">
        <div className="px-8 mb-3 flex flex-col gap-1">
          <div className="bg-slate-300 rounded-lg w-[80px]  h-4"> </div>
          <div className="bg-slate-300 rounded-lg w-[50px]  h-4"> </div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-slate-300 rounded-lg" />
          <div className="flex flex-col gap-0.5 ">
            <div className="bg-slate-300 rounded-lg w-[70px]  h-4"> </div>
            <div className="bg-slate-300 rounded-lg w-[55px]  h-4"> </div>
            <div className="bg-slate-300 rounded-lg w-[65px]  h-4"> </div>
            <div className="bg-slate-300 rounded-lg w-[80px]  h-4"> </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-5">
          <div className="bg-slate-300 w-[130px] rounded-lg h-4"></div>
          <div className="bg-slate-300 rounded-lg w-[80px]  h-4"></div>
        </div>
        <div className="bg-slate-300 w-[100px] h-4 rounded-lg"></div>
        <div className="bg-slate-300 w-[160px] h-4 rounded-lg"></div>
      </div>
    </div>
  );
};
