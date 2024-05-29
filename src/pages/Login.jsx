import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useSend from "../hooks/useSend";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";

const Login = () => {
  const { loading, error, statusCode, sendData } = useSend();
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      navigate("/");
    }

    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await sendData("/api/v1/auth/login", "POST", login);
      if (response && response.token) {
        cookies.set("token", response.token, {
          path: "/",
          expires: new Date(Date.now() + 604800000),
        });
        setIsSuccess(true);
        setMessage("Login berhasil!");
        setErrors({ email: false, password: false });
      } else {
        setIsSuccess(false);
        if (error == null) {
          setMessage("Terjadi Kesalahan Ketika Login!");
        } else {
          setMessage(`${error}`);
        }
        if (statusCode === 401) {
          setErrors({ email: false, password: true });
        } else if (statusCode === 404) {
          setErrors({ email: true, password: false });
        } else {
          setErrors({ email: true, password: true });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
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
          src="/Auth_Side_Background.png"
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
              Login berhasil
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
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-black md:text-2xl">
              <Link
                to="/"
                className="bg-[#7126B5] rounded-full p-1 text-white hover:bg-[#7126B5]/90"
              >
                <IoMdArrowRoundBack />
              </Link>
              Masuk
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <label
              htmlFor="email"
              className="block mb-2 text-xs font-normal text-black"
            >
              Email/No Telepon
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`bg-gray-50 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
              placeholder="Contoh: johndoe@gmail.com"
              value={login.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="relative"
          >
            <label
              htmlFor="password"
              className="flex justify-between mb-2 text-xs text-black"
            >
              <p className="font-normal">Password</p>
              <Link to="/reset-password" className="text-[#7126B5] font-medium">
                Lupa Kata Sandi
              </Link>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Masukkan password"
              className={`bg-gray-50 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
              value={login.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
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
            disabled={loading}
            className={`w-full text-white bg-[#7126B5] hover:bg-[#7126B5]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Masuk"}{" "}
          </motion.button>
          <motion.p
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="text-sm font-light text-black text-center"
          >
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-medium text-[#7126B5] hover:underline"
            >
              Daftar di sini
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

export default Login;
