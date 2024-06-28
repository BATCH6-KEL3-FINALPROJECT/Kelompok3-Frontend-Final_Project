import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSend from "../hooks/useSend";
import Cookies from "universal-cookie";

const StatusButton = ({ status, bookingId, paymentId, seatClass }) => {
  const { loading, sendData } = useSend();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  let buttonStyle = "";
  let buttonText = "";
  let navigateTo = "";

  const capitalizedSeatClass =
    seatClass.charAt(0).toUpperCase() + seatClass.slice(1);

  switch (status.toLowerCase()) {
    case "booked":
      buttonStyle = "bg-[#7126B5] hover:bg-[#5b2092]";
      buttonText = "Cetak Ticket";
      navigateTo = "/riwayat-pesanan";
      break;
    case "pending":
      buttonStyle = "bg-red-500 hover:bg-red-700";
      buttonText = "Lanjut Bayar";
      navigateTo = `/payment?payment_id=${paymentId}&seat_class=${capitalizedSeatClass}`;
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

  const handleClick = async () => {
    if (status.toLowerCase() === "booked") {
      setIsLoading(true);
      try {
        const response = await sendData(
          `api/v1/ticket/generate/${bookingId}`,
          "POST",
          null,
          cookies.get("token")
        );
      } catch (error) {
        if (error.statusCode === 500) {
          navigate("/error");
        } else {
          console.log("Error fetching ticket:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    navigate(navigateTo);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-active w-full h-[48px] rounded-lg text-white ${buttonStyle}`}
      disabled={isLoading}
    >
      {loading && isLoading ? "Loading..." : buttonText}
    </button>
  );
};

export default StatusButton;
