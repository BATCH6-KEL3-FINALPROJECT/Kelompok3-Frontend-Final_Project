import React, { Suspense, useEffect, useState } from "react";
import logo from "../../public/Checkout_Plane_Logo.png";

const FlightDetails = ({ flightDetail, isSavedData }) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(flightDetail);
  }, [flightDetail]);

  return (
    <div>
      <h3 className="text-lg font-bold"> Detail Penerbangan </h3>
      {/* Departure Information */}
      <div id="departure-info">
        <div className="flex w-full justify-between items-center">
          <p className="font-bold text"> 07:00 </p>
          <p className="text-[#A06ECE] text-xs font-bold">Keberangkatan</p>
        </div>
        <p className="text-sm"> 3 Maret 2023 </p>
        <p className="font-medium text-sm mt-2">{datas.departure_airport}</p>
      </div>
      {/* Departure Information */}
      {/* Airline Information */}
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
      {/* Airline Information */}
      {/* Arrive Information */}
      <div id="arrive-information">
        <div className="flex justify-between">
          <p className="text-sm font-bold"> 11:00</p>
          <p className="text-xs text-[#A06ECE] font-bold"> Kedatangan </p>
        </div>
        <p className="text-sm font-bold">3 Maret 2024</p>
        <p className="text-sm font-medium"> {datas.arrival_airport} </p>
      </div>
      <div className="my-2 border-0 border-y-2 border-y-gray-300 py-2 mx-2">
        <h3 className="text-sm font-bold mb-1"> Rincian Harga </h3>
        <div className="flex justify-between text-sm">
          <p> 2 Adults </p>
          <p> IDR 9.550.000 </p>
        </div>
        <div className="flex justify-between text-sm">
          <p> 1 Baby </p>
          <p> IDR 0 </p>
        </div>
        <div className="flex justify-between text-sm">
          <p> Tax </p>
          <p> IDR 300.000 </p>
        </div>
      </div>
      <div className="flex justify-between mx-2">
        <h3 className="font-bold"> Total </h3>
        <h3 className="font-bold text-lg text-[#7126B5]"> IDR 9.850.000 </h3>
      </div>
      {isSavedData && (
        <button className="bg-[#FF0000] font-medium py-4 w-full text-white rounded-xl mt-4">
          Lanjut Bayar
        </button>
      )}
    </div>
  );
};

export default FlightDetails;
