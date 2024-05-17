import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
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
          <div>
            <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight text-black md:text-2xl">
              Masuk
            </h1>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 font-bold text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Contoh: johndoe@gmail.com"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Masukkan password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#7126B5] hover:bg-[#7126B5]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Masuk
          </button>
          <p className="text-sm font-light text-black text-center">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-medium text-[#7126B5] hover:underline"
            >
              Daftar di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
