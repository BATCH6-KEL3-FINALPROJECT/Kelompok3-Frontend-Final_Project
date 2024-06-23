import React from "react";
import { useNavigate } from "react-router-dom";

const HistoryEmpty = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-col min-h-[50vh] px-4 py-5 md:py-8">
      <div className="flex justify-center">
        <img src="/shopping.png" alt="Shopping List" />
      </div>
      <h1 className="text-black font-medium flex flex-col text-center">
        <p className="text-[#7126B5]">Oops! Riwayat pesanan kosong!</p>
        <span>Anda belum melakukan pemesanan penerbangan</span>
      </h1>
      <button
        onClick={navigateToHome}
        className="btn btn-active bg-[#7126B5] w-full md:w-[347px] h-[48px] rounded-lg text-white hover:bg-[#8559ae]"
      >
        Cari Penerbangan Lain
      </button>
    </div>
  );
};

export default HistoryEmpty;
