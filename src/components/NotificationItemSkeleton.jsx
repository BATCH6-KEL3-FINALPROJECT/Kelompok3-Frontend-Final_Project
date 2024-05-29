import React from "react";
import { IoIosNotifications } from "react-icons/io";

const NotificationItemSkeleton = () => {
  return (
    <div
      role="status"
      className="flex gap-5 mx-4 text-[#8A8A8A] text-sm p-2 rounded-lg animate-pulse"
    >
      <IoIosNotifications className="text-white bg-gray-700 rounded-full p-1 text-2xl" />
      <div className="flex flex-col w-4/5 space-y-2">
        <div className="flex justify-between">
          <div className="h-2.5 bg-gray-400 rounded-full w-24"></div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 bg-gray-400 rounded-full w-12"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-600 rounded w-full"></div>
        <div className="h-3 bg-gray-400 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default NotificationItemSkeleton;
