import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Beranda from "../components/Beranda";
import Topnav from "../components/Topnav";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [navigate]);

  return (
    <>
      <Topnav isLogin={isLogin} isSearch={true} />
      <Beranda />
    </>
  );
};

export default Home;
