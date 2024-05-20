import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

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

    if (newPassword.password !== newPassword.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: true }));
      setIsSuccess(false);
      setMessage("Password tidak cocok!");
      hasError = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: false }));
    }

    if (!hasError) {
      setIsSuccess(true);
      setMessage("Reset password berhasil!");
    }
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
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white h-screen">
        <form
          className="space-y-4 md:space-y-6 w-full max-w-md p-6"
          onSubmit={handleSubmit}
          method="POST"
        >
          <div>
            <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight text-black md:text-2xl">
              Reset Password
            </h1>
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-normal text-black"
            >
              Masukkan Password Baru
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`bg-gray-50 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
              placeholder="Password"
              value={newPassword.password}
              onChange={(e) =>
                setNewPassword({ ...newPassword, password: e.target.value })
              }
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="flex justify-between mb-2 text-xs text-black"
            >
              Ulangi Password Baru
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Konfirmasi Password"
              className={`bg-gray-50 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
              value={newPassword.confirmPassword}
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  confirmPassword: e.target.value,
                })
              }
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#7126B5] hover:bg-[#7126B5]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Simpan
          </button>
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

export default Reset;
