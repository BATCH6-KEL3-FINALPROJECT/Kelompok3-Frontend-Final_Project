import React from "react";
import checklistIcon from "../../public/Checkout_Saved.svg";

const CheckoutForm = ({ children, title, isSaved }) => {
  return (
    <div>
      <div className="bg-[#3C3C3C] text-white py-2.5 px-4 rounded-tr-2xl rounded-tl-2xl flex justify-between items-center ">
        {title}
        {isSaved && <img src={checklistIcon} width={24} height={24} />}
      </div>
      {children}
    </div>
  );
};

export default CheckoutForm;
