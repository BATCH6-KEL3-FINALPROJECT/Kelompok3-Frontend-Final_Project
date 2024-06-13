import React from "react";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const EditSearch = ({ origin, destination, passengers, classType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -75 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.75 }}
      viewport={{ once: true }}
      className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 md:p-3 rounded-lg"
    >
      <Link to="/">
        <IoMdArrowRoundBack className="text-2xl" />
      </Link>
      <h3 className="text-base">
        {origin} {">"} {destination} - {passengers} Penumpang - {classType}
      </h3>
    </motion.div>
  );
};

export default EditSearch;
