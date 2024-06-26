import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img
        src="/500_page.jpg"
        alt="500 Not Found"
        className="w-4/5 md:w-3/5 h-auto"
      />
      <Link
        to="/"
        className="px-16 md:px-40 py-1 md:py-2 font-bold bg-red-500 border-4 text-white rounded-xl shadow-md hover:bg-red-800"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
