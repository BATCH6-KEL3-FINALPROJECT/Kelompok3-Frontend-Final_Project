import React, { useEffect, useState } from "react";
import SeatItem from "./SeatItem";

const Seats = ({ datas }) => {
  const [seats, setSeats] = useState([]);
  const [rowAlphabet, setRowAlphabet] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeatsPerRow, setMaxSeatsPerRow] = useState(0);
  const [rowItems, setRowItems] = useState([]);

  useEffect(() => {
    setSeats(datas);
  }, [datas]);

  useEffect(() => {
    const seatNumbers = seats.map((seat) => seat.seat_number).sort();
    const uniqueSeatNumber = [...new Set(seatNumbers.map((seat) => seat[0]))];
    setRowAlphabet(uniqueSeatNumber);

    const maxSeatNumber = Math.max(
      ...seats.map((seat) => parseInt(seat.seat_number.match(/\d+$/)[0]))
    );
    setMaxSeatsPerRow(maxSeatNumber);
  }, [seats]);

  useEffect(() => {
    getRowItems();
  }, [maxSeatsPerRow]);

  function getRowItems() {
    const items = [];
    for (let i = 0; i < rowAlphabet.length; i++) {
      const item = seats.filter((seat) =>
        seat.seat_number.startsWith(`${rowAlphabet[i]}`)
      );
      items.push(item);
    }
    setRowItems(items);
  }

  function handleData(data) {
    setSelectedSeats((prev) => {
      const isData = prev.includes(data);
      if (isData) {
        return prev.filter((item) => item !== data);
      }
      return [...prev, data];
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold"> Pilih Kursi </h2>
      <div className="w-full px-3 py-2 bg-[#73CA5C] text-center font-semibold rounded-md mt-4 text-white">
        {seats.filter((seat) => seat.isAvailable).length} Seats Available
      </div>
      <div className="flex gap-3 justify-center">
        {rowItems.map((items, rowsIndex) => {
          if (rowsIndex === Math.floor(rowAlphabet.length / 2)) {
            return (
              <React.Fragment key={rowsIndex}>
                <div className="flex flex-col items-center py-5 gap-3 h-full">
                  <div className="h-6 w-6"></div>
                  {[...Array(maxSeatsPerRow)].map((_, index) => (
                    <div
                      className="w-9 h-9 flex justify-center items-center"
                      key={`divider-number-${index}`}
                    >
                      <div className="bg-gray-200 px-1 py-3 text-gray-600 font-semibold text-xs rounded-lg">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="flex flex-col items-center py-5 gap-3"
                  key={rowsIndex}
                >
                  <h1 className="align-baseline text-slate-500 font-semibold">
                    {rowAlphabet[rowsIndex]}
                  </h1>
                  {items.map((item, rowIndex) => {
                    return (
                      <SeatItem
                        key={`${item.seat_number}-${rowIndex}`}
                        seatNumber={item.seat_number}
                        sendData={handleData}
                        isAvailable={item.isAvailable}
                      />
                    );
                  })}
                </div>
              </React.Fragment>
            );
          }
          return (
            <div
              className="flex flex-col items-center py-5 gap-3"
              key={rowsIndex}
            >
              <h1 className="align-baseline text-slate-500 font-semibold">
                {rowAlphabet[rowsIndex]}
              </h1>
              {items.map((item, rowIndex) => {
                return (
                  <SeatItem
                    key={`${item.seat_number}-${rowIndex}`}
                    seatNumber={item.seat_number}
                    sendData={handleData}
                    isAvailable={item.isAvailable}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Seats;
