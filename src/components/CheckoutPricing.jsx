import React, { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice";

const CheckoutPricing = ({
  passengerInfo,
  ticketPrice,
  onTotalPriceChange,
}) => {
  const [passengers, setPassengers] = useState([]);
  const [adultPassengers, setAdultPassengers] = useState([]);
  const [childPassengers, setChildPassengers] = useState([]);
  const [infantPassengers, setInfantPassengers] = useState([]);
  const TICKET_PRICE = 4950000;

  useEffect(() => {
    setPassengers(passengerInfo);
  }, [passengerInfo]);

  useEffect(() => {
    setAdultPassengers(
      passengers.filter((passenger) => passenger === "Dewasa")
    );
    setChildPassengers(
      passengers.filter((passenger) => passenger === "Anak-anak")
    );
    setInfantPassengers(passengers.filter((passenger) => passenger === "Bayi"));
  }, [passengers]);

  useEffect(() => {
    const totalPrice =
      TICKET_PRICE * adultPassengers.length +
      TICKET_PRICE * 0.5 * childPassengers.length +
      TICKET_PRICE * 0.1 * infantPassengers.length;

    onTotalPriceChange(totalPrice);
  }, [adultPassengers, childPassengers, infantPassengers, onTotalPriceChange]);

  return (
    <>
      {passengers.length > 0 && (
        <>
          <div className="my-2 border-0 border-y-2 border-y-gray-300 py-2 mx-2">
            <h3 className="text-sm font-bold mb-1">Rincian Harga</h3>
            {adultPassengers.length > 0 && (
              <div className="flex justify-between text-sm">
                <p>{adultPassengers.length} Dewasa</p>
                <p>IDR {formatPrice(TICKET_PRICE * adultPassengers.length)}</p>
              </div>
            )}
            {childPassengers.length > 0 && (
              <div className="flex justify-between text-sm">
                <p>{childPassengers.length} Anak-anak</p>
                <p>
                  IDR {formatPrice(TICKET_PRICE * 0.5 * childPassengers.length)}
                </p>
              </div>
            )}
            {infantPassengers.length > 0 && (
              <div className="flex justify-between text-sm">
                <p>{infantPassengers.length} Bayi</p>
                <p>
                  IDR{" "}
                  {formatPrice(TICKET_PRICE * 0.1 * infantPassengers.length)}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-between mx-2">
            <h3 className="font-bold">Total</h3>
            <h3 className="font-bold text-lg text-[#7126B5]">
              IDR{" "}
              {formatPrice(
                TICKET_PRICE * adultPassengers.length +
                  TICKET_PRICE * 0.5 * childPassengers.length +
                  TICKET_PRICE * 0.1 * infantPassengers.length
              )}
            </h3>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPricing;
