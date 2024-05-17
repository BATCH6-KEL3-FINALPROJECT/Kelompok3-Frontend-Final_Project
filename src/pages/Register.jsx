import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    nama: "",
    email: "",
    telepon: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 h-screen">
        <img
          src="/Auth_Side_Background.png"
          alt="Auth Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center bg-white h-screen">
        <form
          className="space-y-4 md:space-y-6 w-full max-w-md p-6"
          onSubmit={handleSubmit}
          method="POST"
        >
          <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight text-black md:text-2xl">
            Daftar
          </h1>
          <div>
            <label
              htmlFor="nama"
              className="block mb-2 text-sm font-medium text-black"
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
              onChange={(e) =>
                setRegisterData({ ...registerData, nama: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black"
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
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="telepon"
              className="block mb-2 text-sm font-medium text-black"
            >
              Telepon
            </label>
            <input
              type="tel"
              name="telepon"
              id="telepon"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="+62 . "
              value={registerData.telepon}
              onChange={(e) =>
                setRegisterData({ ...registerData, telepon: e.target.value })
              }
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Buat Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute top-7 right-0 text-3xl flex items-center p-2 text-gray-600"
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
          <p className="text-sm font-light text-black text-center">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-medium text-[#7126B5] hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
