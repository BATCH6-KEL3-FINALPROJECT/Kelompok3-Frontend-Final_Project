import React from "react";
import { motion } from "framer-motion";

const AccountSideNavSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -75 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 1.5 }}
      className="flex flex-col gap-4 font-medium text-base w-full md:w-1/3"
    >
      <div className="animate-pulse flex gap-4 items-center p-2 rounded-lg bg-gray-100">
        <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
        <div className="h-5 w-24 bg-gray-400 rounded-full"></div>
      </div>
      <div className="animate-pulse flex gap-4 items-center p-2 rounded-lg bg-gray-100">
        <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
        <div className="h-5 w-24 bg-gray-400 rounded-full"></div>
      </div>
      <div className="animate-pulse flex gap-4 items-center p-2 rounded-lg bg-gray-100">
        <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
        <div className="h-5 w-24 bg-gray-400 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default AccountSideNavSkeleton;
