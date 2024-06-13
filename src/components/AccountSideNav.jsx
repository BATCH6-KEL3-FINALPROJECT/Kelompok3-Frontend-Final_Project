import React from "react";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

const AccountSideNav = ({ activeSection, setActiveSection, handleLogout }) => {
  return (
    <div className="flex flex-col gap-4 font-medium text-base w-full md:w-1/3">
      <button
        onClick={() => setActiveSection("profile")}
        className={`flex gap-4 items-center p-2 rounded-lg ${
          activeSection === "profile"
            ? "bg-[#A06ECE] text-white"
            : "hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300"
        }`}
      >
        <FiEdit3
          className={`${
            activeSection === "profile" ? "text-white" : "text-[#7126B5]"
          }  text-xl`}
        />
        <p>Ubah Profil</p>
      </button>
      <button
        onClick={() => setActiveSection("settings")}
        className={`flex gap-4 items-center p-2 rounded-lg ${
          activeSection === "settings"
            ? "bg-[#A06ECE] text-white"
            : "hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300"
        }`}
      >
        <IoSettingsOutline
          className={`${
            activeSection === "settings" ? "text-white" : "text-[#7126B5]"
          }  text-xl`}
        />
        <p className="text-left">Pengaturan Akun</p>
      </button>
      <button
        onClick={handleLogout}
        className={`flex gap-4 items-center p-2 rounded-lg ${
          activeSection === "logout"
            ? "bg-[#A06ECE] text-white"
            : "hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300"
        }`}
      >
        <MdLogout
          className={`${
            activeSection === "logout" ? "text-white" : "text-[#7126B5]"
          }  text-xl`}
        />
        <p>Keluar</p>
      </button>
    </div>
  );
};

export default AccountSideNav;
