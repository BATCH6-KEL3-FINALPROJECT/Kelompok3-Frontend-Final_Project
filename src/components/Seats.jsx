import React, { useCallback, useEffect, useState } from "react";
import SeatItem from "./SeatItem";
import axios from "axios";

const Seats = ({ maxSeatsSelected, flightID, seatClass }) => {
  const [collumn, setCollumn] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [rowItems, setRowItems] = useState([]);
  const [seatRows, setSeatRows] = useState([]);
  const [isMaxSeats, setIsMaxSeats] = useState(false);
  const [fetchedSeat, setFetchedSeat] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const URL = "https://airline.azkazk11.my.id/api/v1";
  const LIMIT = 500;

  useEffect(() => {
    const fetchSeats = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${URL}/seat?flight_id=${flightID}&limit=${LIMIT}&seat_class=${seatClass}`
        );
        setFetchedSeat(res.data.data.seats);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeats();
  }, [flightID, seatClass]);

  useEffect(() => {
    if (fetchedSeat.length > 0) {
      const seatColumn = fetchedSeat.map((seat) => seat.seat_number).sort();
      const uniqueSeatColumn = [
        ...new Set(
          seatColumn.map((seat) => {
            if (seat.length === 2) {
              return seat[1];
            } else if (seat.length === 3) {
              return seat[2];
            }
          })
        ),
      ];

      setCollumn(uniqueSeatColumn);

      const seatRows = fetchedSeat
        .map((seat) => seat.row)
        .sort((a, b) => a - b);

      const uniqueSeatRow = [...new Set(seatRows.map((seat) => seat))];

      setSeatRows(uniqueSeatRow);
    }
  }, [fetchedSeat]);

  useEffect(() => {
    if (collumn.length > 0) {
      const maxRow = seatRows.length;
      const items = collumn.map((column) => {
        const columnSeats = new Array(maxRow).fill(null);

        const filteredSeats = fetchedSeat.filter(
          (seat) => seat.column === column
        );

        filteredSeats.forEach((seat) => {
          const rowIndex = (seat.row - 1) % maxRow;

          columnSeats[rowIndex] = seat;
        });

        if (maxRow < 5) {
          const sorted = columnSeats
            .map((item) => item)
            .sort((a, b) => a.row - b.row);

          return sorted;
        } else {
          return columnSeats;
        }
      });

      setRowItems(items);
    }
  }, [collumn, fetchedSeat]);

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
      {isLoading && <LoadingSkeleton />}
      {isError && isError.message === "Network Error" && (
        <p className="text-center mt-1 font-semibold">
          Terjadi kesalahan ketika memuat data. Periksa jaringan anda terlebih
          dahulu
        </p>
      )}
      {!isLoading && fetchedSeat.length > 0 && (
        <>
          <div className="w-full px-3 py-2 bg-[#73CA5C] text-center font-semibold rounded-md mt-4 text-white">
            {fetchedSeat.filter((seat) => seat.is_available === "A").length}{" "}
            Seats Available - {seatClass}
          </div>
          <div className="flex gap-3 justify-center">
            {rowItems.map((items, rowsIndex) => {
              if (rowsIndex === Math.floor(collumn.length / 2)) {
                return (
                  <React.Fragment key={rowsIndex}>
                    <div className="flex flex-col items-center py-5 gap-3 h-full">
                      <div className="h-6 w-6"></div>
                      {seatRows.map((item, index) => (
                        <div
                          className="w-9 h-9 flex justify-center items-center"
                          key={`divider-number-${index}`}
                        >
                          <div className="bg-gray-200 px-1 py-3 text-gray-600 font-semibold text-xs rounded-lg">
                            {item}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="flex flex-col items-center py-5 gap-3"
                      key={rowsIndex}
                    >
                      <h1 className="align-baseline text-slate-500 font-semibold">
                        {collumn[rowsIndex]}
                      </h1>
                      {items.map((item, rowIndex) => {
                        if (item !== null) {
                          return (
                            <SeatItem
                              key={`${item.seat_number}-${rowIndex}`}
                              seatNumber={item.seat_number}
                              passengerNumber={getPassengerNumber(
                                item.seat_number
                              )}
                              sendData={handleSeatClick}
                              isAvailable={item.is_available === "A"}
                              isMax={isMaxSeats}
                            />
                          );
                        } else {
                          return (
                            <SeatItem
                              key={`nullSeat-${rowIndex}`}
                              isAvailable={false}
                              isMax={isMaxSeats}
                            />
                          );
                        }
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
                    {collumn[rowsIndex]}
                  </h1>
                  {items.map((item, rowIndex) => {
                    if (item !== null) {
                      return (
                        <SeatItem
                          key={`${item.seat_number}-${rowIndex}`}
                          seatNumber={item.seat_number}
                          passengerNumber={getPassengerNumber(item.seat_number)}
                          sendData={handleSeatClick}
                          isAvailable={item.is_available === "A"}
                          isMax={isMaxSeats}
                        />
                      );
                    } else {
                      return (
                        <SeatItem
                          key={`nullSeat-${rowIndex}`}
                          isAvailable={false}
                          isMax={isMaxSeats}
                        />
                      );
                    }
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

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse duration-700 mt-2">
      <div className="h-[40px] bg-slate-300 rounded-lg mb-2"> </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className="flex justify-center w-full gap-2"
          key={`loadingSkeleton-${index}`}
        >
          <div className="h-[40px] bg-slate-300 rounded-lg mb-2 w-10"> </div>
          <div className="h-[40px] bg-slate-300 rounded-lg mb-2 w-10"> </div>
          <div className="h-[40px] bg-slate-300 rounded-lg mb-2 w-10"> </div>
          <div className="h-[40px]  rounded-lg mb-2 w-10"> </div>
          <div className="h-[40px] bg-slate-300 rounded-lg mb-2 w-10"> </div>
          <div className="h-[40px] bg-slate-300 rounded-lg mb-2 w-10"> </div>
          <div className="h-[40px] bg-slate-300 rounded-lg mb-2 w-10"> </div>
        </div>
      ))}
    </div>
  );
};
