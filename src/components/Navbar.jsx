import React from "react";
import InputSearch from "./InputSearch";
import NavbarItems from "./NavbarItems";
import ListSvg from "./svg/ListSvg";
import BellSvg from "./svg/BellSvg";
import UserSvg from "./svg/UserSvg";
import { Link } from "react-router-dom";

const Navbar = ({
  isNotification,
  isAccount,
  isHistory,
  isLogin,
  isSearch,
}) => {
  return (
    <nav className="flex justify-between py-4 px-2 xl:px-28 md:items-center">
      <div className="flex flex-1 flex-col md:flex-row md:ps-10 gap-3 md:gap-10 ">
        <Link to="/">
          <img
            src="/Navbar_Logo.png"
            alt="navbar logo"
            width={98}
            height={53}
          />
        </Link>
        {isSearch && (
          <InputSearch placeholder="Cari disini....." isSearch={isSearch} />
        )}
      </div>
      <div>
        {isLogin ? (
          <NavbarItems>
            <Link to="/riwayat-pesanan">
              <ListSvg isActive={isHistory} />
            </Link>
            <Link to="/notifikasi">
              <BellSvg isActive={isNotification} />
            </Link>
            <Link to="/akun">
              <UserSvg isActive={isAccount} />
            </Link>
          </NavbarItems>
        ) : (
          <Link
            to="/login"
            className="bg-[#7126B5] py-3 px-4 rounded-xl text-white flex gap-2 items-center hover:opacity-80 transition-all"
          >
            <img
              src="/Navbar_Button_Icon.svg"
              alt="button icon"
              width={20}
              height={20}
            />
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
