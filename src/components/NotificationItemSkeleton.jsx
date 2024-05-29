import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { motion } from "framer-motion";

const NotificationItemSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      animate={{
        scale: [1, 1.5, 1.5, 1, 1],
      }}
      role="status"
      className="flex gap-5 mx-4 text-[#8A8A8A] text-sm p-2 rounded-lg animate-pulse"
    >
      <IoIosNotifications className="text-white bg-gray-600 rounded-full p-1 text-2xl" />
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
    </motion.div>
  );
};

export default NotificationItemSkeleton;
