import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Beranda from "../components/Beranda";
import Topnav from "../components/Topnav";
import useSend from "../hooks/useSend";

const Home = () => {
  const { loading, sendData } = useSend();
  const [isLogin, setIsLogin] = useState(true);
  const [airport, setAirport] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      if (checkToken === "undefined") {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  }, [navigate]);

  const fetchSearchForm = async () => {
    try {
      const {
        data: {
          data: {
            pagination: { totalData },
          },
        },
      } = await sendData("/api/v1/airport/?limit=1", "GET");
      const {
        data: {
          data: { airport },
        },
      } = await sendData(`/api/v1/airport/?limit=${totalData}`, "GET");
      setAirport(airport);
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchSearchForm();
  }, []);

  return (
    <>
      <Topnav isLogin={isLogin} isSearch={true} />
      <Beranda airport={airport} />
    </>
  );
};

export default Home;
