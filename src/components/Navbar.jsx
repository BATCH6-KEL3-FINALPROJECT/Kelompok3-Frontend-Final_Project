import React, { useState } from "react";
import navbarLogo from "../../public/Navbar_Logo.png";
import InputSearch from "./InputSearch";
import navbarBtnLogo from "../../public/Navbar_Button_Icon.svg";
import NavbarItems from "./NavbarItems";
import ListSvg from "./svg/ListSvg";
import BellSvg from "./svg/BellSvg";
import UserSvg from "./svg/UserSvg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <header className="flex justify-between py-4 px-28 items-center">
      <div className="flex md:ps-10 gap-10 ">
        <Link to="/">
          <img src={navbarLogo} alt="navbar logo" width={98} height={53} />
        </Link>
        <InputSearch />
      </div>
      <div>
        {isLogin ? (
          <NavbarItems>
            <Link to="/history">
              <ListSvg isActive={false} />
            </Link>
            <Link to="/notification">
              <BellSvg isActive={false} />
            </Link>
            <Link to="/account">
              <UserSvg isActive={false} />
            </Link>
          </NavbarItems>
        ) : (
          <button className="bg-[#7126B5] py-4 px-5 rounded-2xl text-white flex gap-2 items-center hover:opacity-80 transition-all">
            <img src={navbarBtnLogo} alt="button icon" width={20} height={20} />
            Masuk
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
