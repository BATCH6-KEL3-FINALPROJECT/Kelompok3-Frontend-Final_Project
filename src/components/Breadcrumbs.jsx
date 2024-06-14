import React from "react";

const Breadcrumbs = ({ isPayment, isSuccess }) => {
  return (
    <div className="py-5 text-lg ms-7 xl:ms-[200px] mt-20 2xl:ms-[550px]">
      <ul className="flex gap-2">
        <li className="font-bold"> Isi Data Diri </li>
        <li className={`${isPayment ? "font-bold" : "font-semibold text-slate-500"}`}> {">"} Bayar </li>
        <li className={`${isSuccess ? "font-bold" : "font-semibold text-slate-500"}`}> {">"} Selesai </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
