import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useSend from "../hooks/useSend";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";

const Reset = () => {
  const [searchParams] = useSearchParams();
  const { loading, sendData } = useSend();
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({
    password: false,
    confPassword: false,
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken && checkToken !== "undefined") {
      navigate("/");
    }

    if (
      searchParams.size === 0 &&
      !searchParams.has("rpkey") &&
      searchParams.get("rpkey") == null
    ) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (newPassword.password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      setIsSuccess(false);
      setMessage("Password min 8 karakter!");
      hasError = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: false }));
    }

    if (newPassword.password !== newPassword.confPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confPassword: true }));
      setIsSuccess(false);
      setMessage("Password tidak cocok!");
      hasError = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confPassword: false }));
    }

    if (!hasError) {
      try {
        const response = await sendData(
          `/api/v1/auth/reset-password?rpkey=${searchParams.get("rpkey")}`,
          "PUT",
          newPassword
        );
        if (response && response.statusCode === 200) {
          setIsSuccess(true);
          setMessage("Reset password berhasil!");
        } else {
          setIsSuccess(false);
          setMessage("Invalid Token");
        }
      } catch (err) {
        if (err.statusCode === 500) {
          navigate("/error");
        } else {
          console.log(err);
          setIsSuccess(false);
          setMessage("Something went wrong. Please try again.");
        }
      }
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -75 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.25 }}
        className="hidden md:block w-1/2 h-screen"
      >
        <img
          src="/Auth_Skypass_Background.png"
          alt="Auth Background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      {/* {isSuccess && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="fixed flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 px-40 rounded-md shadow-md z-50"
          >
            <IoMdCheckmarkCircle className="text-green-500 text-8xl md:text-9xl" />
            <h2 className="text-center text-green-500 font-bold text-3xl md:text-4xl">
              Reset Password berhasil
            </h2>
          </motion.div>
        </>
      )} */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 md:from-white md:to-white h-screen">
        <motion.form
          initial={{ opacity: 0, x: 75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-4 md:space-y-6 w-full max-w-md p-6 py-10 bg-white md:bg-transparent rounded-md md:rounded-none shadow-md md:shadow-none"
          onSubmit={handleSubmit}
        >
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-black md:text-2xl">
              <Link
                to="/login"
                className="bg-[#7126B5] rounded-full p-1 text-white hover:bg-[#7126B5]/90"
              >
                <IoMdArrowRoundBack />
              </Link>
              Reset Password
            </h1>
          </motion.div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="sr-only"
            autoComplete="username"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-normal text-black"
            >
              Masukkan Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={`bg-gray-50 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
                placeholder="Password"
                value={newPassword.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-2xl text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <label
              htmlFor="confPassword"
              className="flex justify-between mb-2 text-xs text-black"
            >
              Ulangi Password Baru
            </label>
            <div className="relative">
              <input
                type={showConfPassword ? "text" : "password"}
                name="confPassword"
                id="confPassword"
                placeholder="Konfirmasi Password"
                className={`bg-gray-50 border ${
                  errors.confPassword ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
                value={newPassword.confPassword}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-2xl text-gray-600"
                onClick={() => setShowConfPassword(!showConfPassword)}
              >
                {showConfPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.25 }}
            type="submit"
            disabled={loading || isSuccess}
            className={`w-full text-white bg-[#7126B5] hover:bg-[#7126B5]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading || isSuccess ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Simpan"}
          </motion.button>
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
        </motion.form>
      </div>
    </div>
  );
};

export default Reset;
