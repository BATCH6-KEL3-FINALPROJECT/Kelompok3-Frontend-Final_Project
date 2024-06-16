import React, { Suspense, useEffect, useState } from "react";
import logo from "../../public/Checkout_Plane_Logo.png";
import { formatDate, formatTime } from "../utils/formatDate";

const FlightDetails = ({ flightDetail, isPayment }) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(flightDetail);
  }, [flightDetail]);

  return (
    <div>
      {datas && (
        <>
          {isPayment ? (
            <h3 className="text-lg font-bold">
              Booking Code :{" "}
              <span className="font-semibold text-[#A06ECE]">
                ISI Booking code
              </span>
            </h3>
          ) : (
            <h3 className="text-lg font-bold">Detail Penerbangan</h3>
          )}
          <div id="departure-info">
            <div className="flex w-full justify-between items-center">
              <p className="font-bold text">
                {formatTime(datas.departure_time)}
              </p>
              <p className="text-[#A06ECE] text-xs font-bold">Keberangkatan</p>
            </div>
            <p className="text-sm"> {formatDate(datas.departure_time)} </p>
            <p className="font-medium text-sm mt-2">
              {datas.departure_airport}
            </p>
          </div>
          <div className="my-2 border-0 border-y-2 border-y-gray-300 py-2 mx-2">
            <div className="font-bold text-sm px-8 mb-3">
              <p> Jet Air - Economy </p>
              <p> JT - 203 </p>
            </div>
            <div className="flex gap-2">
              <img src={logo} className="w-6 h-6" />
              <div className="text-sm ">
                <p className="font-bold"> Informasi : </p>
                {datas.flightDescription && (
                  <>
                    {datas.flightDescription.map((item, index) => (
                      <p key={index}> {item}</p>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div id="arrive-information">
            <div className="flex justify-between">
              <p className="text-sm font-bold">
                {formatTime(datas.arrive_time)}
              </p>
              <p className="text-xs text-[#A06ECE] font-bold"> Kedatangan </p>
            </div>
            <p className="text-sm"> {formatDate(datas.arrive_time)} </p>
            <p className="text-sm font-medium"> {datas.arrival_airport} </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightDetails;
