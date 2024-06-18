// components/DetailPesanan.jsx

import React from "react";
import PropTypes from "prop-types";

const DetailPesanan = ({ ticket }) => {
  const { ticket_id, createdAt, departure, arrival, passengers, total } =
    ticket;

  return (
    <div className="flex flex-col gap-3.5 pt-3">
      <div className="flex items-start">
        <div className="flex flex-1 flex-col items-start gap-0.5">
          <h5 className="text-gray-900 font-poppins w-33% text-sm font-bold leading-5 md:w-full">
            <span className="text-base text-gray-900">{createdAt}</span>
            <br />
            <span className="font-normal text-gray-900">{departure}</span>
          </h5>
          <p className="text-gray-900 font-poppins text-sm font-medium">
            {arrival}
          </p>
        </div>
        <div className="relative ml-[-78px] flex">
          <h6 className="text-gray-900 font-poppins text-xs font-bold text-deep_purple-300">
            Keberangkatan
          </h6>
        </div>
      </div>
      <img
        className="h-px"
        src="images/img_divider.svg"
        alt="divider"
        loading="lazy"
      />

      <div className="flex flex-col gap-2 pt-2">
        <div className="flex">
          <div className="flex flex-col justify-center py-16 md:py-5">
            <img
              className="h-24px object-cover"
              src="logoplane.svg"
              alt="Logo"
              loading="lazy"
            />
          </div>
          <p className="text-gray-900 font-poppins w-93% text-xs font-medium leading-18px">
            <span className="text-sm font-bold text-gray-900">
              {passengers.length > 0 &&
                passengers.map((passenger, index) => (
                  <React.Fragment key={index}>
                    {passenger.name} - {passenger.type}
                    <br />
                  </React.Fragment>
                ))}
            </span>
            <span className="text-sm font-bold text-gray-900">Informasi:</span>
            <br />
            <span className="text-sm text-purple-900">
              Penumpang 1: {passengers[0].name}
            </span>
            <br />
            <span className="text-sm font-normal text-gray-900">
              ID: {passengers[0].id}
            </span>
            <br />
            <span className="text-sm text-purple-900">
              Penumpang 2: {passengers[1].name}
            </span>
            <br />
            <span className="text-sm font-normal text-gray-900">
              ID: {passengers[1].id}
            </span>
          </p>
        </div>
        <img
          className="h-px"
          src="images/img_divider.svg"
          alt="divider"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-3.5 pt-3">
        <div>
          <div className="flex items-start">
            <div className="flex flex-1 flex-col items-start gap-0.5">
              <p className="text-gray-900 font-poppins w-41% text-sm font-bold leading-5 md:w-full">
                <span className="text-gray-900">{createdAt}</span>
                <br />
                <span className="font-normal text-gray-900">{arrival}</span>
              </p>
              <p className="text-gray-900 font-poppins text-sm font-medium">
                {arrival}
              </p>
            </div>
            <div className="relative ml-[-24px] flex">
              <p className="text-gray-900 font-poppins text-xs font-bold text-deep_purple-300">
                Kedatangan
              </p>
            </div>
          </div>
        </div>
        <img
          className="h-px"
          src="images/img_divider.svg"
          alt="divider"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-0.5 py-2">
        <div className="flex">
          <p className="text-gray-900 font-poppins text-sm font-bold">
            Rincian Harga
          </p>
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              {passengers.length} Adults
            </p>
          </div>
          <div className="flex">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              IDR {total}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              1 Baby
            </p>
          </div>
          <p className="text-gray-900 font-poppins text-sm font-normal">
            IDR 0
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              Tax
            </p>
          </div>
          <p className="text-gray-900 font-poppins text-sm font-normal">
            IDR 300.000
          </p>
        </div>
        <div className="flex items-center gap-2 border-t border-solid border-blue-gray-100 py-2.5">
          <div className="flex flex-1">
            <h6 className="text-gray-900 font-poppins text-base font-bold">
              Total
            </h6>
          </div>
          <h6 className="text-gray-900 font-poppins text-lg font-bold text-deep_purple-500">
            IDR {total}
          </h6>
        </div>
      </div>
    </div>
  );
};

DetailPesanan.propTypes = {
  ticket: PropTypes.shape({
    ticket_id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
    arrival: PropTypes.string.isRequired,
    passengers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default DetailPesanan;
