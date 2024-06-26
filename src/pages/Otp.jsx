import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import OtpInput from "../components/OtpInput";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import useSend from "../hooks/useSend";
import { jwtDecode } from "jwt-decode";

const Otp = () => {
  const { loading, sendData } = useSend();
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkToken = cookies.get("token");
        if (!checkToken || checkToken === "undefined") {
          navigate("/");
          return;
        }
        const decoded = jwtDecode(checkToken);
        if (decoded.isVerified) {
          navigate("/account");
        } else {
          setEmail(decoded.email);
        }
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    return `${localPart.charAt(0)}*****@${domain}`;
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate(`/account`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const otpString = otp.join("");
      const sendVerify = { email, otp: otpString };
      const response = await sendData(
        "/api/v1/auth/verify",
        "POST",
        sendVerify
      );
      if (response && response.statusCode === 200) {
        setIsSuccess(true);
        setMessage(`${response.message}`);
      } else {
        setIsSuccess(false);
        setMessage(`${response.message}`);
      }
    } catch (err) {
      navigate("/error")
    }
  };

  const handleResend = async () => {
    try {
      const resendOTP = await sendData("/api/v1/auth/resend-otp", "POST", {
        email: email,
      });
      setCountdown(60);
    } catch (err) {
      navigate("/error")
    }
  };

  return (
    <>
      <Navbar isSearch={false} isOTP={true} />
      <div className="w-11/12 md:w-2/3 mx-auto flex flex-col h-[75vh] justify-center overflow-hidden">
        <div>
          <button className="p-3">
            <Link to="/account">
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-10 bg-gray-100 px-5 rounded-lg shadow-md w-full md:w-4/5">
            <motion.h1
              initial={{ opacity: 0, x: -75 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              viewport={{ once: true }}
              className="text-xl font-bold text-left w-full"
            >
              Masukkan OTP
            </motion.h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-20">
              <div className="flex flex-col gap-4">
                <p className="text-center text-sm w-full">
                  Ketik 6 digit kode yang dikirimkan ke{" "}
                  <span className="font-bold">{email && maskEmail(email)}</span>
                </p>
                <div className="flex justify-center w-full">
                  <OtpInput onChange={(updatedOtp) => setOtp(updatedOtp)} />
                </div>
                <p className="text-center w-full text-sm">
                  {countdown > 0 ? (
                    <>Kirim Ulang OTP dalam {countdown} detik</>
                  ) : (
                    <button
                      type="button"
                      className="text-[#FF0000] font-bold"
                      onClick={handleResend}
                    >
                      Kirim Ulang OTP
                    </button>
                  )}
                </p>
              </div>
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-[#7126B5] text-white rounded-2xl hover:bg-[#7126B5]/50 w-full"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
        {isSuccess !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex justify-center mt-4"
          >
            <div
              className={`${
                isSuccess ? "bg-[#73CA5C]" : "bg-[#FF0000]"
              } text-center text-white text-sm font-medium px-6 py-4 rounded-xl inline-block`}
            >
              <h1>{message}</h1>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Otp;
