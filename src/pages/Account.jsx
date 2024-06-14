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
import { jwtDecode } from "jwt-decode";
import useSend from "../hooks/useSend";

const Account = () => {
  const { loading, sendData } = useSend();
  const [accountId, setAccountId] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerify, setIsVerify] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState({
    current_image: "",
    images: "",
    name: "",
    telepon: "",
    email: "",
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      if (checkToken === "undefined") {
        setIsLogin(false);
        navigate("/");
      } else {
        setIsLogin(true);
        const decoded = jwtDecode(checkToken);
        setAccountId(decoded.id);
      }
    } else {
      setIsLogin(false);
      navigate("/");
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (accountId) {
      fetchData();
    }
  }, [accountId]);

  useEffect(() => {
    if (isLoggedOut) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedOut, navigate]);

  const fetchData = async () => {
    try {
      const response = await sendData(`/api/v1/user/${accountId}`, "GET");
      setProfile({
        current_image:
          response.data.data.user.image_url || "/placeholder-avatar.png",
        images: response.data.data.user.image_url || "/placeholder-avatar.png",
        name: response.data.data.user.name,
        telepon: response.data.data.user.phone_number,
        email: response.data.data.user.email,
      });
      setIsVerify(response.data.data.user.is_verified);
    } catch (e) {
      console.log(e);
    }
  };

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

  const handleSubmit = async (e) => {
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

    setWaiting(true);

    try {
      const token = cookies.get("token");
      const response = await sendData(
        `/api/v1/user/${accountId}`,
        "PATCH",
        profile,
        token,
        false,
        true
      );
      setTimeout(() => {
        setWaiting(false);
        toast.success("Profile saved successfully");
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        toast.error(error.response.message);
        setWaiting(false);
      }, 3000);
    }
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
                loading={waiting}
                activeSection={activeSection}
                isVerify={isVerify}
                accountId={accountId}
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
