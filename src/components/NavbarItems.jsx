import React from "react";

const NavbarItems = ({ children }) => {
  return <div className="hidden md:flex items-center gap-6 py-4 md:py-0">{children}</div>;
};

export default NavbarItems;
