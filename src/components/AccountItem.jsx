import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const AccountItem = ({
  handleChange,
  handleSubmit,
  profile,
  setProfile,
  loading,
  activeSection,
  isVerify,
  accountId,
}) => {
  const navigate = useNavigate();

  const handleChangeVerify = () => {
    navigate(`/otp`);
  };

  const handleProfileImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        current_image: URL.createObjectURL(imageFile),
        images: imageFile,
      }));
    }
  };

  return (
    <>
      {activeSection === "profile" ? (
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
                <div className="flex items-center gap-2 mx-auto">
                  <div className="relative">
                    <img
                      src={profile.current_image}
                      alt="Current Profile"
                      className="w-40 h-40 rounded-full border-4 border-[#A06ECE] object-cover object-center"
                    />
                    <input
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </div>
                </div>
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
                  className={`bg-[#4B1979] text-base font-medium text-white mx-auto px-12 p-3 rounded-xl transition-all duration-300 ${
                    loading
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-[#7126B5]"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        activeSection == "settings" && (
          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-bold text-center md:text-left">
              Pengaturan Akun
            </h1>
            <div className="flex justify-between items-center mx-5">
              <p>Verifikasi Akun Anda</p>
              <button
                disabled={isVerify}
                onClick={handleChangeVerify}
                className={`${
                  isVerify ? "bg-green-500" : "bg-red-600"
                } px-6 py-2 text-white rounded-lg`}
              >
                {isVerify ? "Verified" : "Not Verified"}
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default AccountItem;
