import React from "react";

const CheckoutForm = ({ children, title, isSaved }) => {
  return (
    <div>
      <div className="bg-[#3C3C3C] text-white py-2.5 px-4 rounded-tr-2xl rounded-tl-2xl flex justify-between items-center ">
        {title}
        {isSaved && <img src="/Checkout_Saved.svg" width={24} height={24} />}
      </div>
      {children}
    </div>
  );
};

export default CheckoutForm;
