import React from "react";
import SeatSelection from "../components/SeatSelection";
import Loading from "../components/Loading";

const Test = () => {
  return (
    <div>
      <Loading />
      <h1 className="text-2xl font-bold text-center mt-4">
        Pemilihan Kursi Pesawat
      </h1>
      <SeatSelection />
    </div>
  );
};

export default Test;
