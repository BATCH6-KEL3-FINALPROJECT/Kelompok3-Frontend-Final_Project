import React, { useState } from "react";

const PaymentMethod = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className="md:w-[518px] flex justify-start">
      <div className=" w-full md:w-[486px] max-w-md my-auto mx-auto px-3 md:px-0 lg:mx-0 ">
        <p className="font-bold text-lg text-black pb-4">Pilih Pembayaran</p>
        {accordionData.map((item, i) => (
          <div key={i} className="mb-2">
            <div
              className={`flex justify-between items-center rounded-lg p-4 cursor-pointer ${
                selected === i
                  ? "bg-[#7126B5]"
                  : "bg-gray-800 hover:bg-[#7126B5]"
              } text-white`}
              onClick={() => toggle(i)}
            >
              <span>{item.title}</span>
              <span
                className={`transform transition-transform duration-300 ${
                  selected === i ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.879a1 1 0 111.414 1.414l-4 4.707a1 1 0 01-1.414 0l-4-4.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div
              className={`${selected === i ? "block" : "hidden"} bg-white p-4`}
            >
              {item.content}
            </div>
          </div>
        ))}
        <button className="w-full h-[42px] bg-[#7126B5] hover:bg-[#7126B580] text-white py-2 rounded-md mt-4">
          Bayar
        </button>
      </div>
    </div>
  );
};

const accordionData = [
  {
    title: "Gopay",
    content: <div>Gopay Payment Content</div>,
  },
  {
    title: "Virtual Account",
    content: <div>Virtual Account Payment Content</div>,
  },
  {
    title: "Credit Card",
    content: (
      <div className="space-y-4">
        <div className="flex justify-center">
          <img
            src="paymentOptions.png"
            alt="payment"
            className="max-w-full h-auto"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card number
          </label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-[30px]"
            placeholder="4480 0000 0000 0000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card holder name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-[30px]"
            placeholder="John Doe"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-[30px]"
              placeholder="000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry date
            </label>
            <input
              type="number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-[30px]"
              placeholder="07/24"
            />
          </div>
        </div>
      </div>
    ),
  },
];

export default PaymentMethod;
