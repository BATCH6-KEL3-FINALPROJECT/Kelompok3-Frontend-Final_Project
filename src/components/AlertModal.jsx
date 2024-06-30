import React from "react";

const AlertModal = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60 m-2 md:m-0">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full md:w-[400px]">
        <div className="flex justify-center">
          <img className="w-[150px]" src="/shopping.png" alt="Ticket" />
        </div>
        <div className="justify-center flex">
          <h2 className="mt-2 font-bold text-[#7126B5]">
            {" "}
            Tiket Berhasil Dikirim{" "}
          </h2>
        </div>
        <p className="mb-4 text-center">Silakan Periksa Email Anda</p>

        <div className="flex justify-center">
          {" "}
          <button
            onClick={onClose}
            className="bg-[#7126B5] hover:bg-[#5b2092] text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
