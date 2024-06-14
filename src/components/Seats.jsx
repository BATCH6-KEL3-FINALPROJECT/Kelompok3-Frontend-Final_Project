import React, { useCallback, useEffect, useState } from "react";
import SeatItem from "./SeatItem";

const Seats = ({ datas, maxSeatsSelected }) => {
  const [seats, setSeats] = useState([]);
  const [rowAlphabet, setRowAlphabet] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeatsPerRow, setMaxSeatsPerRow] = useState(0);
  const [rowItems, setRowItems] = useState([]);
  const [isMaxSeats, setIsMaxSeats] = useState(false);

  useEffect(() => {
    if (datas.length > 0) {
      setSeats(datas);
    }
  }, [datas]);

  useEffect(() => {
    if (seats.length > 0) {
      const seatNumbers = seats.map((seat) => seat.seat_number).sort();
      const uniqueSeatNumber = [...new Set(seatNumbers.map((seat) => seat[0]))];
      setRowAlphabet(uniqueSeatNumber);

      const maxSeatNumber = Math.max(
        ...seats.map((seat) => parseInt(seat.seat_number.match(/\d+$/)[0]))
      );
      setMaxSeatsPerRow(maxSeatNumber);
    }
  }, [seats]);

  useEffect(() => {
    if (rowAlphabet.length > 0 && maxSeatsPerRow > 0) {
      const items = rowAlphabet.map((row) =>
        seats.filter((seat) => seat.seat_number.startsWith(row))
      );
      setRowItems(items);
    }
  }, [rowAlphabet, maxSeatsPerRow, seats]);

  const handleSeatClick = useCallback(
    (seatNumber) => {
      setSelectedSeats((prevSelectedSeats) => {
        const existingSeatIndex = prevSelectedSeats.findIndex(
          (seat) => seat.seatNumber === seatNumber
        );
        if (existingSeatIndex !== -1) {
          const updatedSeats = prevSelectedSeats.filter(
            (seat) => seat.seatNumber !== seatNumber
          );
          return updatedSeats.map((seat, index) => ({
            ...seat,
            passengerNumber: `P${index + 1}`,
          }));
        } else if (prevSelectedSeats.length < maxSeatsSelected) {
          return [
            ...prevSelectedSeats,
            { seatNumber, passengerNumber: `P${prevSelectedSeats.length + 1}` },
          ];
        }

        return prevSelectedSeats;
      });
    },
    [maxSeatsSelected]
  );

  useEffect(() => {
    if (selectedSeats.length > 0 && selectedSeats.length === maxSeatsSelected) {
      setIsMaxSeats(true);
    } else {
      setIsMaxSeats(false);
    }
  }, [selectedSeats]);

  const getPassengerNumber = (seatNumber) => {
    const seat = selectedSeats.find((seat) => seat.seatNumber === seatNumber);
    return seat ? seat.passengerNumber : null;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold"> Pilih Kursi </h2>
      {seats.length > 0 && (
        <>
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
                            passengerNumber={getPassengerNumber(
                              item.seat_number
                            )}
                            sendData={handleSeatClick}
                            isAvailable={item.isAvailable}
                            isMax={isMaxSeats}
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
                        passengerNumber={getPassengerNumber(item.seat_number)}
                        sendData={handleSeatClick}
                        isAvailable={item.isAvailable}
                        isMax={isMaxSeats}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Seats;
