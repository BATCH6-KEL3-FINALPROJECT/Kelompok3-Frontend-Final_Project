import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

const AccountItem = ({
  handleLogout,
  handleChange,
  handleSubmit,
  profile,
  setProfile,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4 font-medium text-base w-full md:w-1/3">
        <button className="flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300">
          <FiEdit3 className="text-[#7126B5] text-xl" /> <p>Ubah Profil</p>
        </button>
        <button className="flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300">
          <IoSettingsOutline className="text-[#7126B5] text-xl" />
          <p>Pengaturan Akun</p>
        </button>
        <button
          onClick={handleLogout}
          className="flex gap-4 items-center p-2 rounded-lg hover:bg-gray-200 hover:text-[#7126B5] transition-all duration-300"
        >
          <MdLogout className="text-[#7126B5] text-xl" /> <p>Keluar</p>
        </button>
      </div>
      <div className="flex-grow">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold text-center md:text-left">
            Ubah Data Profil
          </h1>
          <div className="">
            <p className="bg-[#A06ECE] rounded-t-xl text-white text-base font-medium px-4 py-2">
              Data Diri
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-300 p-4 rounded-b-xl"
            >
              <div className="flex flex-col gap-4 mb-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-[#4B1979] font-bold text-sm"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="telepon"
                    className="text-[#4B1979] font-bold text-sm"
                  >
                    Telepon
                  </label>
                  <PhoneInput
                    id="telepon"
                    country={"id"}
                    value={profile.telepon}
                    onChange={(telepon) =>
                      setProfile((prev) => ({ ...prev, telepon }))
                    }
                    inputStyle={{ width: "100%" }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-[#4B1979] font-bold text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#4B1979] text-base font-medium text-white mx-auto px-12 p-3 rounded-xl hover:bg-[#7126B5] transition-all duration-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountItem;
