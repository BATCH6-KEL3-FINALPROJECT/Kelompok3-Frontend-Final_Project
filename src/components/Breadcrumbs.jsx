import React from "react";

const Breadcrumbs = ({ isPayment, isSuccess }) => {
  return (
    <div className="py-5 text-lg ps-5 md:ps-32 xl:ps-[300px]">
      <ul className="flex gap-2 text-sm md:text-base">
        <li className="font-bold"> Isi Data Diri </li>
        <li
          className={`${
            isPayment ? "font-bold" : "font-semibold text-slate-500"
          }`}
        >
          {">"} Bayar
        </li>
        <li
          className={`${
            isSuccess ? "font-bold" : "font-semibold text-slate-500"
          }`}
        >
          {">"} Selesai
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
