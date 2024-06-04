import React from "react";
import { motion } from "framer-motion";

const AccountContentSkeleton = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 75 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 1.5 }}
        className="flex-grow"
      >
        <div className="flex flex-col gap-5">
          <div className="animate-pulse bg-gray-300 h-8 w-2/4 rounded-md mb-2"></div>
          <div className="animate-pulse bg-[#A06ECE] rounded-t-xl h-8 w-full"></div>
          <div className="animate-pulse bg-white border border-gray-300 p-4 rounded-b-xl">
            <div className="flex flex-col gap-4 mb-5">
              <div className="flex flex-col">
                <div className="bg-gray-300 h-4 w-3/4 rounded-md mb-2"></div>
                <div className="bg-gray-300 h-8 w-full rounded-md"></div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-300 h-4 w-3/4 rounded-md mb-2"></div>
                <div className="bg-gray-300 h-8 w-full rounded-md"></div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-300 h-4 w-3/4 rounded-md mb-2"></div>
                <div className="bg-gray-300 h-8 w-full rounded-md"></div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-300 h-12 w-32 rounded-xl"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AccountContentSkeleton;
