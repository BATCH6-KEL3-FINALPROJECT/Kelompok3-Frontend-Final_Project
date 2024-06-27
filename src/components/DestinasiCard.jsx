import React from "react";

const DestinasiCard = ({
  asal,
  tujuan,
  roundTrips,
  maskapai,
  seatClass,
  image,
  departureDate,
  returnDate,
  awalTanggal,
  akhirTanggal,
  bulan,
  tahun,
  harga,
  discount,
  passengersAdult,
  passengersChild,
  passengersBaby,
}) => {
  const modifiedSeatClass =
    seatClass.charAt(0).toUpperCase() + seatClass.slice(1);

  const formatPassengers = `${passengersAdult}.${passengersChild}.${passengersBaby}`;
  return (
    <a
      href={`/search?departure_city=${asal}&arrival_city=${tujuan}&penumpang=${formatPassengers}&seat_class=${seatClass}&departure_date=${departureDate}${
        returnDate ? `&return_date=${returnDate}` : ""
      }`}
      className="block bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg relative"
    >
      <div className="relative h-40 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={tujuan}
          className="object-cover w-full h-full rounded-t-lg"
        />
        {discount && (
          <div className="absolute top-0 right-0 bg-[#A06ECE] text-white px-6 py-1 rounded-l-full">
            <span>{discount + " OFF"}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-lg md:text-base font-semibold text-gray-900 mb-1">
          {asal} - {tujuan}{" "}
          <span
            className={`text-base md:text-sm ${
              roundTrips ? "text-[#7126B5]" : "text-red-500"
            }`}
          >
            ({roundTrips ? "Round" : "Not Round"})
          </span>
        </h2>
        <p className="text-[#7126B5] font-bold text-xs md:text-sm mb-1">
          {maskapai} ({modifiedSeatClass})
        </p>
        <p className="text-xs md:text-sm text-gray-600 mb-1">
          {awalTanggal} - {akhirTanggal} {bulan} {tahun}
        </p>
        <p className="text-xs md:text-sm text-gray-600 mb-2">
          Penumpang: {passengersAdult} Dewasa, {passengersChild} Anak,{" "}
          {passengersBaby} Bayi
        </p>
        <p className="text-base md:text-md font-semibold ">
          Mulai dari IDR <span className="text-[#FF0000]">{harga}</span>
        </p>
      </div>
    </a>
  );
};

export default DestinasiCard;
