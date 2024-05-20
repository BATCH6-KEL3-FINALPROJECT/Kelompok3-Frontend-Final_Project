import React from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const Home = () => {
  return (
    <>
      <Navbar isLogin={false} />
      <Loading />
    </>
  );
};

export default Home;
