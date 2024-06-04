import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircle, IoMdArrowRoundBack } from "react-icons/io";
import Cookies from "universal-cookie";
import Topnav from "../components/Topnav";
import { motion } from "framer-motion";
import AccountSkeleton from "../components/AccountContentSkeleton";
import AccountItem from "../components/AccountItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountSideNav from "../components/AccountSideNav";
import AccountSideNavSkeleton from "../components/AccountSideNavSkeleton";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "Harry",
    telepon: "+62 897823232",
    email: "Johndoe@gmail.com",
  });
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate("/");
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    if (isLoggedOut) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedOut, navigate]);

  const handleLogout = async (event) => {
    setActiveSection("logout");
    cookies.remove("token");
    setIsLoggedOut(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profile.name) {
      toast.error("Name cannot be empty");
      return;
    }

    if (!profile.telepon) {
      toast.error("Telepon cannot be empty");
      return;
    }

    if (!profile.email) {
      toast.error("Email cannot be empty");
      return;
    }

    if (!validateEmail(profile.email)) {
      toast.error("Invalid email format");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Profile saved successfully");
      console.log(profile);
    }, 3000);
  };

  return (
    <>
      <Topnav isLogin={isLogin} isSearch={false} />
      <div className="w-11/12 md:w-2/3 mx-auto mt-28 flex flex-col gap-5 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          viewport={{ once: true }}
          className="text-xl font-bold"
        >
          Akun
        </motion.h1>
        <div className="flex justify-between items-center gap-5 mx-4 md:mb-5">
          <motion.div
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.75 }}
            viewport={{ once: true }}
            className="flex items-center flex-grow bg-[#A06ECE] text-white gap-5 p-2 rounded-lg"
          >
            <Link to="/">
              <IoMdArrowRoundBack className="text-2xl" />
            </Link>
            <h3 className="text-base">Beranda</h3>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mx-4">
          {isLoading ? (
            <AccountSideNavSkeleton />
          ) : (
            <AccountSideNav
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              handleLogout={handleLogout}
            />
          )}
          <div className="flex-grow">
            {isLoading ? (
              <AccountSkeleton />
            ) : (
              <AccountItem
                handleLogout={handleLogout}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                profile={profile}
                setProfile={setProfile}
                loading={loading}
                activeSection={activeSection}
              />
            )}
          </div>
        </div>
      </div>
      {isLoggedOut && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 px-40 rounded-md shadow-md z-50">
            <IoMdCheckmarkCircle className="text-green-500 text-8xl md:text-9xl" />
            <h2 className="text-center text-green-500 font-bold text-3xl md:text-4xl">
              Anda Berhasil Logout
            </h2>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Account;
