import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Login = () => {
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

  const dummyUsers = [
    { email: "user1@gmail.com", password: "password123A" },
    { email: "user2@gmail.com", password: "password123B" },
    { email: "user3@gmail.com", password: "password123C" },
    { email: "user4@gmail.com", password: "password123D" },
    { email: "user5@gmail.com", password: "password123E" },
    { email: "user6@gmail.com", password: "password123F" },
    { email: "user7@gmail.com", password: "password123G" },
    { email: "user8@gmail.com", password: "password123H" },
    { email: "user9@gmail.com", password: "password123I" },
    { email: "user10@gmail.com", password: "password123J" },
  ];

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = dummyUsers.find((u) => u.email === login.email);

    if (!user) {
      setIsSuccess(false);
      setMessage("Alamat email tidak terdaftar!");
      setErrors({ email: true, password: false });
    } else if (user.password !== login.password) {
      setIsSuccess(false);
      setMessage("Maaf, kata sandi salah!");
      setErrors({ email: false, password: true });
    } else {
      setIsSuccess(true);
      setMessage("Login berhasil!");
      setErrors({ email: false, password: false });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
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
              Login berhasil
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
          <div>
            <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-black md:text-2xl">
              <Link
                to="/"
                className="bg-[#7126B5] rounded-full p-1 text-white hover:bg-[#7126B5]/90"
              >
                <IoMdArrowRoundBack />
              </Link>
              Masuk
            </h1>
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
          </div>
          <div className="relative">
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

export default Login;
