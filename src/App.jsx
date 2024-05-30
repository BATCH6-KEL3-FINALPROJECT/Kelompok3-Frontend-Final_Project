import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Register from "./pages/Register";
import Riwayat from "./pages/Riwayat";
import Notifikasi from "./pages/Notifikasi";
import Akun from "./pages/Akun";
import Otp from "./pages/Otp";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset-password" element={<Reset />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/riwayat-pesanan" element={<Riwayat />}></Route>
        <Route path="/notifikasi" element={<Notifikasi />}></Route>
        <Route path="/akun" element={<Akun />}></Route>
        <Route path="/register/OTP" element={<Otp />}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
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
