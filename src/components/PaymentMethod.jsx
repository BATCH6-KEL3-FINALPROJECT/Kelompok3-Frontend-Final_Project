import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSend from "../hooks/useSend";
import Cookies from "universal-cookie";

const PaymentMethod = ({ setIsBayar, setDate }) => {
  const { loading, sendData } = useSend();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cookies = new Cookies();
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    } catch (err) {
      console.log("Failed to copy:", err);
    }
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const handlePay = async () => {
    try {
      const response = await sendData(
        `/api/v1/transaction/payment/${searchParams.get("payment_id")}`,
        "POST",
        cookies.get("token")
      );
      if (response.statusCode === 200) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formattedDate = `${tomorrow.getDate()} ${tomorrow.toLocaleString(
          "en-us",
          { month: "long" }
        )} ${tomorrow.getFullYear()} 12:00`;

        setDate(formattedDate);
        setIsBayar(true);

        const transactionToken = response.data.data.token;
        window.snap.pay(transactionToken, {
          onSuccess: function (result) {
            console.log(result);
            alert("Payment successful!");
            navigate("/payment-success");
          },
          onPending: function (result) {
            console.log(result);
            alert("Waiting for your payment!");
          },
          onError: function (result) {
            console.log(result);
            alert("Payment failed!");
            navigate("/payment-error");
          },
          onClose: function () {
            alert("You closed the popup without finishing the payment");
          },
        });
      }
    } catch (err) {
      if (err.statusCode === 500) {
        navigate("/error");
      } else {
        console.log(err);
      }
    }
  };

  const accordionData = [
    {
      title: "Gopay",
      content: (
        <div>
          <img
            src="/q_gopay.png"
            alt="Gopay QRIS"
            className="h-[200px] mx-auto"
          />
          <p>Pembayaran menggunakan Gopay:</p>
          <ol className="list-decimal list-inside">
            <li>Buka aplikasi Gopay di smartphone Anda.</li>
            <li>Pilih menu Pembayaran atau Scan QR.</li>
            <li>Pindai QR code atau masukkan nomor pembayaran.</li>
            <li>Konfirmasikan pembayaran.</li>
          </ol>
        </div>
      ),
    },
    {
      title: "Virtual Account",
      content: (
        <div>
          <p>Pembayaran menggunakan Virtual Account:</p>
          <div className="flex justify-between items-center mt-8">
            <div>
              <h1>Virtual account number</h1>
              <p>94991455676</p>
            </div>
            <button
              className="ml-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
              onClick={() => copyToClipboard("94991455676")}
            >
              {copySuccess ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="space-y-4 mt-8">
            <div>
              <p className="font-medium">Pembayaran lewat ATM:</p>
              <ol className="list-decimal list-inside">
                <li>Pilih menu Transfer di ATM.</li>
                <li>Pilih menu Transfer ke Rekening Bank lain.</li>
                <li>
                  Masukkan kode bank dan nomor Virtual Account yang diberikan.
                </li>
                <li>Masukkan jumlah pembayaran dan konfirmasikan transaksi.</li>
              </ol>
            </div>
            <div>
              <p className="font-medium">
                Pembayaran lewat Mobile Banking (m-banking):
              </p>
              <ol className="list-decimal list-inside">
                <li>Buka aplikasi mobile banking di smartphone Anda.</li>
                <li>Pilih menu Transfer atau Pembayaran.</li>
                <li>
                  Pilih Virtual Account dan masukkan nomor Virtual Account yang
                  diberikan.
                </li>
                <li>Masukkan jumlah pembayaran dan konfirmasikan transaksi.</li>
              </ol>
            </div>
          </div>
        </div>
      ),
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
              disabled
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
              disabled
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
                disabled
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
                disabled
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-[30px]"
                placeholder="07/24"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Indomaret",
      content: (
        <div>
          <p>Tunjukan Barcode Ke Kasir Indomaret:</p>
          <div className="flex justify-between items-center mt-8 mb-2">
            <div>
              <h1>Payment number</h1>
              <p>4498291046763321</p>
            </div>
            <button
              className="ml-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
              onClick={() => copyToClipboard("4498291046763321")}
            >
              {copySuccess ? "Copied!" : "Copy"}
            </button>
          </div>
          <img src="/b_indomaret.png" alt="Barcode Indomaret" />
          <p className="mt-8">Pembayaran di Indomaret:</p>
          <ol className="list-decimal list-inside">
            <li>Bawa barcode pembayaran ini ke kasir di Indomaret.</li>
            <li>Tunjukkan barcode kepada kasir untuk dipindai.</li>
            <li>Lakukan pembayaran sesuai dengan petunjuk kasir.</li>
          </ol>
        </div>
      ),
    },
    {
      title: "Alfamart",
      content: (
        <div>
          <p>Tunjukan Barcode Ke Kasir Alfamart:</p>
          <div className="flex justify-between items-center mt-8 mb-2">
            <div>
              <h1>Payment number</h1>
              <p>1559106154407900</p>
            </div>
            <button
              className="ml-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
              onClick={() => copyToClipboard("1559106154407900")}
            >
              {copySuccess ? "Copied!" : "Copy"}
            </button>
          </div>
          <img src="/b_alfamart.png" alt="Barcode Alfamart" />
          <p className="mt-8">Pembayaran di Alfamart:</p>
          <ol className="list-decimal list-inside">
            <li>Bawa barcode pembayaran ini ke kasir di Alfamart.</li>
            <li>Tunjukkan barcode kepada kasir untuk dipindai.</li>
            <li>Lakukan pembayaran sesuai dengan petunjuk kasir.</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div className="md:w-[518px] flex justify-start">
      <div className=" w-full md:w-[486px] max-w-md my-auto mx-auto px-3 md:px-0 lg:mx-0 ">
        <p className="font-bold text-lg text-black pb-4">
          Metode Pembayaran yang <span className="text-red-500">Tersedia</span>
        </p>
        {accordionData.map((item, i) => (
          <div key={i} className="mb-2">
            <div
              className={`flex justify-between items-center rounded-lg p-4 bg-gray-800  text-white`}
              onClick={() => toggle(i)}
            >
              <span>{item.title}</span>
              {/* <span
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
              </span> */}
            </div>
            {/* <div
              className={`${selected === i ? "block" : "hidden"} bg-white p-4`}
            >
              {item.content}
            </div> */}
          </div>
        ))}
        <button
          id="pay-button"
          className="w-full h-[42px] bg-[#7126B5] hover:bg-[#7126B580] text-white py-2 rounded-md mt-4"
          onClick={handlePay}
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
