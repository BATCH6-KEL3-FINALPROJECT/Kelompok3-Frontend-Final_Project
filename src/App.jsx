import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Reset from "./pages/Reset";
import Riwayat from "./pages/Riwayat";
import Notification from "./pages/Notification";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/otp" element={<Otp />}></Route>
        <Route path="/reset-password" element={<Reset />}></Route>
        <Route path="/riwayat-pesanan" element={<Riwayat />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route
          path="*"
          element={
            <div className="grid place-items-center">For 404 Not Found</div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
