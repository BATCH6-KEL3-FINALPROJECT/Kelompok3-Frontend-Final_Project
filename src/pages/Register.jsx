import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useSend from "../hooks/useSend";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";

const Register = () => {
  const { loading, sendData } = useSend();
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone_number: false,
    password: false,
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken && checkToken !== "undefined") {
      navigate("/");
    }

    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setRegisterData((prev) => ({ ...prev, phone_number: value }));
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      name: false,
      email: false,
      phone_number: false,
      password: false,
    };
    let errorMessage = "";

    if (
      registerData.name.trim() === "" &&
      registerData.email.trim() === "" &&
      registerData.phone_number.trim() === "" &&
      registerData.password.trim() === ""
    ) {
      errorMessage = "Masukkan Data Anda!";
      valid = false;
    } else {
      if (registerData.name.trim() === "") {
        newErrors.name = true;
        errorMessage = "Field Nama Tidak Boleh Kosong!";
        valid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (registerData.email.trim() === "") {
        newErrors.email = true;
        errorMessage = "Field Email Tidak Boleh Kosong!";
        valid = false;
      } else if (!emailRegex.test(registerData.email)) {
        newErrors.email = true;
        errorMessage = "Format Email Tidak Valid!";
        valid = false;
      }

      if (registerData.phone_number.trim() === "") {
        newErrors.phone_number = true;
        errorMessage = "Field Telepon Tidak Boleh Kosong!";
        valid = false;
      }

      if (registerData.password.trim() === "") {
        newErrors.password = true;
        errorMessage = "Tolong Masukkan Password!";
        valid = false;
      } else if (registerData.password.length < 8) {
        newErrors.password = true;
        errorMessage = "Password min 8 karakter!";
        valid = false;
      }
    }

    setErrors(newErrors);
    setMessage(errorMessage);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateInputs()) {
      try {
        const response = await sendData(
          "/api/v1/auth/register",
          "POST",
          registerData
        );
        if (response && response.statusCode === 201) {
          setIsSuccess(true);
          setMessage("Register berhasil!");
        } else {
          setIsSuccess(false);
          setMessage(`${response.data.message}`);
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
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    }
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
      {isSuccess && (
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
              Register berhasil
            </h2>
          </motion.div>
        </>
      )}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 md:from-white md:to-white h-screen">
        <motion.form
          initial={{ opacity: 0, x: 75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-4 md:space-y-6 w-full max-w-md p-6 py-10 bg-white md:bg-transparent rounded-md md:rounded-none shadow-md md:shadow-none"
          onSubmit={handleSubmit}
          method="POST"
        >
          <motion.h1
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-black md:text-2xl"
          >
            <Link
              to="/"
              className="bg-[#7126B5] rounded-full p-1 text-white hover:bg-[#7126B5]/90"
            >
              <IoMdArrowRoundBack />
            </Link>
            Daftar
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <label
              htmlFor="name"
              className="block mb-2 text-xs font-normal text-black"
            >
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`bg-gray-50 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
              placeholder="Nama Lengkap"
              value={registerData.name}
              onChange={handleChange}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <label
              htmlFor="email"
              className="block mb-2 text-xs font-normal text-black"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`bg-gray-50 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
              placeholder="Contoh: johndee@gmail.com"
              value={registerData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.25 }}
          >
            <label
              htmlFor="telepon"
              className="block mb-2 text-xs font-normal text-black"
            >
              Telepon
            </label>
            <PhoneInput
              country={"id"}
              value={registerData.phone_number}
              onChange={handlePhoneChange}
              inputProps={{
                name: "telepon",
                required: true,
                autoFocus: false,
              }}
              containerClass="w-full"
              inputClass={`w-full bg-gray-50 border border ${
                errors.phone_number ? "text-red-500" : "text-gray-900"
              }  sm:text-sm rounded-lg p-2.5`}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="relative"
          >
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-normal text-black"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Buat Password"
              className={`bg-gray-50 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
              value={registerData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute top-1/2 transform right-3 text-2xl text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
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
            {loading ? "Loading..." : "Daftar"}{" "}
          </motion.button>
          <motion.p
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="text-xs font-light text-black text-center"
          >
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-medium text-[#7126B5] hover:underline"
            >
              Masuk di sini
            </Link>
          </motion.p>
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

export default Register;
