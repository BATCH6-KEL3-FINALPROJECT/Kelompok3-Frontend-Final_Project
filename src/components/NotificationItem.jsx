import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useSend from "../hooks/useSend";

const NotificationItem = ({
  id,
  title,
  date,
  message,
  extraMessage,
  is_read,
  onUpdateReadStatus,
}) => {
  const { loading, sendData } = useSend();
  const navigate = useNavigate();
  let iconColor;

  if (is_read) {
    iconColor = "bg-[#73CA5C]";
  } else {
    iconColor = "bg-[#FA2C5A]";
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month}, ${hours}:${minutes}`;
  };

  const handleRead = async () => {
    try {
      await sendData(`/api/v1/notification/${id}`, "PATCH");
      onUpdateReadStatus();
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <button className="w-full mb-2" onClick={handleRead}>
      <div className="flex gap-5 mx-4 text-[#8A8A8A] text-sm p-2 rounded-lg">
        <IoIosNotifications className="text-white bg-[#7126B580]/50 rounded-full p-1 text-2xl" />
        <div className="flex flex-col w-4/5">
          <div className="flex justify-between">
            <p>{title}</p>
            <div className="flex items-center gap-2">
              <p>{formatDate(date)}</p>
              <div className={`w-2 h-2 ${iconColor} rounded-full`}></div>
            </div>
          </div>
          <h4 className="text-black text-base text-left">{message}</h4>
          {extraMessage && <p>{extraMessage}</p>}
        </div>
      </div>
    </button>
  );
};

export default NotificationItem;
