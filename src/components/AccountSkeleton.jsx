import React from "react";
import { motion } from "framer-motion";

const AccountSkeleton = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -75 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 1.5 }}
        className="flex flex-col gap-4 font-medium text-base w-full md:w-1/3"
      >
        <div className="animate-pulse flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300">
          <div className="h-5 w-5 bg-gray-400 rounded-full"></div>
          <div className="h-5 w-24 bg-gray-400 rounded-full"></div>
        </div>
        <div className="animate-pulse flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300">
          <div className="h-5 w-5 bg-gray-400 rounded-full"></div>
          <div className="h-5 w-24 bg-gray-400 rounded-full"></div>
        </div>
        <div className="animate-pulse flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300">
          <div className="h-5 w-5 bg-gray-400 rounded-full"></div>
          <div className="h-5 w-24 bg-gray-400 rounded-full"></div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 75 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 1.5 }}
        className="flex-grow"
      >
        <div className="flex flex-col gap-5">
          <div className="animate-pulse bg-[#A06ECE] rounded-t-xl text-white text-base font-medium px-4 py-2">
            Data Diri
          </div>
          <div className="animate-pulse bg-white border border-gray-300 p-4 rounded-b-xl">
            <div className="flex flex-col gap-4 mb-5">
              <div className="flex flex-col">
                <div className="bg-gray-300 h-8 w-3/4 rounded-md"></div>
                <div className="h-8 w-full bg-gray-300 rounded-md"></div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-300 h-8 w-3/4 rounded-md"></div>
                <div className="h-8 w-full bg-gray-300 rounded-md"></div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-300 h-8 w-3/4 rounded-md"></div>
                <div className="h-8 w-full bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-[#4B1979] text-base font-medium text-white mx-auto px-12 p-3 rounded-xl hover:bg-[#7126B5] transition-all duration-300 pointer-events-none">
                Simpan
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AccountSkeleton;
