import React from "react";
import { useNavigate } from "react-router-dom";

const StatusButton = ({ status }) => {
  const navigate = useNavigate();

  let buttonStyle = "";
  let buttonText = "";
  let navigateTo = "";

  switch (status.toLowerCase()) {
    case "booked":
      buttonStyle = "bg-[#7126B5] hover:bg-[#5b2092]";
      buttonText = "Cetak Ticket";
      navigateTo = "/";
      break;
    case "pending":
      buttonStyle = "bg-red-500 hover:bg-red-700";
      buttonText = "Lanjut Bayar";
      navigateTo = "/payment";
      break;
    case "cancelled":
      buttonStyle = "bg-gray-500 hover:bg-gray-700";
      buttonText = "Pesan Kembali";
      navigateTo = "/";
      break;
    case "confirmed":
      buttonStyle = "bg-gray-500 hover:bg-gray-700";
      buttonText = "Pesan Kembali";
      navigateTo = "/";
      break;

    default:
      buttonStyle = "bg-[#D0B7E6] hover:bg-[#B99CCB]";
      buttonText = "Unknown Status";
  }

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-active w-full  h-[48px] rounded-lg text-white ${buttonStyle}`}
    >
      {buttonText}
    </button>
  );
};

export default StatusButton;
