import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import OtpInput from "../components/OtpInput";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";

const Otp = () => {
  return (
    <>
      <Navbar isSearch={false} isOTP={true} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col gap-5 overflow-hidden">
        <Link to="/">
          <IoMdArrowRoundBack className="text-2xl" />
        </Link>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-5 bg-gray-100 px-5 rounded-lg shadow-md w-full md:w-4/5">
            <motion.h1
              initial={{ opacity: 0, x: -75 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              viewport={{ once: true }}
              className="text-xl font-bold text-left w-full"
            >
              Masukkan OTP
            </motion.h1>
            <p className="text-center w-full">
              Ketik 6 digit kode yang dikirimkan ke J*****@gmail.com
            </p>
            <div className="flex justify-center w-full">
              <OtpInput />
            </div>
            <p className="text-center w-full">Kirim Ulang OTP dalam 60 detik</p>
            <button className="mt-4 px-6 py-2 bg-[#7126B5] text-white rounded-2xl hover:bg-[#7126B5]/50 w-full">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
