import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Send from "./pages/Send";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Reset from "./pages/Reset";
import Riwayat from "./pages/Riwayat";
import Notification from "./pages/Notification";
import Account from "./pages/Account";
import Payment from "./pages/Payment";
import Psuccess from "./pages/Psuccess";
import Perror from "./pages/Perror";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/send-email" element={<Send />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/otp" element={<Otp />}></Route>
        <Route path="/reset-password" element={<Reset />}></Route>
        <Route path="/riwayat-pesanan" element={<Riwayat />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/payment-success" element={<Psuccess />}></Route>
        <Route path="/payment-error" element={<Perror />}></Route>
        <Route
          path="*"
          element={
            <div className="h-screen flex flex-col justify-center items-center">
              <img
                src="/404_page.jpg"
                alt="404 Not Found"
                className="w-4/5 md:w-3/5 h-auto"
              />
              <Link
                to="/"
                className="px-16 md:px-40 py-1 md:py-2 font-bold bg-violet-400 border-4 text-white rounded-xl shadow-md hover:bg-violet-600"
              >
                Go to Home
              </Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
