import React from "react";
import { IoIosNotifications } from "react-icons/io";

const NotificationItem = ({ title, date, message, extraMessage }) => {
  let iconColor;

  if (title === "Promosi") {
    iconColor = "bg-[#73CA5C]";
  } else if (title === "Notifikasi") {
    iconColor = "bg-[#FA2C5A]";
  }

  return (
    <div className="flex gap-5 mx-4 text-[#8A8A8A] text-sm p-2 rounded-lg">
      <IoIosNotifications className="text-white bg-[#7126B580]/50 rounded-full p-1 text-2xl" />
      <div className="flex flex-col w-4/5">
        <div className="flex justify-between">
          <p>{title}</p>
          <div className="flex items-center gap-2">
            <p>{date}</p>
            <div className={`w-2 h-2 ${iconColor} rounded-full`}></div>
          </div>
        </div>
        <h4 className="text-black text-base">{message}</h4>
        {extraMessage && <p>{extraMessage}</p>}
      </div>
    </div>
  );
};

export default NotificationItem;
