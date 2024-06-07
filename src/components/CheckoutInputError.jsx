import React from "react";
import { motion } from "framer-motion";

const CheckoutInputError = ({ message }) => {
  const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
  };

  return (
    <motion.p
      className="px-2 font-semibold text-red-500 text-xs"
      {...framer_error}
    >
      * {message}
    </motion.p>
  );
};

export default CheckoutInputError;
