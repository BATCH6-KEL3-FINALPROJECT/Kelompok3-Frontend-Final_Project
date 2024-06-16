import React from "react";

const PaymentSucces = () => {
  return (
    <div className="flex justify-center items-center gap-2 flex-col min-h-[50vh] px-4 py-5 md:py-8">
      <div className="flex justify-center">
        <img src="/shopping.png" alt="Shopping List" />
      </div>
      <h1 className="text-black font-medium flex flex-col text-center">
        <p className="text-[#7126B5]">Selamat!</p>
        <span>Transaksi Pembayaran Tiket sukses!</span>
      </h1>
      <button className="btn btn-active bg-[#D0B7E6] w-full md:w-[347px] h-[48px] rounded-lg text-white hover:bg-[#7126B5]">
        Terbitkan Tiket
      </button>
      <button className="btn btn-active bg-[#D0B7E6] w-full md:w-[347px] h-[48px] rounded-lg text-white hover:bg-[#7126B5]">
        Cari Penerbangan Lain
      </button>
    </div>
  );
};

export default PaymentSucces;
