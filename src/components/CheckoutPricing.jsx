import React, { useEffect, useState } from "react";
import { formatPrice } from "../utils/checkoutUtils";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const CheckoutPricing = ({ passengerInfo, flightID, onTotalPriceChange }) => {
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const URL = "https://airline.azkazk11.my.id/api/v1";
  const TAX_AMOUNT = 300000;

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (priceData.length > 0) {
      const selectedPrice = priceData.find(
        (price) =>
          price.seat_class === searchParams.get("seat_class").toLowerCase()
      );

      if (selectedPrice) {
        totalPrice =
          selectedPrice.price *
            passengerInfo.filter((passenger) => passenger === "Dewasa").length +
          selectedPrice.price_for_child *
            passengerInfo.filter((passenger) => passenger === "Anak-Anak")
              .length +
          selectedPrice.price_for_infant *
            passengerInfo.filter((passenger) => passenger === "Bayi").length;
      }
    }

    totalPrice += TAX_AMOUNT;

    return totalPrice;
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${URL}/flight/${flightID}`);
        setPriceData(res.data.data.flight.Prices);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlightData();
  }, [flightID]);

  useEffect(() => {
    const total = calculateTotalPrice();
    onTotalPriceChange(total);
  }, [passengerInfo, priceData]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <p className="font-semibold py-5 text-center text-red-500">
        Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.
      </p>
    );
  }

  const selectedPrice = priceData.find(
    (price) => price.seat_class === searchParams.get("seat_class").toLowerCase()
  );

  if (!selectedPrice) {
    return null;
  }

  return (
    <>
      {passengerInfo.length > 0 && (
        <div className="border p-2 rounded-b-xl border-gray-400">
          <h3 className="text-lg font-bold mb-2">Rincian Harga</h3>
          {passengerInfo.filter((passenger) => passenger === "Dewasa").length >
            0 && (
            <div className="flex justify-between text-sm mb-2">
              <p>
                {
                  passengerInfo.filter((passenger) => passenger === "Dewasa")
                    .length
                }{" "}
                Dewasa
              </p>
              <p>
                IDR{" "}
                {formatPrice(
                  selectedPrice.price *
                    passengerInfo.filter((passenger) => passenger === "Dewasa")
                      .length
                )}
              </p>
            </div>
          )}
          {passengerInfo.filter((passenger) => passenger === "Anak-Anak")
            .length > 0 && (
            <div className="flex justify-between text-sm mb-2">
              <p>
                {
                  passengerInfo.filter((passenger) => passenger === "Anak-Anak")
                    .length
                }{" "}
                Anak-Anak
              </p>
              <p>
                IDR{" "}
                {formatPrice(
                  selectedPrice.price_for_child *
                    passengerInfo.filter(
                      (passenger) => passenger === "Anak-Anak"
                    ).length
                )}
              </p>
            </div>
          )}
          {passengerInfo.filter((passenger) => passenger === "Bayi").length >
            0 && (
            <div className="flex justify-between text-sm mb-2">
              <p>
                {
                  passengerInfo.filter((passenger) => passenger === "Bayi")
                    .length
                }{" "}
                Bayi
              </p>
              <p>
                IDR{" "}
                {formatPrice(
                  selectedPrice.price_for_infant *
                    passengerInfo.filter((passenger) => passenger === "Bayi")
                      .length
                )}
              </p>
            </div>
          )}
          <div className="flex justify-between text-sm mb-2">
            <p>Tax</p>
            <p>IDR {formatPrice(TAX_AMOUNT)}</p>
          </div>
          <div className="flex justify-between text-sm font-bold mt-4">
            <p>Total</p>
            <p>IDR {formatPrice(calculateTotalPrice())}</p>
          </div>
        </div>
      )}
    </>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse duration-700 w-full md:w-auto">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-5">
          <div className="bg-gray-300 w-[130px] rounded-lg h-4"></div>
          <div className="bg-gray-300 rounded-lg w-[80px] h-4"></div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="bg-gray-300 w-[130px] rounded-lg h-4"></div>
          <div className="bg-gray-300 rounded-lg w-[80px] h-4"></div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="bg-gray-300 w-[130px] rounded-lg h-4"></div>
          <div className="bg-gray-300 rounded-lg w-[80px] h-4"></div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="bg-gray-300 w-[130px] rounded-lg h-4"></div>
          <div className="bg-gray-300 rounded-lg w-[80px] h-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPricing;
