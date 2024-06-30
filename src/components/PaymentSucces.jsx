import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSucces = () => {
  const navigate = useNavigate();

  const handleTicket = () => {
    navigate("/riwayat-pesanan");
  };

  const handleSearchAgain = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-col min-h-[50vh] px-4 py-5 md:py-8 w-11/12 mx-auto md:w-full">
      <div className="flex justify-center">
        <img src="/shopping.png" alt="Shopping List" />
      </div>
      <h1 className="text-black font-medium flex flex-col text-center">
        <p className="text-[#7126B5]">Selamat!</p>
        <span>Transaksi Pembayaran Tiket sukses!</span>
      </h1>
      <button
        onClick={handleTicket}
        className="btn btn-active bg-[#7126B5] md:w-96 h-[48px] rounded-lg text-white hover:bg-[#5b2092] w-3/4 mx-auto"
      >
        Lihat Pesanan
      </button>
      <button
        onClick={handleSearchAgain}
        className="btn btn-active bg-[#7126B5] md:w-96 h-[48px] rounded-lg text-white hover:bg-[#5b2092] w-3/4 mx-auto"
      >
        Cari Penerbangan Lain
      </button>
    </div>
  );
};

export default PaymentSucces;
