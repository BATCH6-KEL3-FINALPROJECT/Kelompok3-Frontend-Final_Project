import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Register = () => {
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    nama: "",
    email: "",
    telepon: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    nama: false,
    email: false,
    telepon: false,
    password: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
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
    setRegisterData((prev) => ({ ...prev, telepon: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (registerData.password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      setIsSuccess(false);
      setMessage("Password min 8 karakter!");
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: false }));
    }

    setIsSuccess(true);
    setMessage("Login berhasil!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block w-1/2 h-screen">
        <img
          src="/Auth_Side_Background.png"
          alt="Auth Background"
          className="w-full h-full object-cover"
        />
      </div>
      {isSuccess && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 px-40 rounded-md shadow-md z-50">
            <IoMdCheckmarkCircle className="text-green-500 text-8xl md:text-9xl" />
            <h2 className="text-center text-green-500 font-bold text-3xl md:text-4xl">
              Register berhasil
            </h2>
          </div>
        </>
      )}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 md:from-white md:to-white h-screen">
        <form
          className="space-y-4 md:space-y-6 w-full max-w-md p-6 py-10 bg-white md:bg-transparent rounded-md md:rounded-none shadow-md md:shadow-none"
          onSubmit={handleSubmit}
          method="POST"
        >
          <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-black md:text-2xl">
            <Link
              to="/"
              className="bg-[#7126B5] rounded-full p-1 text-white hover:bg-[#7126B5]/90"
            >
              <IoMdArrowRoundBack />
            </Link>
            Daftar
          </h1>
          <div>
            <label
              htmlFor="nama"
              className="block mb-2 text-xs font-normal text-black"
            >
              Nama
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Nama Lengkap"
              value={registerData.nama}
              onChange={handleChange}
              required
            />
          </div>
          <div>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Contoh: johndee@gmail.com"
              value={registerData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="telepon"
              className="block mb-2 text-xs font-normal text-black"
            >
              Telepon
            </label>
            <PhoneInput
              country={"id"}
              value={registerData.telepon}
              onChange={handlePhoneChange}
              inputProps={{
                name: "telepon",
                required: true,
                autoFocus: false,
              }}
              containerClass="w-full"
              inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5"
            />
          </div>
          <div className="relative">
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
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute top-1/2 transform right-3 text-2xl text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#7126B5] hover:bg-[#7126B5]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Daftar
          </button>
          <p className="text-xs font-light text-black text-center">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-medium text-[#7126B5] hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
          {isSuccess !== null && (
            <div className="flex justify-center mt-4">
              <div
                className={`${
                  isSuccess ? "bg-[#73CA5C]" : "bg-[#FF0000]"
                } text-center text-white text-sm font-medium px-6 py-4 rounded-xl inline-block`}
              >
                <h1>{message}</h1>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
